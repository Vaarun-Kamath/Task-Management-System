package com.workflow.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.exceptions.UserAlreadyCollaboratorException;
import com.workflow.server.exceptions.UserIsProjectCreatorException;
import com.workflow.server.exceptions.UserNotFoundException;
import com.workflow.server.model.User;
import com.workflow.server.services.ProjectService;
import com.workflow.server.services.UserService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // To communicate with Project Controller
    @Autowired
    private ProjectService projectService;


    @GetMapping("/api/userById") //TODO dont send password.currently sends name, email and password as well
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getUserById(@RequestParam String userId) {

        try {
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing User ID"));
            }

            User user = userService.getUserById(userId);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", user));
        
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/api/addCollaborator")
    public ResponseEntity<Map<String, Object>> addCollaborator(@RequestBody Map<String, String> request) {
        try {
            if (request == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing request body"));
            }

            String username = request.get("username");
            String projectId = request.get("projectId");
            User data = userService.getUserByUsername(username);
            projectService.addCollaborator(projectId, data.get_id());
            
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", "res"));

        } catch (UserAlreadyCollaboratorException | UserIsProjectCreatorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (UserNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }
}
