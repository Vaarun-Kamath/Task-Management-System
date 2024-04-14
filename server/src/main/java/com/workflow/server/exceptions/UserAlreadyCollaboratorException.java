package com.workflow.server.exceptions;

public class UserAlreadyCollaboratorException extends RuntimeException{
    public UserAlreadyCollaboratorException(String message) {
        super(message);
    }
}
