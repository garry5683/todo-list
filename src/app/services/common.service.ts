import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(      private http: HttpClient    ) { }


  topicDtlsnew(string:string){
    // return this.http.get(`https://angulad-note-db.onrender.com/${string}`);
    return this.http.get(`http://localhost:3000/${string}`);
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

  voterSearch (query: string): Observable<any> {
    const body = `form[query]=${encodeURIComponent(query)}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://www.sec.kerala.gov.in/rfs/search/index'
    });

    return this.http.post(this.apiUrl, body, { headers });
  }

  apiUrl=`/rfs/search/index`
}
