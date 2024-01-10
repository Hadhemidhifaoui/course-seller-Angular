import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Test, TestForm } from '../models/test.model';
import { TestWithCourseDTO } from '../models/TestWithCourseDTO.model';

const baseurl ='http://localhost:3333';
const secondbaseurl="http://localhost:5555";
const thirdbaseurl="http://localhost:4444";

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:5555/gateway/test';

  constructor(private http: HttpClient) {}
  addTestWithQuestionsAndAnswers(testRequest: TestForm): Observable<any> {
    const jsonRequest = JSON.stringify(testRequest);

    console.log(jsonRequest);

    return this.http.post<any>(`${this.apiUrl}/addTest`, jsonRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      catchError((error) => {
        console.error('Erreur côté serveur :', error);
        throw error;
      })
    );
  }




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

  getallTestsByCourseId(courseId:any){
    return this.http.get(`${baseurl}/tests/byCourse/${courseId}`)
  }
  submitAnswer(answerDTO: any) {
    return this.http.post(`${baseurl}/submitAnswer`, answerDTO);
  }
  UserScore(userId:any,testId:any){
    return this.http.get(`${baseurl}/tests/user-score/${userId}/${testId}`)
  }

}
