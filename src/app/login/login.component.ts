import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router, private userStateService: UserStateService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.firebaseService.login(form.value.email, form.value.password)
        .then(userCredential => {
          const uid = userCredential.user?.uid;
          if (uid) {
            this.firebaseService.getUserData(uid).subscribe(user => {
              if (user) {
                this.userStateService.setCurrentUser(user);
                this.router.navigate(['/products']);
              } else {
                this.loginError = true;
              }
            });
          } else {
            this.loginError = true;
          }
        })
        .catch(() => {
          this.loginError = true;
        });
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }
}
