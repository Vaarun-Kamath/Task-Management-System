package com.workflow.server.exceptions;

import java.util.Map;
import org.springframework.http.ResponseEntity;

import com.workflow.server.utils.CommonResponse;

public abstract class AbstractException extends RuntimeException {
    public AbstractException(String message) {
        super(message);
    }

    public abstract ResponseEntity<Map<String, Object>> getErrorResponse();

    public Map<String, Object> getResponse(int status, String error) {
        return CommonResponse.getErrorResponse(status, error);
    }
}
