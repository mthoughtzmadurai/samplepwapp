import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) {}

  remove(url: string, options?): Observable<any> {
    return this.http.delete(url)
      .map(res => {
        return res;
      });
  }

  put(url: string, body: string, options?): Observable<any> {
    return this.http.put(url, body)
      .map(res => {
        return res;
      });
  }

  post(url: string, body: any, options?): Observable<any> {
    return this.http.post(url, body)
      .map(res => {
        return res;
      });
  }

  get(url: string): Observable<any> {
    return this.http.get(url)
      .map( res => {
        return res;
      });
  }
}
