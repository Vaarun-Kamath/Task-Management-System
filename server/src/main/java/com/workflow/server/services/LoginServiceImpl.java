package com.workflow.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.server.UserRepository;
import com.workflow.server.model.User;

@Service
public class LoginServiceImpl implements LoginService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public User checkLogin(String email) {
        User user = userRepo.findByEmail(email);
        if(user == null)
            // User is not in database
            return null;
        return user;
    }

    @Override
    public User authenticateUser(String email, String password) {
        User user = checkLogin(email);
        if (user != null && user.getPassword().equals(password)) {
            // User is authenticated
            return user;
        }
        // User authentication failed
        return null;
    }
}
