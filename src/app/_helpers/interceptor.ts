import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse,
    HttpUserEvent, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { tap } from 'rxjs/operators';
import { AlertService } from '@app/_services';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private token: TokenStorage, private router: Router, private alertService: AlertService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        
        let authReq = req;

        if(this.token.getToken() != null){
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
        }

        return next.handle(authReq).pipe(
            tap(event => {
                if(event instanceof HttpResponse){
                    console.log(`Request for ${req.urlWithParams} took ms.` );
                }
            }, (error :any) =>{
                // if(error instanceof HttpResponse){
                    if(error.status === 401){
                        this.router.navigate(['/login']);
                        this.alertService.error('Invalid Credentials', { keepAfterRouteChange: true });
                    }
                // }
            })
        )
    }

}