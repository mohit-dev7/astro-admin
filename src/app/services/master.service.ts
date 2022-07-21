import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserData } from '../shared/user-data';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  push(value: any) {
    throw new Error('Method not implemented.');
  }
  userToken=localStorage.getItem('userID');
 
  //  userToken="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbnVyYWdwdW5kaXI2MjFAZ21haWwuY29tIiwiZXhwIjoxNjM4NDQ1MTAzLCJpYXQiOjE2Mzg0MjcxMDN9.1La4ssoQtwGZ7ksz3H9ORrn0j47aOYkYti1Zbb6jx3eWJCAW_Jv0nPDqG-SYAcz2qLYyQhN0xqV7dw-hQC2ZVQ";
  // all apis=============//


  apURL = 'http://54.213.248.244:8080';

  constructor(private http: HttpClient) { 
    console.log("usertoken",this.userToken)
  }



  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  


  httpOption3 = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }  

  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    })
  }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization':'Bearer '+this.userToken

    
  //   })
  // }

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
    return this.http.get(this.apURL+dataApi, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getMethodEmailVerification(dataApi){
    return this.http.get(this.apURL+dataApi, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }



  deleteMethod(dataApi){
    return this.http.delete(this.apURL+dataApi);
  
  }

  // kaushal

  methodPost(data, dataApi): Observable<UserData> {
    return this.http.post<UserData>(this.apURL+dataApi, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  
  methodPostMulti(data, dataApi): Observable<any> {
    return this.http.post(this.apURL+dataApi, data)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  methodPost1( dataApi): Observable<UserData> {
    return this.http.post<UserData>(this.apURL+dataApi, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  timeslotDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://54.213.248.244:8080/saveTimeSlot', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

 

  timeslotGetData(){
    return this.http.get('http://54.213.248.244:8080/showSlots', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  daysData(){
    return this.http.get('http://54.213.248.244:8080/ s', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  holidayDataPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://54.213.248.244:8080/saveHoliday', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  
  
  holidayDataEdit(data): Observable<UserData> {
    return this.http.post<UserData>('http://54.213.248.244:8080/editHoliday', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  getAppointmentsByCriteria(data): Observable<any> {  
    return this.http.post('http://54.213.248.244:8080/getAppointmentsByCriteria', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  holidayGetData(){
    return this.http.get('http://54.213.248.244:8080/getHolidays', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  holidayGetDetailData(id:any){
    return this.http.get('http://54.213.248.244:8080/getHolidayDetail?id='+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  timeSlotGetDetailData(id:any){
    return this.http.get('http://54.213.248.244:8080/getTimeSlotDetail?id='+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  






  promoDataPost(data): Observable<UserData> {
  
    return this.http.post<UserData>(this.apURL+'/addPromo', JSON.stringify(data), this.httpOptions)

    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  
  contactPost(data): Observable<UserData> {
    return this.http.post<UserData>('http://54.213.248.244:8080/addContact', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  contactGet(): Observable<UserData> {
    return this.http.post<any>('http://54.213.248.244:8080/getContact', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  deleteAllEnquiries(){
    return this.http.delete('http://54.213.248.244:8080/deleteAllEnquiries', this.httpOptions1)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  saveEmailPassword(data, dataApi): Observable<UserData> {
    return this.http.put<UserData>(this.apURL+dataApi, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}


