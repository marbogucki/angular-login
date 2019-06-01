import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from "../users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group({
      name: '',
      email: '',
      age: '',
      position: ''
    });
  }

  addUser() {
    this.usersService.addUser(this.userForm.value)
      .subscribe(() => this.router.navigate(['/users']));
  }

}
