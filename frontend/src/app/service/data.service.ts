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
  return this.http.get('//Backbeta.mercurio-app.com/api/rtis');
}

getDataByUser() {

  //return this.http.get('http://127.0.0.1:8000/api/useremployees');
  return this.http.get('//Backbeta.mercurio-app.com/api/userrtis');
}

getUsers() {
  return this.http.get('//Backbeta.mercurio-app.com/api/users');

}


insertData(data)  {

  return this.http.post('//Backbeta.mercurio-app.com/api/addRti', data);

}

updateData(annotation_id,data)  {

  return this.http.put('//Backbeta.mercurio-app.com/api/updateRti/'+annotation_id, data);

}

getRtiById(annotation_id) {
  return this.http.get('//Backbeta.mercurio-app.com/api/rti/'+ annotation_id);

}

getForUpdate(annotation_id) {
  return this.http.get('//Backbeta.mercurio-app.com/api/Forupdate/'+ annotation_id);

}

getPseudo() {
  return this.http.get('//Backbeta.mercurio-app.com/api/pseudo');


}



}
