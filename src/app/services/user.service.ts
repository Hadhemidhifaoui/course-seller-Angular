import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../models/user.models';
import { Statut } from '../models/statut.enum';

const API_URL = 'http://localhost:5555/api/user';


@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{
  private baseUrl = 'http://localhost:5555/api/user';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }


  getUser(userId: string): Observable<any> {
    const url = `http://localhost:5555/api/user/${userId}`;
    return this.http.get(url);
  }


  updateUser(
    userId: string,
    name: string,
    username: string,
    phone: string,
    adresse: string,
    status: Statut,
    image: File | undefined
  ): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    const formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('adresse', adresse);
    formData.append('status', status)

    // Ajoutez d'autres propriétés d'utilisateur selon vos besoins

    if (image) {
      formData.append('file', image, image.name);

    }

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.put<any>(url, formData, { headers });
  }



  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/byRole/${role}`);
  }

  changeRole(newRole: string): Observable<any> {
    return this.http.put(API_URL + '/change/' + newRole, {}, {headers: this.getHeaders});
  }
  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;

    return this.http.delete(url, { responseType: 'text' });
  }

}
