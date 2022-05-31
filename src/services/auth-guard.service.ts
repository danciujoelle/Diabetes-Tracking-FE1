import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  routeURL: string;

  constructor(private authService: UserService, private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.authService.userDetails && this.routeURL !== '/login') {
        this.routeURL = '/login';
        this.router.navigate(['/login'], {
          queryParams: {
            return: 'login',
          },
        });
        return resolve(false);
      } else {
        this.routeURL = this.router.url;
        return resolve(true);
      }
    });
  }
}
