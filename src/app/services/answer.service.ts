import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  constructor(private http:HttpClient) { }

  submitAnswer(answerData: any): Observable<any> {
    return this.http.post(`${environment.baseurl}/answers/submitAnswer`, answerData);
  }
}
