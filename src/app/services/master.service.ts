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
  //  userToken="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbnVyYWdwdW5kaXI2MjFAZ21haWwuY29tIiwiZXhwIjoxNjM4NDQ1MTAzLCJpYXQiOjE2Mzg0MjcxMDN9.1La4ssoQtwGZ7ksz3H9ORrn0j47aOYkYti1Zbb6jx3eWJCAW_Jv0nPDqG-SYAcz2qLYyQhN0xqV7dw-hQC2ZVQ";
  // all apis=============//

  apURL = 'http://18.219.65.148:8080/';

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



  countryDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://18.219.65.148:8080/AddCountry', JSON.stringify(data), this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  timeslotDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://18.219.65.148:8080/saveTimeSlot', JSON.stringify(data), this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

 

  timeslotGetData(){
    return this.http.get('http://18.219.65.148:8080/showSlots', this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  daysData(){
    return this.http.get('http://18.219.65.148:8080/getDays', this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  holidayDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://18.219.65.148:8080/saveHoliday', JSON.stringify(data), this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  holidayGetData(){
    return this.http.get('http://18.219.65.148:8080/getHolidays', this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  holidayGetDetailData(id:any){
    return this.http.get('http://18.219.65.148:8080/getHolidayDetail?id='+id, this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  timeSlotGetDetailData(id:any){
    return this.http.get('http://18.219.65.148:8080/getTimeSlotDetail?id='+id, this.authHttp)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }




}

