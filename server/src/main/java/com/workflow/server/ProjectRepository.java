package com.workflow.server;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.workflow.server.model.Project;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByCreatedBy(String createdBy);

    List<Project> findBy_id(String _id);
}
