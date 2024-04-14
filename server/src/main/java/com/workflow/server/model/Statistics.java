package com.workflow.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "task")
public class Statistics extends Task{
    public Statistics(){
        super();
    }
}
