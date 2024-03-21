package com.workflow.server;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.workflow.server.model.Task;


public interface TaskRepository extends MongoRepository<Task,String>{
    List<Task> findByProjectId(String projectId);
}
