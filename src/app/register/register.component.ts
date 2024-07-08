import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  passwordsDoNotMatch: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  validateEmail(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !emailPattern.test(this.email);
  }

  validatePassword(): void {
    this.passwordInvalid = this.password.length < 8;
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;
  }

  onSubmit(registerForm: NgForm): void {
    if (registerForm.valid && !this.emailInvalid && !this.passwordInvalid && !this.passwordsDoNotMatch) {
      this.firebaseService.register(this.email, this.password)
        .then(userCredential => {
          const uid = userCredential.user?.uid;
          if (uid) {
            // Guardar en Firestore
            this.firebaseService.saveUserData(uid, this.email, this.username)
              .then(() => {
                this.router.navigate(['/login']);
              })
              .catch(error => {
                console.error('Error al guardar en Firestore', error);
              });
          }
        })
        .catch((error: any) => {
          console.error('Error al registrar', error);
        });
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }
}
