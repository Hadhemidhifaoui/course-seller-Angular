import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.models";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

const API_URL = 'http://localhost:5555/api/v1/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currenUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currenUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currenUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currenUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL + '/authenticate', user).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currenUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + '/register', user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currenUserSubject.next(new User);
  }
}