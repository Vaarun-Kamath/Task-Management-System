package com.workflow.server.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.UserRepository;
import com.workflow.server.model.Project;
import com.workflow.server.model.User;
import com.workflow.server.utils.CommonResponse;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepo;


    // To communicate with Project Controller
    @Autowired
    ProjectController projectController;

    @GetMapping("/api/userById") //TODO dont send password.currently sends name, email and password as well
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getUserById(@RequestParam String userId) {

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing User ID"));
        }

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", userOptional.get()));
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/api/addCollaborator")
    public ResponseEntity<Map<String, Object>> addCollaborator(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String projectId = request.get("projectId");
            if (username == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Username"));
            }

            User data = CheckUserCollaboration(username);

            System.out.println();

            if (data != null && data.get_id() != null) {
                HashMap<String, Object> res = projectController.addCollaborator(projectId, data.get_id());
                if (res.get("status").equals(200)) {
                    return ResponseEntity.status(HttpStatus.OK)
                            .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", res));
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(),
                                    (String) res.get("message")));
                }
            } else {
                System.out.println("\n\n\n" + "RESPONSE:" + ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found")) + "\n\n\n");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Internal server error"));
        }
    }

    private User CheckUserCollaboration(String username) {
        return userRepo.findByUsername(username);
    }
}
