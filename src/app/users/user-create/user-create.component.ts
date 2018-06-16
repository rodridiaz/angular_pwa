import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  enteredName = '';
  enteredEmail = '';
  user: User;
  isLoading = false;
  private mode = 'create';
  private userId: string;

  constructor(public usersService: UserService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.usersService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = { id: userData._id, name: userData.name, email: userData.email };
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
  }

  onSaveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.usersService.addUser(form.value.name, form.value.email);
    } else {
      this.usersService.updateUser(this.userId, form.value.name, form.value.email);
    }
    form.resetForm();
  }

}
