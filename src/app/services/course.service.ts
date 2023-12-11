import { Injectable } from '@angular/core';

import {RequestBaseService} from "./request-base.service";
import {AuthenticationService} from "./authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:5555/gateway/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends RequestBaseService{
  private baseUrl = 'http://localhost:5555/gateway/course';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  // saveCourse(courseData: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };

  //   return this.http.post(API_URL, courseData, httpOptions);
  // }
  saveCourse(title: string, duree: string, lien: string, price: number, image: File): Observable<Course> {
    const formData: FormData = new FormData();

    formData.append('title', title);
    formData.append('duree', duree);
    formData.append('lien', lien);
    formData.append('price', price.toString());
    formData.append('image', image, image.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<Course>(`${this.baseUrl}`, formData, {
      headers,
    });
  }


  // deleteCourse(course: Course): Observable<any> {
  //   return this.http.delete(API_URL + '/' + course.id, {headers: this.getHeaders});
  // }
  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${courseId}`);
  }

  getAllCourses(): Observable<any> {
    return this.http.get(API_URL);
  }
  updateCourse(courseId: number, title: string, duree: string, lien: string, price: number, image?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('duree', duree);
    formData.append('lien', lien);
    formData.append('price', price.toString());
    if (image) {
      formData.append('image', image, image.name); // Ensure 'image' matches the field name
    }

    const headers = new HttpHeaders()
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, formData, { headers });
  }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${courseId}`);
  }
}
