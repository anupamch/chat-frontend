import { Component, OnInit } from '@angular/core';
//import { DataService } from 'src/app/myService/data-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chatservice } from 'src/app/service/chat.service';

@Component({
  selector: 'app-authenication',
  templateUrl: './authenication.component.html',
  styleUrls: ['./authenication.component.css'],
  providers:[]
})
export class AuthenicationComponent implements OnInit {
  message=""
  login_frm: FormGroup;
  constructor(private fb:FormBuilder,private uservice:UserService,private router:Router,private aroute:ActivatedRoute,private chatservice:Chatservice) {


   }

  ngOnInit() {

    this.login_frm = this.fb.group({
      'name': ['', Validators.required],
      'password': ['', [Validators.required]],

    });

    this.aroute.params.subscribe(params=>{
             if(params.islogout==1){
                   this.logout()
             }
             else if(this.uservice.isLoggedin()){
                 this.router.navigate(['dashboard']);
             }
       })
  }
  authenticate(login_frm):void{
    this.message="";
     this.uservice.checkAuthenticate(login_frm)
                  .subscribe(data=>{

                        if(data['auth']=='1'){

                          this.router.navigate['/dashboard'];
                          localStorage.setItem('isloggedin','1');
                          localStorage.setItem('user',JSON.stringify(data['user']));
                          localStorage.setItem('authtoken',data['token']);
                          this.uservice.isLoggedin();
                          this.chatservice.joinToChat(data['user'].id);
                          this.router.navigate(['/dashboard']);


                        }
                        else{

                          this.message="Wrong User Name or Password"
                        }
                    });


  }

  logout(){
    localStorage.isloggedin=false;
    this.chatservice.logoutEmit();
    localStorage.user="";
    localStorage.authtoken="";
    this.router.navigate(['login']);


  }

}
