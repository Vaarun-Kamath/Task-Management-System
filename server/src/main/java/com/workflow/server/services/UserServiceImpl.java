package com.workflow.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.server.UserRepository;
import com.workflow.server.exceptions.UserNotFoundException;
import com.workflow.server.model.User;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public User getUserById(String userId) {

        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isEmpty())
            throw new UserNotFoundException("User with id: " + userId + " not found");

        return userOptional.get();
    }

    @Override
    public User getUserByUsername(String username) {
        User user= userRepo.findByUsername(username);
        if (user == null)
            throw new UserNotFoundException("User with username: " + username + "not found");

        return user;
    }

    public String getUserNameById(String userId) {
        if(userId == null)
            throw new IllegalArgumentException("Missing user id");

        Optional<User> userOptional = userRepo.findById(userId);

        if (userOptional.isEmpty())
            throw new UserNotFoundException("User with id: " + userId + "not found");

        User user = userOptional.get();
        String username = user.getUsername();
        return username;
    }
}
