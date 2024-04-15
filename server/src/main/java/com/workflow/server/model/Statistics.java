package com.workflow.server.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "task")
public class Statistics {
    private String _id;
    private Date dueDate;
    private Date createdOn;
    private String status;
    private String createdBy;
    private String projectId;
    private String assigneeId;

    public Statistics() {}

    // Getters

    public String getId() {
        return _id;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public String getAssigneeId() {
        return assigneeId;
    }

    public String getProjectId(){
        return projectId;
    }

    public String getStatus(){
        return status;
    }

    //Settters

    public void setDueDate(Date newDueDate) {
        dueDate = newDueDate;
    }

    public void setCreatedBy (String creatorId) {
        createdBy = creatorId;
    }

    public void setAssigneeId(String assigneeId) {
        this.assigneeId = assigneeId;
    }
    
    public void setStatus(String newStatus){
        status = newStatus;
    }

    @Override
    public String toString(){
        return "Task{" +
                "dueDate=" + dueDate +
                ", createdOn=" + createdOn +
                ", created by='" + createdBy + '\'' +
                ", assigneeId='" + assigneeId + '\'' +
                ", status='" + status +'\''+
                ", assigneeId='" + assigneeId +'\''+
                '}';
    }
}
