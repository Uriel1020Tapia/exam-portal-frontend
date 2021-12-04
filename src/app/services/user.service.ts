import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomResponse } from '../interface/CustomResponse';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../interface/User';
import {environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = ENV.API_URL;

  constructor(private http: HttpClient) {}

  users$ = this.http
  .get<CustomResponse>(`${this.apiUrl}/user/`)
  .pipe(tap(console.log), catchError(this.handleError));

  save$ = (user: User) =>
  <Observable<CustomResponse>>(
    this.http
      .post<CustomResponse>(`${this.apiUrl}/user/create`, user)
      .pipe(
        tap(console.log),
        catchError(this.handleError))
  );


  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(`An error occurred - Error code: ${error.status} - Error message: ${error.error.message}`);
  }
}
