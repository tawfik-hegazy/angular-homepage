import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/contact';

  constructor(private http: HttpClient) {}



  //to send a message (name, email, message) to the backend
  sendMessage(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, data);
  }
}
