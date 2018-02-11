import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';

import { AppHttpService } from '../shared/_services/http/app-http.service';
import { CanActivateAuthGuard } from '../shared/_services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule
  ],
  entryComponents: [LoginComponent],
  declarations: [LoginComponent, PublicComponent],
  providers: [CanActivateAuthGuard, AppHttpService]
})
export class PublicModule {}
