package com.workflow.server.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
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

import com.workflow.server.TaskRepository;
import com.workflow.server.model.Task;
import com.workflow.server.utils.CommonResponse;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskrepo;


    // Get Mappings

    @GetMapping("/api/tasks")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getProjectTasks(@RequestParam String projectId) {

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
            taskrepo.findByProjectId(projectId)
        ));
    }

    @GetMapping("/api/tasksSorted")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getTasksSorted(@RequestParam String projectId, @RequestParam long marginOfError) {

        if (projectId == null) {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.BAD_REQUEST.value(), 
                "Something went wrong!! [Project missing]"
            ));
        }

        List<Task> taskList = taskrepo.findByProjectId(projectId);
        taskList.sort(Comparator.comparing(
            tsk -> ((Task)tsk).getCreatedOn().getTime()
        ));

        List<List<Task>> resultGrid = new ArrayList<>();
        for (Task task : taskList) {
            boolean isAdded = false;
            for (List<Task> rowList : resultGrid) {
                Task lastTask = rowList.get(rowList.size() - 1);
                if (task.getCreatedOn().getTime() >= lastTask.getDueDate().getTime() + marginOfError) {
                    rowList.add(task);
                    isAdded = true;
                    break;
                }
            }
            if (!isAdded) {
                resultGrid.add( new ArrayList<>(){ {
                    add(task);
                } });
            }
        }

        return ResponseEntity
        .status(HttpStatus.OK)
        .body(CommonResponse.getSuccessResponse(
            HttpStatus.OK.value(), 
            "SUCCESS", 
            resultGrid
        ));
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
                .body(CommonResponse.getErrorResponse(
                    HttpStatus.BAD_REQUEST.value(), 
                    "Missing name, createdOn or createdBy"
                ));
            }

            taskrepo.insert(newTask);
            return ResponseEntity
            .status(HttpStatus.OK)
            .body(CommonResponse.getSuccessResponse(
                HttpStatus.OK.value(), 
                "Success", 
                newTask
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
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String,Object>> updateTask(@PathVariable String taskId, @RequestBody Task updatedTask) {
        // Check if the task with given taskId exists
        Optional<Task> optionalTask = taskrepo.findById(taskId);
        if (optionalTask.isEmpty()) {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(CommonResponse.getErrorResponse(
                HttpStatus.BAD_REQUEST.value(), 
                "Something went wrong!! [TASK missing]"
            ));
        }
        Task task = optionalTask.get();
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setAssigneeId(updatedTask.getAssigneeId());

        Task savedTask = taskrepo.save(task);

        return ResponseEntity
        .status(HttpStatus.OK)
        .body(CommonResponse.getSuccessResponse(
            HttpStatus.OK.value(), 
            "Success", 
            savedTask
        ));
    }

}
