import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import {environment} from "src/environments/environment";
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

  }

  public authFlag=new BehaviorSubject<boolean>(false);
  checkAuthenticate(param):any{
     //console.log(param)
     return this.http.post(environment.apiUrl.toLocaleLowerCase()+"/authenticate",param)

  }

  isLoggedin(){

    let isLoggedin=localStorage.getItem('isloggedin')=='1'?true:false;
    this.authFlag.next(isLoggedin);
    return isLoggedin;
  }

  getAllUser(){
     let user = JSON.parse(localStorage.getItem('user'))
     return this.http.get<any>(environment.apiUrl.toLocaleLowerCase()+"/users/"+user.id)
  }
}
