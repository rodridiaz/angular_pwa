import { Component } from "@angular/core";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users = [
    {
      name: 'First User',
      email: 'weeeeells@bluesmachine.com'
    },
    {
      name: 'Second User',
      email: 'weeeeells@bluesmachine.com'
    },
    {
      name: 'Third User',
      email: 'weeeeells@bluesmachine.com'
    }
  ];

}
