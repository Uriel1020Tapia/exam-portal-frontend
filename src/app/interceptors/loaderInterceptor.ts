import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { SpinnerOverlayService } from "../services/spinner-overlay.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    private countRequest = 0;
    private requests: HttpRequest<any>[] = [];

    constructor(public loaderService: SpinnerOverlayService) { }
    
    removeRequest(req: HttpRequest<any>) {
      const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
      this.loaderService.hide();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("LoaderInterceptor")

        this.loaderService.show();

       return new Observable(observer => {

          const subscription =  next.handle(req)
          .pipe(
            delay(9000)
          )
               .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.removeRequest(req);
                observer.next(event);
              }
            },
            err => {
              console.log('error' + err);
              this.removeRequest(req);
              observer.error(err);
            },
            () => {
              this.removeRequest(req);
              observer.complete();
            });
            return () => {
              this.removeRequest(req);
              subscription.unsubscribe();
            };
        });
    }
}

export const LoaderInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ];

