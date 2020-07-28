import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class CanActivateDashboard implements CanActivate {
  constructor(
      private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const token = localStorage.getItem('accessToken');

    if(token) {
        return of(true);
    }
    this.router.navigate(['/login']);
    ;
  }
}