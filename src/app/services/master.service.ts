import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserData } from '../shared/user-data';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  // all apis=============//

  loginApi = 'http://18.219.65.148:8080';

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
      'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbnVyYWdwdW5kaXI2MjFAZ21haWwuY29tIiwiZXhwIjoxNjM4MjkzMzIwLCJpYXQiOjE2MzgyNzUzMjB9.Uk3HTMA6zdIbrPbqFYKKtIK1uRQCUO8m-ywBSaZuAAOVGSGYHaU9-LiuB9rfE1xBdaK41Vdz_nauez89Ou91GA'
    
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

  countryGetData(){
    return this.http.get('http://18.219.65.148:8080/AllCountries', this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  countryDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://18.219.65.148:8080/AddCountry', JSON.stringify(data), this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  


}

