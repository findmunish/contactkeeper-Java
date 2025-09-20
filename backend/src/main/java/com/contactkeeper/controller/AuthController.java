package com.contactkeeper.controller;

import com.contactkeeper.dto.AuthResponse;
import com.contactkeeper.dto.LoginRequest;
import com.contactkeeper.dto.RegisterRequest;
import com.contactkeeper.model.User;
import com.contactkeeper.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));
            
            if (!userService.validatePassword(loginRequest.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
            
            String token = userService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User user = new User(registerRequest.getName(), registerRequest.getEmail(), registerRequest.getPassword());
            User savedUser = userService.registerUser(user);
            
            String token = userService.generateToken(savedUser);
            return ResponseEntity.ok(new AuthResponse(token, savedUser.getEmail()));
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering user");
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body("Authentication required");
            }
            
            User user = (User) authentication.getPrincipal();
            // Remove password from response
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Authentication required");
        }
    }
}