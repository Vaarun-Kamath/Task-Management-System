package com.workflow.server.services;

import java.util.HashMap;

public interface StatisticsService {
    HashMap<String, Object> getProjectTasksBreakdown(String projectId);
    HashMap<String, Object> getTasksTimeline(String projectId);
    HashMap<String, Object> getUserContributions(String projectId);
}
