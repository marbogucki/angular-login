import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send() {
    const targetUrl: string | undefined = this.route.snapshot.queryParamMap.get('targetUrl');

    this.authService.login(this.form.value, targetUrl);
  }
}
