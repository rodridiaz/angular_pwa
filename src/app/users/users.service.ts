import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/users')
      .subscribe((userData) => {
        this.users = userData.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(name: string, email: string) {
    const user: User = {id: null, name: name, email: email};
    this.users.push(user);
    this.usersUpdated.next([...this.users]);
  }
}
