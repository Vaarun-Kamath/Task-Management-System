package com.workflow.server;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.workflow.server.model.Project;

public interface ProjectRepository extends MongoRepository<Project,String>{
}
