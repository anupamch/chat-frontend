import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  message:string=""
  messages:string[] = []
  isLoggedin:boolean;
  rurl=""
  constructor(private userservice:UserService,public router:Router) {
    this.isLoggedin=this.userservice.isLoggedin();
       this.userservice.authFlag.subscribe(data=>{
            this.isLoggedin=data
       })



   }




}
