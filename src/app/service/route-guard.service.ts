import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { authenticationService } from './authentication-user.service';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private HardcodedAuthenticationService:HardcodedAuthenticationService,
    private authenticationUserService:authenticationService,
    private userService:UserService,    
    private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // if(this.HardcodedAuthenticationService.isLoggedIn)
    //   return true;
    // this.router.navigate(['login'])
    return false
  }
}
