import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  enteredName = '';
  enteredEmail = '';

  constructor(public usersService: UserService) {}

  onAddUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.usersService.addUser(form.value.name, form.value.email);
  }

}
