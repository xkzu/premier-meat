import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'premier-meat';
  currentUser: User | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
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

  logout(): void {
    this.firebaseService.logout().then(() => {
      this.currentUser = null;
    });
  }
}
