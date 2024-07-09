import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'premier-meat';
  currentUser: User | null = null;

  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.firebaseService.getAuthState().subscribe(user => {
      if (user) {
        this.firebaseService.getUserData(user.uid).subscribe(userData => {
          this.currentUser = userData;
        });
      } else {
        this.currentUser = null;
      }
    });
  }

  logout() {
    this.firebaseService.logout().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error al cerrar sesión', error);
    });
  }
}
