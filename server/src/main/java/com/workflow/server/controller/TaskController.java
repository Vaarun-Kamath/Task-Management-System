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

import com.workflow.server.exceptions.AbstractHttpException;
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
                return CommonResponse.getErrorResponseEntity(
                    HttpStatus.BAD_REQUEST, 
                    "Something went wrong!! [Project missing]"
                );
            }
    
            return CommonResponse.getSuccessResponseEntity(
                HttpStatus.OK, 
                "SUCCESS", 
                taskService.getProjectTasks(projectId)
            );

        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error"
            );
        }
    }

    @GetMapping("/api/tasksSorted")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getTasksSorted(@RequestParam String projectId, @RequestParam long marginOfError) {

        try {
            if (projectId == null) {
                return CommonResponse.getErrorResponseEntity(
                    HttpStatus.BAD_REQUEST, 
                    "Something went wrong!! [Project missing]"
                );
            }

            List<Task> taskList = taskService.getProjectTasks(projectId);

            return CommonResponse.getSuccessResponseEntity(
                HttpStatus.OK, 
                "SUCCESS", 
                taskService.getTasksSorted(taskList, marginOfError)
            );

        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error"
            );
        }
    }

    // Post mappings

    @PostMapping("/api/addTask")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Task newTask) {
        try {
            if (newTask == null) {
                return CommonResponse.getErrorResponseEntity(
                    HttpStatus.BAD_REQUEST, 
                    "Missing Task"
                );
            }

            Task addedTask = taskService.addTask(newTask);
            return CommonResponse.getSuccessResponseEntity(
                HttpStatus.OK, 
                "Success", 
                addedTask
            );

        } catch (AbstractHttpException e) {
            e.printStackTrace();
            return e.asErrorResponseEntity();

        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Internal server error"
            );
        }
    }

    // Update mapping

    @PutMapping("/api/updateTask/{taskId}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String,Object>> updateTask(@PathVariable String taskId, @RequestBody Task updatedTask) {
        try {
            if(taskId == null || updatedTask == null) {
                return CommonResponse.getErrorResponseEntity(
                    HttpStatus.BAD_REQUEST,
                    "Something went wrong!! [Project or updated Task missing]"
                );
            }

            Task savedTask = taskService.updateTask(taskId, updatedTask);

            return CommonResponse.getSuccessResponseEntity(
                HttpStatus.OK, 
                "Success", 
                savedTask
            );
        } catch (AbstractHttpException e) {
            return e.asErrorResponseEntity();

        } catch (Exception e) {
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                "Internal Server Error"
            );
        }
    }
}
