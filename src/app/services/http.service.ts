import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  timeout = 5000;

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getHeaders(authorization) {
    return {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': 'Basic ' + authorization
    }
  }

  post(url: string, body: any, options?: RequestOptionsArgs) {

    return this.http.post(url, body)
      .map(result => result.json());
  }

  put(url: string, body: any, options?: RequestOptionsArgs) {

    return this.http.put(url, body)
      .map(result => result.json());
  }

  get(url: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url)
      .map(result => result.json());
  }

}
