import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { UserSessionService } from '../../shared/_services/user-session.service';
import { AppHttpService } from '../../shared/_services/http/app-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: string;
  password: string;
  loginErrorMsg: string;
  loginErrors = false;

  constructor(private router: Router, private dialog: MatDialogRef<LoginComponent>,
              private userSession: UserSessionService, private appHttp: AppHttpService) {}

  makeLogin(isValid: boolean): void {
    this.loginErrors = false;
    if (isValid) {
      this.appHttp.login(this.username, this.password).then(response => this.handleLogin(response));
    }
  }

  private handleLogin(response: Object): void {
    if (response['responseCode']) {
      this.dialog.close();
      this.userSession.login(response['token'], this.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.loginErrors = true;
      this.loginErrorMsg = String(response);
    }
  }
}
