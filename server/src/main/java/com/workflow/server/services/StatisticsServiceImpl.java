package com.workflow.server.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.server.StatisticsRepository;
import com.workflow.server.model.Statistics;

@Service
public class StatisticsServiceImpl implements StatisticsService{
    
    @Autowired
    private StatisticsRepository statRepo;

    @Autowired
    private UserService userService;

    @Override
    public HashMap<String, Object> getProjectTasksBreakdown(String projectId) {
        List<Statistics> tasks = statRepo.findByProjectId(projectId);

        HashMap<String, Object> resObj = new HashMap<>();
        int todo = 0;
        int pending = 0;
        int completed = 0;
        int missed = 0;
        Date today = new Date();

        for (Statistics task : tasks) {
            if (task.getStatus().equals("DONE")) {
                completed++;
            } else {
                if (task.getDueDate().before(today)) {
                    missed++;
                } else if (task.getStatus().equals("TODO")) {
                    todo++;
                } else if (task.getStatus().equals("CURRENT")) {
                    pending++;
                }
            }
        }

        resObj.put("labels", Arrays.asList("TODO", "IN PROGRESS", "COMPLETED", "MISSED"));
        resObj.put("values", Arrays.asList(todo, pending, completed, missed));

        return resObj;
    }

    @Override
    public HashMap<String, Object> getTasksTimeline(String projectId) {

        List<Statistics> tasks = statRepo.findCompletedbyProjectId(projectId, "DONE");

        String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
        Integer[] values = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
        HashMap<String, Object> resObj = new HashMap<>();
        SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd HH:mm:ss z yyyy");

        for (Statistics task : tasks) {
            String month = formatter.format(task.getDueDate()).split(" ")[1];
            if (Arrays.asList(months).contains(month)) {
                values[getMonthNumber(month) - 1]++;
            }
        }

        resObj.put("labels", Arrays.asList(months));
        resObj.put("values", Arrays.asList(values));
        return resObj;
    }

    @Override
    public HashMap<String, Object> getUserContributions(String projectId) {

        List<Statistics> tasks = statRepo.findCompletedbyProjectId(projectId, "DONE");

        HashMap<String, Object> resobj = new HashMap<>(); 
        List<String> assignees = new ArrayList<>();
        List<Integer> completedTasks = new ArrayList<>();
        List<Integer> pendingTasks = new ArrayList<>();

        for (Statistics i: tasks){
            String assignee_id = i.getAssigneeId();

            if(assignee_id.equals(""))
                continue;

            String assignee = userService.getUserNameById(assignee_id);

            int assigneeIndex = assignees.indexOf(assignee);
            boolean completed = i.getStatus().equals("DONE");
            if (assigneeIndex == -1) {
                assignees.add(assignee);
                completedTasks.add(completed ? 1 : 0);
                pendingTasks.add(completed ? 0 : 1);
            } else {
                int countIndex = completed ? completedTasks.get(assigneeIndex) : pendingTasks.get(assigneeIndex);
                (completed ? completedTasks : pendingTasks).set(assigneeIndex, countIndex + 1);
            }
        }
      
        resobj.put("assignees", assignees);
        resobj.put("completed", completedTasks);
        resobj.put("pending", pendingTasks);

        return resobj;
    }

    private static int getMonthNumber(String month) {
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
