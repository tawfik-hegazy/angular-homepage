import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private authservice = inject(AuthService);
private router=inject(Router)
@ViewChild('signinForm')signinForm !:NgForm;

error:string='';

  onSubmit() {
    const {email,password}=this.signinForm.value;
    this.authservice.login(email, password).subscribe({
      next: (user) => {
        console.log(user);
        this.signinForm.reset();
        this.router.navigate(['/admin/subjects']) // on sign in it makes him go to admin page
      },
 
      error: (err) => {
        this.error=err.message
      },
    });

  }


}
