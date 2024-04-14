package com.workflow.server.services;

import java.util.List;

import com.workflow.server.model.Task;

public interface TaskService {
    List<Task> getProjectTasks(String projectId);
    List<List<Task>> getTasksSorted(List<Task> tasks, long marginOfError);
    Task addTask(Task newTask);
    Task updateTask(String taskId, Task updatedTask);
}