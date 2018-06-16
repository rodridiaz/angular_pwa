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
  isLoading = false;
  private usersSub: Subscription;

  // The public keyword will automatically create a new property in
  // the component and store the incoming value in that property.
  constructor(public usersService: UserService) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersService.getUsers();
    this.usersSub = this.usersService.getUserUpdateListener()
      .subscribe((users: User[]) => {
        this.isLoading = false;
        this.users = users;
      });
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
