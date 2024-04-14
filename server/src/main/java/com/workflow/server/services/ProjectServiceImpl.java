package com.workflow.server.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.server.ProjectRepository;
import com.workflow.server.exceptions.ProjectNotFoundException;
import com.workflow.server.exceptions.UserAlreadyCollaboratorException;
import com.workflow.server.exceptions.UserIsProjectCreatorException;
import com.workflow.server.model.Project;

@Service
public class ProjectServiceImpl implements ProjectService{
    
    @Autowired
    private ProjectRepository projRepo;

    @Override
    public List<Project> getAllProjectsByUser(String userId) {
        return projRepo.findByCreatedBy(userId);
    }

    @Override
    public Project getProjectById(String projectId) {
        Optional<Project> projectOptional = projRepo.findById(projectId);

        if(projectOptional.isEmpty())
            throw new ProjectNotFoundException("Project with id: " + projectId + "not found");

        return projectOptional.get();
    }

    @Override
    public Project addProject(Project newProject) {
        String name = newProject.getName();
        Date createdOn = newProject.getCreatedOn();
        String createdBy = newProject.getCreatedBy();

        if (name == null || createdBy == null || createdOn == null)
            throw new IllegalArgumentException("Missing name, createdOn or createdBy");

        return projRepo.insert(newProject);
    }

    @Override
    public void addCollaborator(String projId, String collabId) {
        if (projId == null || collabId == null)
            throw new IllegalArgumentException("Missing project or collaborator ID");

        Project project = getProjectById(projId);

        if (project.getCreatedBy().equals(collabId))
            throw new UserIsProjectCreatorException("User with id: " + collabId + " is the creator of the project with id: " + projId);

        Set<String> collaborators = project.getCollaborators();

        if (collaborators.contains(collabId))
            throw new UserAlreadyCollaboratorException("User with id: " + collabId + " is already a collaborator");

        collaborators.add(collabId);
        project.setCollaborators(collaborators);
        projRepo.save(project);
    }
}