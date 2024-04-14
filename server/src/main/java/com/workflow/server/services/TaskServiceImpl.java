package com.workflow.server.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.server.TaskRepository;
import com.workflow.server.exceptions.TaskNotFoundException;
import com.workflow.server.model.Task;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    TaskRepository taskrepo;

    public List<Task> getProjectTasks(String projectId) {
        return taskrepo.findByProjectId(projectId);
    }

    public List<List<Task>> getTasksSorted(List<Task> taskslist, long marginOfError) {
        taskslist.sort(Comparator.comparing(
            tsk -> ((Task)tsk).getCreatedOn().getTime()
        ));

        List<List<Task>> resultGrid = new ArrayList<>();
        for (Task task : taskslist) {
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

        return resultGrid;
    }

    public Task addTask(Task newTask) {
        String title = newTask.getTitle();
        Date createdOn = newTask.getCreatedOn();
        String createdBy = newTask.getCreatedBy();

        if (title == null || createdBy == null || createdOn == null)
            throw new IllegalArgumentException("Missing name, createdOn or createdBy");

        return taskrepo.insert(newTask);
    }

    public Task updateTask(String taskId, Task updatedTask) {
        Optional<Task> optionalTask = taskrepo.findById(taskId);

        if(optionalTask.isEmpty())
            throw new TaskNotFoundException("Something went wrong!! [TASK missing] [TaskID: " + taskId + " ]");

        Task task = optionalTask.get();
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setAssigneeId(updatedTask.getAssigneeId());

        Task savedTask = taskrepo.save(task);
        return savedTask;
    }
}
