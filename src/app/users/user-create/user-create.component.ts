import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private userId: string;

  constructor(public usersService: UserService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'email': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.usersService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            name: userData.name,
            email: userData.email
          };
          this.form.setValue({
            'name': this.user.name,
            'email': this.user.email,
          });
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveUser() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.usersService.addUser(this.form.value.name, this.form.value.email);
    } else {
      this.usersService.updateUser(this.userId, this.form.value.name, this.form.value.email);
    }
    this.form.reset();
  }

}
