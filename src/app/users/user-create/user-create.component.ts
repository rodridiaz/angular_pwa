import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  enteredName = '';
  enteredEmail = '';
  @Output() userCreated = new EventEmitter();

  onAddUser() {
    const user = {
      name: this.enteredName,
      email: this.enteredEmail
    };
    this.userCreated.emit(user);
  }

}
