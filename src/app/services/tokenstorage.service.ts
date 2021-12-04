import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

  isLogin = false;

  constructor(private router: Router,) { }

  public signOut(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn() {
    const loggedIn = this.getToken();
    // console.log("loggedIn",loggedIn)
    if (loggedIn)
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

}
