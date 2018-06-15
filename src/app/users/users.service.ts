import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  getUsers() {
    return [...this.users];
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(name: string, email: string) {
    const user: User = {name: name, email: email};
    this.users.push(user);
    this.usersUpdated.next([...this.users]);
  }
}
