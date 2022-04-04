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
  return this.http.get('//Backdev.mercurio-app.com/api/rtis');
}

getDataByUser() {

  //return this.http.get('http://127.0.0.1:8000/api/useremployees');
  return this.http.get('//Backdev.mercurio-app.com/api/userrtis');
}

getUsers() {
  return this.http.get('//Backdev.mercurio-app.com/api/users');

}


insertData(data)  {

  return this.http.post('//Backdev.mercurio-app.com/api/addRti', data);

}

updateData(rti_id,data)  {

  return this.http.put('//Backdev.mercurio-app.com/api/updateRti/'+rti_id, data);

}

getRtiById(rti_id) {
  return this.http.get('//Backdev.mercurio-app.com/api/rti/'+ rti_id);

}

getForUpdate(rti_id) {
  return this.http.get('//Backdev.mercurio-app.com/api/Forupdate/'+ rti_id);

}

getPseudo() {
  return this.http.get('//Backdev.mercurio-app.com/api/pseudo');


}



}
