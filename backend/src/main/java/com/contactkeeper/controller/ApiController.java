package com.contactkeeper.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/endpoints")
    public Map<String, Object> getApiEndpoints() {
        Map<String, Object> endpoints = new HashMap<>();
        
        // Home endpoints
        Map<String, String> home = new HashMap<>();
        home.put("GET /", "Welcome message");
        endpoints.put("Home", home);
        
        // Authentication endpoints
        Map<String, String> auth = new HashMap<>();
        auth.put("POST /api/auth", "User login");
        auth.put("GET /api/auth", "Get current user (requires JWT token)");
        endpoints.put("Authentication", auth);
        
        // User endpoints
        Map<String, String> users = new HashMap<>();
        users.put("GET /api/users", "Get all registered users");
        users.put("POST /api/users", "User registration");
        endpoints.put("Users", users);
        
        // Contact endpoints
        Map<String, String> contacts = new HashMap<>();
        contacts.put("GET /api/contacts", "Get all contacts (requires JWT token)");
        contacts.put("POST /api/contacts", "Add new contact (requires JWT token)");
        contacts.put("PUT /api/contacts/{id}", "Update contact (requires JWT token)");
        contacts.put("DELETE /api/contacts/{id}", "Delete contact (requires JWT token)");
        endpoints.put("Contacts", contacts);
        
        // Actuator endpoints
        Map<String, String> actuator = new HashMap<>();
        actuator.put("GET /actuator/mappings", "Complete list of all endpoints");
        actuator.put("GET /actuator/health", "Application health status");
        actuator.put("GET /actuator/info", "Application information");
        actuator.put("GET /actuator/beans", "All Spring beans");
        endpoints.put("Actuator", actuator);
        
        return endpoints;
    }
}
