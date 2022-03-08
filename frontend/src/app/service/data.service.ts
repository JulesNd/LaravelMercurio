import { Injectable } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

getData() {

  //return this.http.get('http://127.0.0.1:8000/api/employees');
  return this.http.get('http://mercurio-app.com/api/rtis');
}

getDataByUser() {

  //return this.http.get('http://127.0.0.1:8000/api/useremployees');
  return this.http.get('http://mercurio-app.com/api/userrtis');
}


insertData(data)  {

  return this.http.post('http://mercurio-app.com/api/addRti', data);

}

updateData(rti_id,data)  {

  return this.http.put('http://mercurio-app.com/api/updateRti/'+rti_id, data);

}

getRtiById(rti_id) {
  return this.http.get('http://mercurio-app.com/api/rti/'+ rti_id);

}



}
