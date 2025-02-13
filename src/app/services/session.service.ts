import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  userSubject = new Subject<boolean>();
    user$ = this.userSubject.asObservable();
  constructor() {
   }

   islogin(): boolean{
    if(sessionStorage.getItem('token') || localStorage.getItem('rememberMe')) // Tngo que validar si puedo usar como parametro if directamente o tngo q compararlo con el arreglo
      return true;
    return false;
   }
}
