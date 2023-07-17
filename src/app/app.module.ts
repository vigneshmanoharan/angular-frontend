import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { Interceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { LoginComponent } from './login/login.component'
import { TokenStorage } from './_helpers/token.storage';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent
,
        LoginComponent    ],
    providers: [TokenStorage,
            {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true}],
    bootstrap: [AppComponent]
})
export class AppModule { };