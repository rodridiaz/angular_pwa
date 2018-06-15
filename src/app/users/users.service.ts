import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get<{ message: string, users: any[] }>(
        'http://localhost:3000/api/users'
      )
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            name: user.name,
            email: user.email,
            id: user._id
          };
        });
      }))
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(name: string, email: string) {
    const user: User = {id: null, name: name, email: email};
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/users', user
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
      });
  }
}
