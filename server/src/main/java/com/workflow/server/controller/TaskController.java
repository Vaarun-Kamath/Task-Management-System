package com.workflow.server.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.exceptions.TaskNotFoundException;
import com.workflow.server.model.Task;
import com.workflow.server.services.TaskService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Get Mappings

    @GetMapping("/api/tasks")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getProjectTasks(@RequestParam String projectId) {
        try {
            if (projectId == null) {
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CommonResponse.getErrorResponse(
                    HttpStatus.BAD_REQUEST.value(), 
                    "Something went wrong!! [Project missing]"
                ));
            }
    
            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(
                HttpStatus.OK.value(), 
                "SUCCESS", 
                taskService.getProjectTasks(projectId)
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    @GetMapping("/api/tasksSorted")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getTasksSorted(@RequestParam String projectId, @RequestParam long marginOfError) {

        try {
            if (projectId == null) {
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CommonResponse.getErrorResponse(
                    HttpStatus.BAD_REQUEST.value(), 
                    "Something went wrong!! [Project missing]"
                ));
            }

            List<Task> taskList = taskService.getProjectTasks(projectId);

            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(
                HttpStatus.OK.value(), 
                "SUCCESS", 
                taskService.getTasksSorted(taskList, marginOfError)
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    // Post mappings

    @PostMapping("/api/addTask")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Task newTask) {
        try {
            if (newTask == null) {
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CommonResponse.getErrorResponse(
                    HttpStatus.BAD_REQUEST.value(), 
                    "Missing Task"
                ));
            }

            Task addedTask = taskService.addTask(newTask);
            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(
                HttpStatus.OK.value(), 
                "Success", 
                addedTask
            ));

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.BAD_REQUEST.value(), 
                e.getMessage()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(), 
                "Internal server error"
            ));
        }
    }

    // Update mapping

    @PutMapping("/api/updateTask/{taskId}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String,Object>> updateTask(@PathVariable String taskId, @RequestBody Task updatedTask) {
        try {
            if(taskId == null || updatedTask == null) {
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CommonResponse.getErrorResponse(
                    HttpStatus.BAD_REQUEST.value(),
                    "Something went wrong!! [Project or updated Task missing]"
                ));
            }

            Task savedTask = taskService.updateTask(taskId, updatedTask);

            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(
                HttpStatus.OK.value(), 
                "Success", 
                savedTask
            ));
        } catch (TaskNotFoundException e) {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.BAD_REQUEST.value(), 
                e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(), 
                "Internal Server Error"
            ));
        }
    }
}
