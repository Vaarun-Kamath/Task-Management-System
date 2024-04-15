package com.workflow.server.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class TaskNotFoundException extends AbstractException{
    public TaskNotFoundException(String message) {
        super(message);
    }

    public ResponseEntity<Map<String, Object>> getErrorResponse() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(getResponse(HttpStatus.NOT_FOUND.value(), getMessage()));
    }
}
