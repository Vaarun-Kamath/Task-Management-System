package com.workflow.server.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.workflow.server.utils.CommonResponse;

public abstract class AbstractHttpException extends RuntimeException {
    public AbstractHttpException(String message) {
        super(message);
    }

    public abstract ResponseEntity<Map<String, Object>> asErrorResponseEntity();

    public ResponseEntity<Map<String, Object>> getResponseEntity(HttpStatusCode statusCode) {
        return CommonResponse.getErrorResponseEntity(statusCode, getMessage());
    }
}
