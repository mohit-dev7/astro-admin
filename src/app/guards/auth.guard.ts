import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router:Router ) {
  }


  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    var userID = localStorage.getItem('userID');
//check some condition  
if (userID)  {

return true;

} 
else{
  this._router.navigate(['/auth/signin']);
return false;
}
}
  
}
