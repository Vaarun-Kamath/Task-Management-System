package com.workflow.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.ProjectRepository;
import com.workflow.server.model.Project;

@RestController
public class ProjectController {

    @Autowired
    ProjectRepository projrepo;

    @CrossOrigin("http://localhost:3000")
    @GetMapping("/api/projects")
    public List<Project> getAllProjects() {
        return projrepo.findAll();
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping("/api/addProject")
    public void addProjects(@RequestBody Project newProj) {
        System.out.println("Received Project for insertion: " + newProj.toString());
        projrepo.insert(newProj);
    }
}
