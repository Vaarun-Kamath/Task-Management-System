package com.workflow.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

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

            Map<String, Object> data = CheckLogin(email);
            System.out.println("PRINT:: " + data);
            if (data != null) {
                String storedPassword = (String) data.get("password");
                if (password.equals(storedPassword)) {

                    Map<String, Object> user = new HashMap<>();
                    user.put("user_id", data.get("user_id"));
                    user.put("email", data.get("email"));
                    user.put("role", data.get("role"));
                    user.put("username", data.get("username"));

                    return ResponseEntity.status(HttpStatus.OK)
                            .body(getSuccessResponse(HttpStatus.OK.value(), "Success", user));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(getErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Incorrect credentials"));
                }
            } else {
                System.out.println("PRINT:: " + getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
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

    private Map<String, Object> CheckLogin(String email) {
        // Simulate fetching user data from the database based on email
        // Replace this with your actual database query
        // For demonstration purposes, returning hardcoded data
        Map<String, Object> data = new HashMap<>();
        data.put("user_id", 1);
        data.put("role", "user");
        data.put("email", "example@example.com");
        data.put("username", "example_user");
        data.put("password", "1234");
        return data;
    }

}
