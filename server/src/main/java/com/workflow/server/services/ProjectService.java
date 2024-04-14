package com.workflow.server.services;

import java.util.List;

import com.workflow.server.model.Project;

public interface ProjectService {
    List<Project> getAllProjectsByUser(String user_id);
    Project getProjectById(String project_id);
    Project addProject(Project newProject);
    void addCollaborator(String projId, String collabId);
}