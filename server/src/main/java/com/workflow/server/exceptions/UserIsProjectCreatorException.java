package com.workflow.server.exceptions;

public class UserIsProjectCreatorException extends RuntimeException {
    public UserIsProjectCreatorException(String message) {
        super(message);
    }
}
