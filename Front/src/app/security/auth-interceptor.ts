import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token"); // Substitua pelo seu token
        console.log(request);
        // request.params.append('Authorization', `Bearer ${token}`
        // );
        // Clona a requisição e adiciona o token ao header
        // const authRequest =
         request =request.clone({
          setParams: {
            Authorization: `Bearer ${token}`
          }
        });

        // Envia a requisição clonada com o token adicionado
        return next.handle(request);
    }
}
