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

import com.workflow.server.exceptions.AbstractHttpException;
import com.workflow.server.model.User;
import com.workflow.server.services.LoginService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/api/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {

        try {
            if (request == null) {
                return CommonResponse.getErrorResponseEntity(
                    HttpStatus.BAD_REQUEST,
                    "Missing request body"
                );
            }

            String email = request.get("email");
            String password = request.get("password");

            User user = loginService.authenticateUser(email, password);

            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("user_id", user.get_id());
            userResponse.put("email", user.getEmail());
            userResponse.put("username", user.getUsername());

            return CommonResponse.getSuccessResponseEntity(
                HttpStatus.OK,
                "Success",
                userResponse
            );

        } catch (AbstractHttpException e) {
            return e.asErrorResponseEntity();
        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error"
            );
        }
    }
}
