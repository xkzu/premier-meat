import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  passwordsDoNotMatch: boolean = false;
  usernameInvalid: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.emailInvalid = !emailPattern.test(this.email);
  }

  validatePassword() {
    this.passwordInvalid = this.password.length < 8;
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;
  }

  validateUsername() {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    this.usernameInvalid = !usernamePattern.test(this.username);
  }

  onSubmit() {
    if (!this.emailInvalid && !this.passwordInvalid && !this.passwordsDoNotMatch && !this.usernameInvalid) {
      this.firebaseService.register(this.email, this.password)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.error('Error al registrar', error);
        });
    }
  }
}
