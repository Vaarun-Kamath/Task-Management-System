package com.workflow.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.DatabaseRepository;
import com.workflow.server.model.Project;

@RestController
public class ProjectController {

    @Autowired
    DatabaseRepository projrepo;

    private Map<String, Object> getSuccessResponse(int status, String successCode, List<Project> content) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("successCode", successCode);
        response.put("data", content);
        return response;
    }
    @GetMapping("/api/projects")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getAllProjects() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", projrepo.findAll()));
    }
    @PostMapping("/api/addProject")
    @CrossOrigin("http://localhost:3000")
    public void addProjects(@RequestBody Project newProj) {
        System.out.println("Received Project for insertion: " + newProj.toString());
        projrepo.insert(newProj);
    }
}
