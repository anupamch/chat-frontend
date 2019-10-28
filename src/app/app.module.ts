import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Chatservice} from './service/chat.service'

import { RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from './myComponents/guard/canActivateViaAuthGuard';
import { Interseptor } from './service/interceptor';
import { AuthenicationComponent } from './myComponents/authenication/authenication.component';
import { DashboardComponent } from './myComponents/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenicationComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [Chatservice,
              CanActivateViaAuthGuard,
              {
                provide:HTTP_INTERCEPTORS,
                useClass:Interseptor,
                multi:true
            }],
  bootstrap: [AppComponent]
})
export class AppModule { }
