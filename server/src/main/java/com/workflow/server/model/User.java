package com.workflow.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    private String _id;
    private String username;
    private String email;
    private String password;

    public User() {
    }

    // Getters

    public String get_id() {
        return this._id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    // Setters

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{ _id= " + this.get_id() +
                ", username=" + this.getUsername() +
                ", email=" + this.getEmail() +
                ", password=" + this.getPassword() +
                "}";
    }
}
