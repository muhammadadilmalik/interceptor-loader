import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http'
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { loaderService } from './loaderService';

@Injectable()
export class myInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[]=[];

    constructor(private loaderService: loaderService) {
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    addRequest(req: HttpRequest<any>) {
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.addRequest(req);
        return next.handle(req)
            .pipe(
                tap(ev => {
                        if(ev instanceof HttpResponse) {
                            this.removeRequest(req);
                        }
                    }
                ),
                catchError((err, temp) => {
                    console.log(err);
                    this.removeRequest(req);
                })
            )
    }
}