package com.workflow.server;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.workflow.server.model.User;

public interface UserRepository extends MongoRepository<User, String> {
}
