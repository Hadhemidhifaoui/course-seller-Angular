import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
const API_URL = 'http://localhost:5555/gateway/purchase';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }
  getallTestsByCourseId(courseId:any){
    return this.http.get(`${environment.baseurl}/tests/byCourse/${courseId}`)
  }
}
