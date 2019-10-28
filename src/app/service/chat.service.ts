import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';
import {environment} from "src/environments/environment";
import { HttpClient } from  "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export  class Chatservice {

  private socket = null
  constructor(private http:HttpClient) {
      this.socket = io(environment.serverUrl.toLocaleLowerCase())
  }

  public sendMessage(message,to,from){
        this.socket.emit('newMessage',{msg:message,from:from,to:to})
        let param={msg:message,from:from,to:to}
        this.http.post(environment.apiUrl.toLocaleLowerCase()+"/saveMessage",param).subscribe(data=>{})
  }

  public joinToChat(user_id){

    this.socket.emit("join",{socket_user_id:user_id})
  }
  public emitOnlineUser(){

    this.socket.emit('getOnlineUsers')
  }

  public logoutEmit(){

    this.socket.emit("disconnect_logout")
  }


  public getOnlineUser(){


    return Observable.create((observer)=>{
      this.socket.on('onlineusers',(users)=>{

         observer.next(users)
      })

    })
  }

 getLastMessage(from,to){
    return this.http.get<any>(environment.apiUrl.toLocaleLowerCase()+"/getMessage/"+from+"/"+to)
  }
  changeReadStatus(from,to){
    return this.http.get<any>(environment.apiUrl.toLocaleLowerCase()+"/changeReadStatus/"+from+"/"+to)
  }

  getMessageCount(to){
    return this.http.get<any>(environment.apiUrl.toLocaleLowerCase()+"/getMessageCount/"+to)
  }
  changeToStatusReadSingleComment(id){
    return this.http.get<any>(environment.apiUrl.toLocaleLowerCase()+"/changeToStatusReadSingleComment/"+id)
  }
  public reciveMessage(){

    return Observable.create((observer)=>{
      this.socket.on('newMessage',(message)=>{

         observer.next(message)
      })

    })
  }


}
