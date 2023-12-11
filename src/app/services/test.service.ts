import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test, TestForm } from '../models/test.model';
import { TestWithCourseDTO } from '../models/TestWithCourseDTO.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:5555/gateway/test';

  constructor(private http: HttpClient) {}
  addTestWithQuestionsAndAnswers(testRequest: any): Observable<any> {
    console.log(testRequest);
    return this.http.post(`${this.apiUrl}/addTest`, testRequest).pipe(

      catchError((error) => {
        console.error('Erreur côté serveur :', error);
        throw error;
      })

    );
  }
  //   getAllTestsWithDetails(): Observable<Test[]> {

  //   return this.http.get<Test[]>(`${this.apiUrl}`);

  // }

  getAllTestsWithDetails(): Observable<TestWithCourseDTO[]> {
    return this.http.get<TestWithCourseDTO[]>(`${this.apiUrl}`);
  }
  getTestDetails(testId: string): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/details/${testId}`);
  }


  deleteTest(testId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${testId}`);
  }
  getTestsByCourseId(courseId: number): Observable<Test[]> {
    const url = `${this.apiUrl}/rep/byCourse/${courseId}`;
    return this.http.get<Test[]>(url);
  }

}
