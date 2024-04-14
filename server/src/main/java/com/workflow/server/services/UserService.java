package com.workflow.server.services;

import com.workflow.server.model.User;

public interface UserService {
    User getUserById(String userId);
    User getUserByUsername(String username);
    String getUserNameById(String userId);
}
