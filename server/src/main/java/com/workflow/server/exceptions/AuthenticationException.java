package com.workflow.server.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AuthenticationException extends AbstractException {
    public AuthenticationException(String message) {
        super(message);
    }

    public ResponseEntity<Map<String, Object>> getErrorResponse() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(getResponse(HttpStatus.UNAUTHORIZED.value(), getMessage()));
    }
}
