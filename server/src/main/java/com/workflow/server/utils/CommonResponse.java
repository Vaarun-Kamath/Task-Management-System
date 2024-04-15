package com.workflow.server.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatusCode;

public class CommonResponse {
    public static Map<String, Object> getSuccessResponse(int status, String successCode, Object content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("successCode", successCode);
        response.put("content", content);
        return response;
    }

    public static Map<String, Object> getSuccessResponse(HttpStatusCode statusCode, String successCode, Object content) {
        return getSuccessResponse(statusCode.value(), successCode, content);
    }

    public static Map<String, Object> getErrorResponse(int status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("errorCode", status);
        response.put("errorMessage", message);
        return response;
    }
    
    public static Map<String, Object> getErrorResponse(HttpStatusCode statusCode, String message) {
        return getErrorResponse(statusCode.value(), message);
    }
}
