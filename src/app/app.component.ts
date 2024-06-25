import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from './services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'premier-meat';
  currentUser: any = null;

  constructor(private router: Router, private userStateService: UserStateService) {}

  ngOnInit(): void {
    this.userStateService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminUser = users.find((user: any) => user.role === 'admin');

    if (!adminUser) {
      const admin = {
        username: 'admin',
        email: 'admin@premiermeat.com',
        password: 'admin123',
        role: 'admin'
      };

      users.push(admin);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  logout(): void {
    this.userStateService.clearCurrentUser();
    this.router.navigate(['/home']);
  }
}
