package com.workflow.server.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.lang.NonNull;
import com.workflow.server.ProjectRepository;
import com.workflow.server.model.Project;
import com.workflow.server.utils.commonResponse;

@RestController
public class ProjectController {

    @Autowired
    private ProjectRepository projrepo;

    private commonResponse respond = new commonResponse();

    @GetMapping("/api/projects")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getAllProjects(@RequestParam String user_id) {
        if (user_id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(respond.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "You Must Login First"));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(respond.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projrepo.findByCreatedBy(user_id)));
    }

    @GetMapping("/api/projectById")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getProjectById(@RequestParam String project_id) {

        if (project_id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(respond.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Project ID"));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(respond.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projrepo.findById(project_id)));
    }

    // Post mappings

    @PostMapping("/api/addProject")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Project newProj) {
        System.out.println("Received Project for insertion: " + newProj);
        try {
            String name = newProj.getName();
            Date createdOn = newProj.getCreatedOn();
            String createdBy = newProj.getCreatedBy();

            if (name == null || createdBy == null || createdOn == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(respond.getErrorResponse(HttpStatus.BAD_REQUEST.value(),
                                "Missing name, createdOn or createdBy"));
            }

            projrepo.insert(newProj);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(respond.getSuccessResponse(HttpStatus.OK.value(), "Success", newProj));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(respond.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    // Controller - Controller communication functions
    public boolean addCollaborator(String proj_id, String collab_id) {
        try {
            if (proj_id == null || collab_id == null)
                return false;
            System.out.println(proj_id + " : " + collab_id);

            Optional<Project> projectOptional = projrepo.findById(proj_id);

            if (projectOptional.isEmpty()) {
                System.out.println("Project not found.");
                return false;
            }

            // Change once Task class is built
            Project project = projectOptional.get();
            Set<String> collaborators = project.getCollaborators();

            System.out.println("project: " + project);

            collaborators.add(collab_id);
            project.setCollaborators(collaborators);
            projrepo.save(project);

            return true;

        } catch (Exception e) {
            System.out.println("Internal server error");
            System.out.println(e);
            return false;
        }
    }
}
