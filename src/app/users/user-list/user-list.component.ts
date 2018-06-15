import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../user.model';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription;

  // The public keyword will automatically create a new property in
  // the component and store the incoming value in that property.
  constructor(public usersService: UserService) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
