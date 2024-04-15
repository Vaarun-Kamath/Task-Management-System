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

import com.workflow.server.exceptions.AbstractHttpException;
import com.workflow.server.services.StatisticsService;
import com.workflow.server.utils.CommonResponse;

@RestController
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    // Get Mappings

    @GetMapping("/api/tasksbreakdown")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getProjectTasksBreakdown(@RequestParam String projectId) {

      try {
        if (projectId == null) {
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.BAD_REQUEST,
                "Something went wrong!! [Project missing]"
            );
        }

        HashMap<String, Object> resobj = statisticsService.getProjectTasksBreakdown(projectId);

        return CommonResponse.getSuccessResponseEntity(
            HttpStatus.OK,
            "SUCCESS", resobj
        );

      } catch (Exception e) {
        return CommonResponse.getErrorResponseEntity(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
        );
      }
    }

    @GetMapping("/api/usercontributions")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getUserContributions(@RequestParam String projectId) {
      try {

        if (projectId == null) {
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.BAD_REQUEST,
                "Something went wrong!! [Project missing]"
            );
        }
       
        HashMap<String, Object> resobj = statisticsService.getUserContributions(projectId); 

        return CommonResponse.getSuccessResponseEntity(
            HttpStatus.OK,
            "SUCCESS", resobj
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
    

    @GetMapping("/api/taskstimeline")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Map<String, Object>> getTasksTimeline(@RequestParam String projectId) {
      try {

        if (projectId == null) {
            return CommonResponse.getErrorResponseEntity(
                HttpStatus.BAD_REQUEST,
                "Something went wrong!! [Project missing]"
            );
        }

        HashMap<String, Object> resobj = statisticsService.getTasksTimeline(projectId); 

        return CommonResponse.getSuccessResponseEntity(
            HttpStatus.OK,
            "SUCCESS", resobj
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