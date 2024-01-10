import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseurl ='http://localhost:3333';
const secondbaseurl="http://localhost:5555";
const thirdbaseurl="http://localhost:4444";
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private registerUrl = 'http://localhost:5555/api/v1/auth/register';
  private loginUrl = 'http://localhost:5555/api/v1/auth/authenticate';


  constructor(private http: HttpClient) {}

  signup(signuprequest:any){
    return this.http.post(`${secondbaseurl}/api/v1/auth/register`,signuprequest)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}
