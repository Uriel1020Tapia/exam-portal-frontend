import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = ENV.API_URL;

  constructor(private http: HttpClient) { }

  //get current User
  public getCurrentUser(){
    return this.http.get(`${this.apiUrl}/current-user`);
  }
  //generate Toke
  public generateToken(loginRequest:any){
    return this.http.post(`${this.apiUrl}/getToken`,loginRequest)
    .pipe(
      tap(() => {
        console.log("respuesta generateToken")
      }),
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        return throwError(err);    //Rethrow it back to component
      })
    )
  }
}
