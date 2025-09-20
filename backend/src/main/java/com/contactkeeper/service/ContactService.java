package com.contactkeeper.service;

import com.contactkeeper.model.Contact;
import com.contactkeeper.model.User;
import com.contactkeeper.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    public List<Contact> getContactsByUser(User user) {
        return contactRepository.findByUserOrderByDateDesc(user);
    }
    
    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }
    
    public Optional<Contact> findById(String id) {
        return contactRepository.findById(id);
    }
    
    public Contact updateContact(Contact contact) {
        return contactRepository.save(contact);
    }
    
    public void deleteContact(String id) {
        contactRepository.deleteById(id);
    }
    
    public boolean isContactOwnedByUser(String contactId, User user) {
        Optional<Contact> contact = findById(contactId);
        return contact.isPresent() && contact.get().getUser().getId().equals(user.getId());
    }
    
    public List<Contact> searchContacts(User user, String searchTerm) {
        List<Contact> nameResults = contactRepository.findByUserAndNameContainingIgnoreCaseOrderByDateDesc(user, searchTerm);
        List<Contact> emailResults = contactRepository.findByUserAndEmailContainingIgnoreCaseOrderByDateDesc(user, searchTerm);
        
        // Combine and remove duplicates
        nameResults.addAll(emailResults);
        return nameResults.stream().distinct().toList();
    }
}
