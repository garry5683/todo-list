import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(      private http: HttpClient    ) { }

  topicDtls(){
    return this.http.get(`http://localhost:3000/topics`);
  }
}
