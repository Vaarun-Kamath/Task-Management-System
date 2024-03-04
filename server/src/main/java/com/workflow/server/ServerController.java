package com.workflow.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {
    
    @CrossOrigin("http://localhost:3000")
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello";
    }
}
