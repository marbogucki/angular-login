import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
  }

}
