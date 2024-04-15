package com.workflow.server.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.exceptions.ProjectNotFoundException;
import com.workflow.server.model.Project;
import com.workflow.server.services.ProjectService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @GetMapping("/api/projects")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getAllProjects(@RequestParam String user_id) {
        try {
            if (user_id == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "You Must Login First"));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projectService.getAllProjectsByUser(user_id)));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    @GetMapping("/api/projectById")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getProjectById(@RequestParam String project_id) {

        try {
            if (project_id == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Project ID"));
            }
    
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projectService.getProjectById(project_id)));

        } catch (ProjectNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    // Post mappings

    @PostMapping("/api/addProject")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Project newProj) {

        try {

            if (newProj == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Project Object"));
            }

            Project insertedProject = projectService.addProject(newProj);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", insertedProject));

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }
}
