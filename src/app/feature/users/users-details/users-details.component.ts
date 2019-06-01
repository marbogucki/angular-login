import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserDetails} from '../user.type';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  user: UserDetails;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.usersService.getUser(+params.id))
      )
      .subscribe((user: UserDetails) => this.user = user);
  }
}
