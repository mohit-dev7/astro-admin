import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserData } from '../shared/user-data';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userToken=localStorage.getItem('userID');
  // all apis=============//

  apURL = 'http://18.219.65.148:8080';

  constructor(private http: HttpClient) { }



  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  


  authHttp = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+this.userToken
    
    })
  }

    // Error handling 
    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
   }



  // api functions==================//

  getMethod(dataApi){
    return this.http.get(this.apURL+dataApi, this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // kaushal

  methodPost(data, dataApi): Observable<UserData> {
    return this.http.post<UserData>(this.apURL+dataApi, JSON.stringify(data), this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  




  promoDataPost(data): Observable<UserData> {
    console.log(this.authHttp)
    return this.http.post<UserData>(this.apURL+'/addPromo', JSON.stringify(data), this.authHttp)

    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

}
