package com.workflow.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.UserRepository;
import com.workflow.server.model.User;
import com.workflow.server.utils.commonResponse;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepo;

    private commonResponse respond = new commonResponse();

    // To communicate with Project Controller
    @Autowired
    ProjectController projectController;

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/api/addCollaborator")
    public ResponseEntity<Map<String, Object>> addCollaborator(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String projectId = request.get("projectId");
            if (username == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(respond.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Username"));
            }

            User data = CheckUserCollaboration(username);

            if (data.get_id() != null) {
                boolean res = projectController.addCollaborator(projectId, data.get_id());
                if (res) {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(respond.getSuccessResponse(HttpStatus.OK.value(), "Success", new HashMap<>()));
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(respond.getErrorResponse(HttpStatus.BAD_REQUEST.value(),
                                    "User already collaborator or Project does not exist"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(respond.getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(respond.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Internal server error"));
        }
    }

    private User CheckUserCollaboration(String username) {
        User user = userRepo.findByUsername(username);
        System.out.println(user);
        // if (user != null) {
        // user.set_id("123");
        // user.setEmail("useremail@gmail.com");
        // user.setUsername("user");
        // }
        return user;
    }
}
