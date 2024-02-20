import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(      private http: HttpClient    ) { }

  topicDtls(){
    // return this.http.get(`https://garry5683.github.io/angulad-note-db/db.json`);
    return this.http.get(`http://localhost:3000/topics`);
  }
  priceDtls(){
    // return this.http.get(`https://garry5683.github.io/angulad-note-db/db.json`);
    return this.http.get(`http://localhost:3000/prices`);
  }

  topicDtlspost(data:any){
    return this.http.post(`http://localhost:3000/topics`,data);
  }
  PriceDtlspost(data:any){
    return this.http.post(`http://localhost:3000/prices`,data);
  }
}
