package com.workflow.server.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "project")
public class Project {
    private String _id;
    private String name;
    private String description;
    private Date deadline;
    private Date createdOn;
    private String backlog;
    private String timeline;
    private String createdBy;
    private Set<String> collaborators;
    private Set<String> tasks;
    private String statistics;

    public Project() {
    }

    public String get_id() {
        return this._id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Date getDeadline() {
        return this.deadline;
    }

    public Date getCreatedOn() {
        return this.createdOn;
    }

    public String getBacklog() {
        return this.backlog;
    }

    public String getTimeline() {
        return this.timeline;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public Set<String> getCollaborators() {
        return this.collaborators;
    }

    public Set<String> getTasks() {
        return this.tasks;
    }

    public String getStatistics() {
        return this.statistics;
    }

    // Setter methods

    public void setName(String new_name) {
        this.name = new_name;
    }

    public void setDescription(String new_desc) {
        this.description = new_desc;
    }

    public void setDeadline(Date new_date) {
        this.deadline = new_date;
    }

    public void setBacklog(String new_backlog) {
        this.backlog = new_backlog;
    }

    public void setTimeline(String new_timeline) {
        this.timeline = new_timeline;
    }

    public void setCreatedBy(String creator) {
        this.createdBy = creator;
    }

    public void setCollaborators(Set<String> collabs) {
        this.collaborators = collabs;
    }

    public void setTasks(Set<String> tasks) {
        this.tasks = tasks;
    }

    public void setStatistics(String stats) {
        this.statistics = stats;
    }

    @Override
    public String toString() {
        return "Project{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", deadline=" + deadline +
                ", createdOn=" + createdOn +
                ", backlog='" + backlog + '\'' +
                ", timeline='" + timeline + '\'' +
                ", created by='" + createdBy + '\'' +
                ", collaborators='" + collaborators + '\'' +
                ", tasks='" + tasks + '\'' +
                ", statistics='" + statistics + '\'' +
                '}';
    }
}
