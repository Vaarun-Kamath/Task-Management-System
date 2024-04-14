package com.workflow.server.services;

import com.workflow.server.model.User;

public interface LoginService {
    User checkLogin(String email);
    User authenticateUser(String email, String password);
}