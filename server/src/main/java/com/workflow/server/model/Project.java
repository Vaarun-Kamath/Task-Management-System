package com.workflow.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "project")
public class Project {
    private String name;
    private String desc;

    public Project() {
    }

    public String getName() {
        return this.name;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public void setDesc(String newDesc) {
        this.desc = newDesc;
    }

    @Override
    public String toString() {
        return "Project{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
