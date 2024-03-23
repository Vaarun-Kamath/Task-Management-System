package com.workflow.server.model;

import java.util.Date;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "task")
public class Statistics extends Task{
    public Statistics(){
        super();
    }
    
}
