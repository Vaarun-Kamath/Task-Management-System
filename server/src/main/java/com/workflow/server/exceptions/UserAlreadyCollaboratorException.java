package com.workflow.server.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserAlreadyCollaboratorException extends AbstractHttpException{
    public UserAlreadyCollaboratorException(String message) {
        super(message);
    }

    public ResponseEntity<Map<String, Object>> asErrorResponseEntity() {
        return getResponseEntity(HttpStatus.NOT_FOUND);
    }
}
