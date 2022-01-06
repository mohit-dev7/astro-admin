import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserData } from '../shared/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // all apis=============//

  loginApi = 'http://localhost:8080';

  constructor(private http: HttpClient,private router: Router) { }

  uploadImageHeader:any = {
    headers: new HttpHeaders({
      'authorization': `Bearer ${localStorage.getItem("userID")}`
    })
  }

  // Http Options
  getHeader(){
    if(!localStorage.getItem("userID")){
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }  
      return httpOptions;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("userID")}`
      })
    }  
    return httpOptions;
  }
   
    handleError(error) {
      let errorMessage = '';
      console.log(error.status);
      if(error.status == 401){
        localStorage.removeItem("userID");
        // this.router.navigate(['/auth/signin']);
        errorMessage = "401";
      }
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
   }

  postRequest(url:String,data):Observable<any>{
    if(url.split("/")[2] == "uploadimage"){
      return this.http.post<any>(this.loginApi + url, data, this.uploadImageHeader)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    return this.http.post<any>(this.loginApi + url, data, this.getHeader())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  pageAble(pageNo,sortBy){
    return `?pageNo=${pageNo}&sortBy=${sortBy}`
  }

  getRequest(url:String,page={"pageAble":false,"pageNo":1,"sortBy":"name"}):Observable<any>{
    console.log(this.getHeader())
    let endPoint =  this.loginApi + url
    if(page.pageAble){
      endPoint = endPoint + this.pageAble(page.pageNo-1,page.sortBy)
    }
    return this.http.get<any>(endPoint, this.getHeader())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteRequest(url:String):Observable<any>{
    return this.http.delete<any>(this.loginApi + url, this.getHeader())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  putRequest(url:String,data:any):Observable<any>{
    return this.http.put<any>(this.loginApi + url,data,this.getHeader())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  getUserDetails(id){
    return this.http.get(this.loginApi+'/getUserData/'+id, this.getHeader())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
