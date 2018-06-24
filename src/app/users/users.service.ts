import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    this.http
      .get<{ message: string, users: any[] }>(
        BACKEND_URL + '/users'
      )
      .pipe(map((userData) => {
        return userData.users.map(user => {
          return {
            name: user.name,
            email: user.email,
            id: user._id,
            imagePath: user.imagePath
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

  getUser(id: string) {
    return this.http.get<{ _id: string, name: string, email: string, imagePath: string }>(
      BACKEND_URL + '/users/' + id
    );
  }

  addUser(name: string, email: string, image: File) {
    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('image', image, name);
    this.http
      .post<{ message: string, user: User }>(
        BACKEND_URL + '/users', userData
      )
      .subscribe((responseData) => {
        const user: User = {
          id: responseData.user.id,
          name: name,
          email: email,
          imagePath: responseData.user.imagePath
        };
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  updateUser(id: string, name: string, email: string, image: File | string) {
    let userData: User | FormData;
    if (typeof(image) === 'object') {
      userData = new FormData();
      userData.append('id', id);
      userData.append('name', name);
      userData.append('email', email);
      userData.append('image', image, name);
    } else {
      userData = {
        id: id,
        name: name,
        email: email,
        imagePath: image
      };
    }
    this.http.put(BACKEND_URL + '/users/' + id, userData)
      .subscribe(response => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex(u => u.id === id);
        const user: User = {
          id: id,
          name: name,
          email: email,
          imagePath: ''
        };
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  deleteUser(userId: string) {
    this.http.delete(BACKEND_URL + '/users/' + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter(user => user.id !== userId);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }
}
