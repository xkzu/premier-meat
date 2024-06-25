import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;
  passwordsDoNotMatch: boolean = false;

  constructor(private router: Router) {}

  validateEmail(): void {
    this.emailInvalid = !this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  }

  validatePassword(): void {
    this.passwordInvalid = this.password.length < 8;
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;
  }

  onSubmit(form: NgForm): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.emailInvalid && !this.passwordInvalid && !this.passwordsDoNotMatch) {
      // Guardar el usuario y redirigir
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({
        email: this.email,
        password: this.password,
        role: 'user'
      });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro exitoso. Ahora puede iniciar sesión.');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, corrija los errores en el formulario.');
    }
  }
}
