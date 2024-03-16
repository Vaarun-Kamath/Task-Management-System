package com.workflow.server;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.workflow.server.model.Project;

public interface DatabaseRepository extends MongoRepository<Project,String>{
}
