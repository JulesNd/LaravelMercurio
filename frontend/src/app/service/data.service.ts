import { Injectable } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

getData() {

  return this.http.get('http://127.0.0.1:8000/api/employees');
}

getDataByUser() {

  return this.http.get('http://127.0.0.1:8000/api/useremployees');
}


}
