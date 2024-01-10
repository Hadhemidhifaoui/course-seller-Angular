import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseurl ='http://localhost:3333';
const secondbaseurl="http://localhost:5555";
const thirdbaseurl="http://localhost:4444";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http:HttpClient) { }
  submitAnswer(answerDTO: any) {
    return this.http.post(`${baseurl}/answers/submitAnswer`, answerDTO);
  }
}
