import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../models/purchase.model";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:5555/gateway/purchase';
const baseurl ='http://localhost:3333';
const secondbaseurl="http://localhost:5555";
const thirdbaseurl="http://localhost:4444";
@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {
  private currentCourseId: string | null = null;
    private currentTotal: number | null = null;
  private baseUrl = 'http://localhost:5555/gateway/purchase';
  private urluser = `http://localhost:5555/api/user`;
  private urlcourse = 'http://localhost:5555/gateway/course';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  savePurchase(purchase: Purchase): Observable<any> {
    return this.http.post(API_URL, purchase, {headers: this.getHeaders});
  }

  getAllPurchaseItems(): Observable<any> {
    return this.http.get(API_URL, {headers: this.getHeaders});
  }
  getAllPurchases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.urluser}/${userId}`);
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.urlcourse}/${courseId}`);
  }

  addpurchase(purchase:any){
    return this.http.post(`${thirdbaseurl}/api/purchase`,purchase);
  }

  setCourseDetails(courseId: string, total: number) {
    this.currentCourseId = courseId;
    this.currentTotal = total;
}
}
