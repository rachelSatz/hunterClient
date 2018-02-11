import { Routes } from '@angular/router';

import { CanActivateAuthGuard } from '../_services/auth-guard.service';

import { PUBLIC_ROUTES } from './public.routes';
import { SECURE_ROUTES } from './secure.routes';

import { PublicComponent } from '../../public/public.component';
import { SecureComponent } from '../../secure/secure.component';

export const APP_ROUTES: Routes = [
  { path: '', component: PublicComponent, children: PUBLIC_ROUTES },
  { path: '', component: SecureComponent, children: SECURE_ROUTES }
  // { path: '', component: SecureComponent, children: SECURE_ROUTES, canActivate: [CanActivateAuthGuard] }
];
