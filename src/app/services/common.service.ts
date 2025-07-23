import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(      private http: HttpClient    ) { }


  topicDtlsnew(string:string){
    return this.http.get(`https://angulad-note-db.onrender.com/${string}`);
    // return this.http.get(`http://localhost:3000/${string}`);
  }



  topicDtlspost(data:any,topic:string){
    // return this.http.post(`https://angulad-note-db.onrender.com/${topic}`,data);
    return this.http.post(`http://localhost:3000/${topic}`,data);
  }

  priceDtls(){
    // return this.http.get(`https://garry5683.github.io/angulad-note-db/db.json`);
    return this.http.get(`http://localhost:3000/prices`);
  }
  PriceDtlspost(data:any){
    return this.http.post(`http://localhost:3000/prices`,data);
  }
}
