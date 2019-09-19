import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable, of, timer } from "rxjs";
import { tap, catchError, delay } from "rxjs/operators";
import { loaderService } from './loaderService';
import { MatSnackBar } from '@angular/material';

declare var $: any;

@Injectable()
export class interceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[]=[];

    constructor(private loaderService: loaderService,
        private snakBar: MatSnackBar) {
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }

        if(this.requests.length <= 0)
        $('.ajaxDisabled').attr('disabled', false);

        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    addRequest(req: HttpRequest<any>) {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);

        $('.ajaxDisabled').attr('disabled', true);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.addRequest(req);
        
        return next.handle(req)
            .pipe(
                tap(ev => {
                        if(ev instanceof HttpResponse) {
                            console.log(ev);
                            this.removeRequest(req);
                            this.snakBar.open( JSON.stringify(ev), '', {duration: 2000});
                        }
                    }
                ),
                catchError( (error) => {
                    if(error instanceof HttpErrorResponse){
                        try {
                            this.snakBar.open(error.message, '', {duration: 2000});
                        }
                        catch(err){
                            this.snakBar.open("An error occured",'', {duration: 2000});
                        }
                    }
                    this.removeRequest(req);
                    return of(error);
                })
            )
    }
}