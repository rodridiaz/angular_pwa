import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  enteredName = '';
  enteredEmail = '';
  @Output() userCreated = new EventEmitter<User>();

  onAddUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const user: User = {
      name: form.value.name,
      email: form.value.email
    };
    this.userCreated.emit(user);
  }

}
