import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { User } from '../_models/user.model';

@Injectable()
export class UserSessionService {

	isLoggedInSubject: Subject<boolean> = new Subject;

	login(token: string, username: string): void {
		this.isLoggedInSubject.next(true);
    sessionStorage.setItem('user', JSON.stringify(<User>{ token: token, username: username }));
	}

	logout(): void {
		this.isLoggedInSubject.next(false);
		sessionStorage.removeItem('user');
	}

	getUser(): any {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')) as User;
    }

    return false;
	}

  getToken(): any {
    if (sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user')).token;
    }

    return '';
  }
}
