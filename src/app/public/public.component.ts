import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {

  constructor(private dialog: MatDialog) {}

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }
}
