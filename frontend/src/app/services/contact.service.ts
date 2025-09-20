import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactRequest } from '../models/contact.model';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiConfig.contactsUrl);
  }

  addContact(contact: ContactRequest): Observable<Contact> {
    return this.http.post<Contact>(this.apiConfig.contactsUrl, contact);
  }

  updateContact(id: string, contact: ContactRequest): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiConfig.contactsUrl}/${id}`, contact);
  }

  deleteContact(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiConfig.contactsUrl}/${id}`);
  }
}
