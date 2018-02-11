import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserSessionService } from './user-session.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
	constructor(private router: Router, private userSession: UserSessionService) {}

	canActivate(): boolean {
	  if (this.userSession.getUser().token) {
			return true;
		}

		this.router.navigate(['']);
		return false;
	}

}
