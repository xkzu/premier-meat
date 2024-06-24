import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'premier-meat';

  ngOnInit(): void {
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
}
