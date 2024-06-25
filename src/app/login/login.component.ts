import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: boolean = false;

  constructor(private router: Router, private userStateService: UserStateService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user: any) => user.email === form.value.email && user.password === form.value.password);

      if (user) {
        this.userStateService.setCurrentUser(user);
        this.router.navigate(['/products']);
      } else {
        this.loginError = true;
      }
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }
}
