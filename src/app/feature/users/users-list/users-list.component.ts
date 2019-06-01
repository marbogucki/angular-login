import {Component, OnInit} from '@angular/core';
import {User} from '../user.type';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe(
        (users: User[]) => this.users = users
      );
  }

  removeUser(user: User) {
    this.usersService.removeUser(user)
      .subscribe(() => {
        this.users = this.users.filter(item => item.id !== user.id);
      });
  }
}
