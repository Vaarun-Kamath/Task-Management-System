package com.workflow.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.exceptions.UserNotFoundException;
import com.workflow.server.services.StatisticsService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    UserController usercontroller;
    // Get Mappings

    @GetMapping("/api/tasksbreakdown")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getProjectTasksBreakdown(@RequestParam String projectId) {

      try {
        if (projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }

        HashMap<String, Object> resobj = statisticsService.getProjectTasksBreakdown(projectId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", resobj));

      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error"));
      }
    }

    @GetMapping("/api/usercontributions")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getUserContributions(@RequestParam String projectId) {
      try {

        if (projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }
       
        HashMap<String, Object> resobj = statisticsService.getUserContributions(projectId); 

        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", resobj));

      } catch (UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
      } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error"));
      }
    }
    

    @GetMapping("/api/taskstimeline")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getTasksTimeline(@RequestParam String projectId) {
      try {

        if (projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }

        HashMap<String, Object> resobj = statisticsService.getTasksTimeline(projectId); 

        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", resobj));

      } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.getErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error"));
      }
    }   
}