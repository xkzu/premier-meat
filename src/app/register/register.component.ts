import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailErrors: any = null;
  passwordErrors: any = null;
  confirmPasswordErrors: any = null;
  usernameErrors: any = null;
  emailExistsError: boolean = false;

  onEmailInput(event: Event, form: NgForm): void {
    const emailControl = form.controls['email'];
    if (emailControl && emailControl.errors) {
      this.emailErrors = emailControl.errors;
    } else {
      this.emailErrors = null;
    }

    this.checkEmailExists(form.value.email);
  }

  checkEmailExists(email: string): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some((user: any) => user.email === email);
    this.emailExistsError = emailExists;
  }

  onPasswordInput(event: Event, form: NgForm): void {
    this.checkPasswordsMatch(form);
    this.updatePasswordErrors(form);
  }

  onConfirmPasswordInput(event: Event, form: NgForm): void {
    this.checkPasswordsMatch(form);
    this.updatePasswordErrors(form);
  }

  onUsernameInput(event: Event, form: NgForm): void {
    const usernameControl = form.controls['username'];
    const usernameValue = usernameControl.value;
    const regex = /^[a-zA-Z0-9_-]*$/;

    if (!regex.test(usernameValue)) {
      usernameControl.setErrors({ invalidUsername: true });
      this.usernameErrors = { invalidUsername: true };
    } else {
      usernameControl.setErrors(null);
      this.usernameErrors = null;
    }
  }

  checkPasswordsMatch(form: NgForm): void {
    const passwordControl = form.controls['password'];
    const confirmPasswordControl = form.controls['confirmPassword'];

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      this.confirmPasswordErrors = { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      this.confirmPasswordErrors = null;
    }

    this.passwordErrors = passwordControl.errors;
  }

  updatePasswordErrors(form: NgForm): void {
    const passwordControl = form.controls['password'];
    this.passwordErrors = passwordControl.errors;
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.emailExistsError) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        role: 'user' // Rol por defecto para usuarios normales
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Usuario registrado con éxito.');
      form.reset();
    } else if (this.emailExistsError) {
      alert('El correo electrónico ya está registrado. Por favor, use otro correo electrónico.');
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }
}
