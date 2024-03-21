package com.workflow.server.model;

import java.util.Date;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "task")
public class Task {
    private String _id;
    private String title;
    private String description;
    private Date dueDate;
    private Date createdOn;
    private int priority;
    private String status;
    private String createdBy;
    private String projectId;
    private Set<String> assignees;

    public Task() {}

    // Getters

    public String getId() {
        return _id;
    }

    public String getTitle(){
        return title;
    }

    public String getDescription() {
        return description;
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

    public Set<String> getAssignees() {
        return assignees;
    }

    public String getProjectId(){
        return projectId;
    }

    public int getPriority(){
        return priority;
    }

    public String getStatus(){
        return status;
    }

    //Settters

    public void setTitle(String newTitle){
        title = newTitle;
    }

    public void setDescription(String newDescription) {
        description = newDescription;
    }

    public void setDueDate(Date newDueDate) {
        dueDate = newDueDate;
    }

    public void setCreatedBy (String creatorId) {
        createdBy = creatorId;
    }

    public void setCollaborators(Set<String> assignees) {
        this.assignees = assignees;
    }

    public void setPriority(int newPriority){
        priority = newPriority;
    }
    
    public void setStatus(String newStatus){
        status = newStatus;
    }

    @Override
    public String toString(){
        return "Task{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dueDate=" + dueDate +
                ", createdOn=" + createdOn +
                ", created by='" + createdBy + '\'' +
                ", assignees='" + assignees + '\'' +
                '}';
    }
}
