package com.contactkeeper.controller;

import com.contactkeeper.dto.ContactRequest;
import com.contactkeeper.dto.ContactUpdateRequest;
import com.contactkeeper.model.Contact;
import com.contactkeeper.model.User;
import com.contactkeeper.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {
    
    @Autowired
    private ContactService contactService;
    
    @GetMapping
    public ResponseEntity<?> getContacts(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Contact> contacts = contactService.getContactsByUser(user);
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting contacts");
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getContact(@PathVariable String id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            if (!contactService.isContactOwnedByUser(id, user)) {
                return ResponseEntity.badRequest().body("Not authorized");
            }
            
            Optional<Contact> contactOpt = contactService.findById(id);
            if (contactOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Contact not found");
            }
            
            return ResponseEntity.ok(contactOpt.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting contact");
        }
    }
    
    @PostMapping
    public ResponseEntity<?> addContact(@Valid @RequestBody ContactRequest contactRequest, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            Contact contact = new Contact(contactRequest.getName(), contactRequest.getEmail(), 
                                        contactRequest.getPhone(), contactRequest.getType(), user);
            Contact savedContact = contactService.addContact(contact);
            return ResponseEntity.ok(savedContact);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding contact");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable String id, @Valid @RequestBody ContactUpdateRequest contactUpdateRequest, 
                                         Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            if (!contactService.isContactOwnedByUser(id, user)) {
                return ResponseEntity.badRequest().body("Not authorized");
            }
            
            Optional<Contact> contactOpt = contactService.findById(id);
            if (contactOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Contact not found");
            }
            
            Contact contact = contactOpt.get();
            
            // Only update fields that are provided (not null)
            if (contactUpdateRequest.getName() != null) {
                contact.setName(contactUpdateRequest.getName());
            }
            if (contactUpdateRequest.getEmail() != null) {
                contact.setEmail(contactUpdateRequest.getEmail());
            }
            if (contactUpdateRequest.getPhone() != null) {
                contact.setPhone(contactUpdateRequest.getPhone());
            }
            if (contactUpdateRequest.getType() != null) {
                contact.setType(contactUpdateRequest.getType());
            }
            
            Contact updatedContact = contactService.updateContact(contact);
            return ResponseEntity.ok(updatedContact);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating contact");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable String id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            if (!contactService.isContactOwnedByUser(id, user)) {
                return ResponseEntity.badRequest().body("Not authorized");
            }
            
            Optional<Contact> contactOpt = contactService.findById(id);
            if (contactOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Contact not found");
            }
            
            contactService.deleteContact(id);
            return ResponseEntity.ok().body(Map.of("message", "Contact removed successfully"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting contact");
        }
    }
}
