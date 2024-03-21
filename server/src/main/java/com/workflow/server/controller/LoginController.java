package com.workflow.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.ProjectRepository;
import com.workflow.server.UserRepository;
import com.workflow.server.model.User;

@RestController
public class LoginController {

    @Autowired
    UserRepository userRepo;

    // To communicate with Project Controller
    @Autowired
    ProjectController projectController;

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        System.out.println("LoginController.login() called");
        try {
            String email = request.get("email");
            String password = request.get("password");
            if (email == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing email or password"));
            }

            User data = CheckLogin(email);
            System.out.println(data);

            if (data.get_id() != null) {
                String storedPassword = (String) data.getPassword();
                if (password.equals(storedPassword)) {

                    Map<String, Object> user = new HashMap<>();
                    user.put("user_id", data.get_id());
                    user.put("email", data.getEmail());
                    user.put("username", data.getUsername());

                    return ResponseEntity.status(HttpStatus.OK)
                            .body(getSuccessResponse(HttpStatus.OK.value(), "Success", user));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(getErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Incorrect credentials"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    private Map<String, Object> getSuccessResponse(int status, String successCode, Map<String, Object> content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("successCode", successCode);
        response.put("content", content);
        return response;
    }

    private Map<String, Object> getErrorResponse(int status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("error", message);
        return response;
    }

    public User CheckLogin(String email) {

        User data = new User();

        userRepo.findAll().forEach(user -> {
            try {
                if (user.getEmail().equals(email)) {
                    data.set_id(user.get_id());
                    data.setEmail(user.getEmail());
                    data.setUsername(user.getUsername());
                    data.setPassword(user.getPassword());
                }
            } catch (Exception e) {
                System.out.println("Error: " + e);
            }
        });
        return data;
    }

}
