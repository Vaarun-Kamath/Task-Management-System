package com.workflow.server.utils;

import java.util.HashMap;
import java.util.Map;

public class commonResponse {
    public Map<String, Object> getSuccessResponse(int status, String successCode, Object content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("successCode", successCode);
        response.put("content", content);
        return response;
    }

    public Map<String, Object> getErrorResponse(int status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("error", message);
        return response;
    }
}
