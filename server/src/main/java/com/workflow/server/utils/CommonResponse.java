package com.workflow.server.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public class CommonResponse {

    public static ResponseEntity<Map<String, Object>> getSuccessResponseEntity(HttpStatusCode statusCode, String successCode, Object content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", statusCode.value());
        response.put("successCode", successCode);
        response.put("content", content);

        return ResponseEntity.status(statusCode).body(response);
    }

    public static ResponseEntity<Map<String, Object>> getErrorResponseEntity(HttpStatusCode statusCode, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", statusCode.value());
        response.put("errorCode", statusCode.value());
        response.put("errorMessage", message);

        return ResponseEntity.status(statusCode).body(response);
    }
}
