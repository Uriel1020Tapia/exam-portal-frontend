import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenstorageService } from "../services/tokenstorage.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthPublicGuard implements CanActivate{
    roles:any  = {};


    constructor(  private tokenStorageSvc:TokenstorageService,private router: Router) { }
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      console.log("AuthPublicGuard");
      return this.checkUserLogin(next, url);
    }
      
    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        
        if (this.tokenStorageSvc.isLoggedIn()) {
            const user = this.tokenStorageSvc.getUser();
            this.roles = user.authorities;

            for(let i=0; i < this.roles.length; i++){
                console.log("roles guard",this.roles[i]);
      
                if( this.roles[i].authority === route.data.role){
                  return true;
                }
            }

            this.router.navigate(['/home']);
            return false;

        }else{
          this.router.navigate(['/login']);
          return false;
        }
      }
  }