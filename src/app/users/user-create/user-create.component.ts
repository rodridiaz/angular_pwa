import { Component, EventEmitter, Output } from '@angular/core';

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

  onAddUser() {
    const user: User = {
      name: this.enteredName,
      email: this.enteredEmail
    };
    this.userCreated.emit(user);
  }

}
