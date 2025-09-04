import { Component } from '@angular/core';
import { ContactService } from '../services/contact';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  imports: [ FormsModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css'
})
export class Contactus {
  name = '';
  email = '';
  message = '';
  successMessage = '';
  errorMessage = '';

  constructor(private contactService: ContactService) {}

  submit() {
    this.contactService.sendMessage({ name: this.name, email: this.email, message: this.message })
      .subscribe({
        next: (res) => {
          // Show success message
          this.successMessage = 'Message sent successfully!';
          this.errorMessage = '';
          // Reset form
          this.name = '';
          this.email = '';
          this.message = '';
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = 'Error sending message!';
        }
      });
  }
}
