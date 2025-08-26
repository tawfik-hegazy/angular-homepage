import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private authservice = inject(AuthService);

@ViewChild('signinForm')signinForm !:NgForm;

error:string='';

  onSubmit() {
    const {email,password}=this.signinForm.value;
    this.authservice.login(email, password).subscribe({
      next: (user) => {
        console.log(user);
      },
 
      error: (err) => {
        this.error=err.message
      },
    });

  }


}
