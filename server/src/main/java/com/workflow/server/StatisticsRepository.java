package com.workflow.server;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.workflow.server.model.Statistics;

import java.util.List;


public interface StatisticsRepository extends MongoRepository <Statistics, String>{
    List<Statistics> findByProjectId(String projectId);

    @Query("{'projectId': ?0, 'status': ?1}")
    List<Statistics> findCompletedbyProjectId(String projectId, String status);
    
}
