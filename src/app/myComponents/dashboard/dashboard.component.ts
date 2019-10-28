import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Chatservice } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('userlist') userlist: ElementRef;
  @ViewChild('message_box') message_box: ElementRef;
  message:string=""
  messages:string[] = []
  users:any=""
  users_msg_count:any=""
  onlineusers:any=""
  chatUser:string=""
  my_id = "";
  constructor(private chatService: Chatservice,private userservice:UserService,private renderer: Renderer2) {

   }


  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.my_id = user.id
    this.chatService.joinToChat(this.my_id)

    this.userservice.getAllUser().subscribe((data)=>{
     // console.log(data)

         this.users =data.users
        this.chatService.getMessageCount(this.my_id).subscribe((data:any)=>{
            for(let row of data){

              let el_user_msg_count = document.querySelector('.count_msg_'+row.from)
              let prev_count:any=el_user_msg_count.innerHTML
              if(prev_count=="")
                  prev_count = 1
              else
              prev_count = parseInt(prev_count)+1
              el_user_msg_count.innerHTML = prev_count
            }
            this.chatService.emitOnlineUser()
            this.chatService.getOnlineUser().subscribe((users)=>{

              let onlineusers=users.users
              //console.log(data)
              for(let usr of this.users){
                for(let row of Object.keys(onlineusers)){
                  let el_user_on = document.querySelector('.on_user_'+usr.id)
                  ////console.log(usr.id)
                       if(parseInt(usr.id)==parseInt(row)){

                        if(el_user_on)
                          el_user_on.innerHTML ="ON"
                       }
                       else{
                        if(el_user_on)
                        el_user_on.innerHTML ="OFF"
                       }
                }
              }
              for(let row of Object.keys(onlineusers)){
                 //console.log(row)
                 let el_user_on = document.querySelector('.on_user_'+row)
                 if(el_user_on)
                   el_user_on.innerHTML ="ON"
               }
            })
         })
         let self =  this;
         //setInterval(function(){self.chatService.emitOnlineUser()},10000)
    })




  }
  ngAfterViewInit(){
    this.chatService.reciveMessage().subscribe(data=>{
      if(data.from!=this.chatUser){

           let el_user = this.userlist.nativeElement.querySelector('.user_'+data.from)
           let el_user_msg_count = el_user.querySelector('.count_msg_'+data.from)
           let prev_count=el_user_msg_count.innerHTML
           if(prev_count=="")
               prev_count = 1
           else
           prev_count = parseInt(prev_count)+1
           el_user_msg_count.innerHTML = prev_count
      }
      else{
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'recived-class');
        const text = this.renderer.createText(data.msg);
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.message_box.nativeElement, span);
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'col-md-12');
        this.renderer.appendChild(this.message_box.nativeElement, div);
        this.chatService.changeReadStatus(this.chatUser,this.my_id).subscribe(data=>{});

      }

   })



  }
  setUserToChat(id,event){
     this.chatUser = id
     let myNodeList = document.querySelectorAll('.block-user')
     for (var i = 0; i < myNodeList.length; i++) {
      var item = myNodeList[i];
      this.renderer.removeClass(item, 'selected');
    }

      let el = document.querySelector('.user_'+this.chatUser)
     this.renderer.addClass(el,'selected');
     this.message_box.nativeElement.innerHTML=""
     this.chatService.getLastMessage(this.my_id,this.chatUser).subscribe((data:any)=>{
          for(let row of data){
            let mgclass="send-class"
            //console.log(row.from+" "+this.chatUser)
            if(row.from == this.chatUser){
                mgclass = "recived-class"


            }
            const span = this.renderer.createElement('span');
            this.renderer.addClass(span, mgclass);
            const text = this.renderer.createText(row.message);
            this.renderer.appendChild(span, text);
            this.renderer.appendChild(this.message_box.nativeElement, span);
            const div = this.renderer.createElement('div');
             this.renderer.addClass(div, 'col-md-12');
             this.renderer.appendChild(this.message_box.nativeElement, div);

          }

          this.chatService.changeReadStatus(this.chatUser,this.my_id).subscribe(data=>{
            document.querySelector('.count_msg_'+this.chatUser).innerHTML=""
          })
     })

  }
  sendMessage(){
    if(this.chatUser=="")
    {
      alert('Please select friend to chat.')
      return;
    }
    if(this.message=="")
      return
    const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'send-class');
        const text = this.renderer.createText(this.message);
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.message_box.nativeElement, span);
        const div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'col-md-12');
        this.renderer.appendChild(this.message_box.nativeElement, div);
    this.chatService.sendMessage(this.message,this.chatUser,this.my_id)
    this.message = ""
  }

}
