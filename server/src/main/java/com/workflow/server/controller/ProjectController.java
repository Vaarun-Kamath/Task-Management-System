package com.workflow.server.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
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

import com.workflow.server.ProjectRepository;
import com.workflow.server.model.Project;
import com.workflow.server.model.User;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projrepo;

    private Map<String, Object> getSuccessResponse(int status, String successCode, Object content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("successCode", successCode);
        response.put("data", content);
        return response;
    }

    private Map<String, Object> getErrorResponse(int status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("error", message);
        return response;
    }

    @GetMapping("/api/projects")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getAllProjects(@RequestParam String user_id) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projrepo.findByCreatedBy(user_id)));
    }

    @PostMapping("/api/addProject")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Project newProj) {
        System.out.println("Received Project for insertion: " + newProj);
        // projrepo.insert(newProj);
        try {
            String name = newProj.getName();
            Date createdOn = newProj.getCreatedOn();
            String createdBy = newProj.getCreatedBy();

            if (name == null || createdBy == null || createdOn == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing name, createdOn or createdBy"));
            }
            projrepo.insert(newProj);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(getSuccessResponse(HttpStatus.OK.value(), "Success", newProj));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }
}
