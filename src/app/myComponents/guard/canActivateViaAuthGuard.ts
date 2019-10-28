import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Router } from "@angular/router"
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate{

    constructor(private userService:UserService,private router:Router,private location: Location){

    }

    canActivate(){

        return this.userService.isLoggedin();
    }

}
