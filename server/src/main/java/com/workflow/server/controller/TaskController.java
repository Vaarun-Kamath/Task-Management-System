package com.workflow.server.controller;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

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

import com.workflow.server.TaskRepository;
import com.workflow.server.model.Task;
import com.workflow.server.utils.CommonResponse;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskrepo;


    // Get Mappings

    // @CrossOrigin("http://localhost:3000")
    // @PostMapping("/api/assignCollaborator")
    // public ResponseEntity<Map<String, Object>> addAssignee(@RequestBody Map<String, String> request) {
    //     try {
    //         String userId = request.get("userId");
    //         String taskId = request.get("taskId");
    //         if (username == null) {
    //             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    //                     .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing Username"));
    //         }

    //         User data = CheckUserCollaboration(username);

    //         if (data.get_id() != null) {
    //             boolean res = projectController.addCollaborator(projectId, data.get_id());
    //             if (res) {
    //                 return ResponseEntity.status(HttpStatus.OK)
    //                         .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", new HashMap<>()));
    //             } else {
    //                 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    //                         .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(),
    //                                 "User already collaborator or Project does not exist"));
    //             }
    //         } else {
    //             return ResponseEntity.status(HttpStatus.NOT_FOUND)
    //                     .body(CommonResponse.getErrorResponse(HttpStatus.NOT_FOUND.value(), "User not found"));
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
    //                         "Internal server error"));
    //     }
    // }

    @GetMapping("/api/tasks")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getProjectTasks(@RequestParam String projectId) {

        if (projectId == null) {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }

        return ResponseEntity
        .status(HttpStatus.OK)
        .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", taskrepo.findByProjectId(projectId)));
    }

    // Post mappings

    @PostMapping("/api/addTask")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> addProjects(@RequestBody Task newTask) {
        System.out.println("Received Task for insertion: " + newTask);
        try {
            String title = newTask.getTitle();
            Date createdOn = newTask.getCreatedOn();
            String createdBy = newTask.getCreatedBy();

            if (title == null || createdBy == null || createdOn == null) {
                return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Missing name, createdOn or createdBy"));
            }

            taskrepo.insert(newTask);
            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", newTask));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error"));
        }
    }

    // Update mapping

    @PutMapping("/api/updateTask/{taskId}")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String,Object>> updateTask(@PathVariable String taskId, @RequestBody Task updatedTask) {
        // Check if the task with given taskId exists
        Optional<Task> optionalTask = taskrepo.findById(taskId);
        if (optionalTask.isEmpty()) {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [TASK missing]"));
        }
        Task task = optionalTask.get();
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setAssigneeId(updatedTask.getAssigneeId());

        Task savedTask = taskrepo.save(task);

        return ResponseEntity
        .status(HttpStatus.OK)
        .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "Success", savedTask));
    }

}
