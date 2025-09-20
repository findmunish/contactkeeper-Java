package com.contactkeeper.service;

import com.contactkeeper.model.User;
import com.contactkeeper.repository.UserRepository;
import com.contactkeeper.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setJwtSecret(UUID.randomUUID().toString());
        
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
    
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
    public String generateToken(User user) {
        return jwtUtil.generateToken(user.getId(), user.getJwtSecret());
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
