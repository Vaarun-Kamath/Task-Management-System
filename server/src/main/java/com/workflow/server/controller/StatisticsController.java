package com.workflow.server.controller;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.server.StatisticsRepository;
import com.workflow.server.model.Project;
import com.workflow.server.model.Statistics;
import com.workflow.server.model.Task;
import com.workflow.server.model.User;
import com.workflow.server.utils.CommonResponse;

@RestController
public class StatisticsController {

    @Autowired
    StatisticsRepository statrepo;

    // Get Mappings

    @GetMapping("/api/tasksbreakdown")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getProjectTasksBreakdown(@RequestParam String projectId) {

        if (projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }
        
        List<Statistics> tasks = statrepo.findByProjectId(projectId);
        // System.out.println("Tasks: "+ tasks);
       
        HashMap<String, Object> resobj = new HashMap<>(); 
        int todo = 0;
        int pending = 0;
        int completed = 0;
        int missed = 0;
        Date today = new Date();
        for (Task i: tasks){
            if((i.getStatus()).equals("COMPLETED")){
              completed++;
            }
            else {
              if((i.getDueDate()).before(today)){
                missed++;
              }
              else if((i.getStatus()).equals("TODO")){
                todo++;
              }
              else if((i.getStatus()).equals("IN-PROGRESS")){
                pending++;
              }
            }
        }
        resobj.put("labels", Arrays.asList("TODO","IN PROGRESS", "COMPLETED", "MISSED"));
        resobj.put("values", Arrays.asList(todo, pending, completed, missed));

        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", resobj));
    }

    @GetMapping("/api/taskstimeline")
    @CrossOrigin("http://localhost:3000")//* Done */
    public ResponseEntity<Map<String, Object>> getUserContributions(@RequestParam String projectId) {

        if (projectId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(CommonResponse.getErrorResponse(HttpStatus.BAD_REQUEST.value(), "Something went wrong!! [Project missing]"));
        }

        List<Statistics> tasks = statrepo.findCompletedbyProjectId(projectId,"COMPLETED");
        // System.out.println("Tasks: "+ tasks);
        
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        Integer[] values = {0,0,0,0,0,0,0,0,0,0,0,0};
        HashMap<String, Object> resobj = new HashMap<>(); 
        SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy");
        for (Task i: tasks){
            String month = (formatter.format(i.getDueDate())).split(" ")[1];
            if(Arrays.asList(months).contains(month)){
                values[getMonthNumber(month)-1]++;
            }
        }
        resobj.put("labels", Arrays.asList(months));
        resobj.put("values", Arrays.asList(values));
        return ResponseEntity.status(HttpStatus.OK)
                .body(CommonResponse.getSuccessResponse(HttpStatus.OK.value(), "SUCCESS", resobj));
    }

    public static int getMonthNumber(String month) {
        month = month.toUpperCase(); 
        switch (month) {
          case "JAN":
            return 1;
          case "FEB":
            return 2;
          case "MAR":
            return 3;
          case "APR":
            return 4;
          case "MAY":
            return 5;
          case "JUN":
            return 6;
          case "JUL":
            return 7;
          case "AUG":
            return 8;
          case "SEP":
            return 9;
          case "OCT":
            return 10;
          case "NOV":
            return 11;
          case "DEC":
            return 12;
          default:
            throw new IllegalArgumentException("Invalid month name: " + month);
        }
      }
      
}
