import { Component } from "@angular/core";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent {
  name = '';
  newUser = 'NO_CONTENT';

  onAddUser() {
    this.newUser = this.name;
  }

}
