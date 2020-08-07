import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ToastrHttpInterceptor implements HttpInterceptor {
    constructor(public toasterService: ToastrService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && evt.body.address) {
                        this.toasterService.success('Haus erstellt');
                    }
                    if(evt.body && evt.body.floorName) {
                        this.toasterService.success('Etage erstellt');
                    }
                    if(evt.body && evt.body.flatName) {
                        this.toasterService.success('Wohnung erstellt');
                    }
                    if(evt.body && evt.body.roomName) {
                        this.toasterService.success('Raum erstellt');
                    }
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                        this.toasterService.error(err.error.message, err.error.title);
                    } catch(e) {
                        this.toasterService.error('An error occurred', '');
                    }
                }
                throw(err);
            }));
    
      }
      
}