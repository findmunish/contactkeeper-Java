package com.contactkeeper.repository;

import com.contactkeeper.model.Contact;
import com.contactkeeper.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends MongoRepository<Contact, String> {
    
    List<Contact> findByUserOrderByDateDesc(User user);
    
    List<Contact> findByUserAndNameContainingIgnoreCaseOrderByDateDesc(User user, String name);
    
    List<Contact> findByUserAndEmailContainingIgnoreCaseOrderByDateDesc(User user, String email);
}
