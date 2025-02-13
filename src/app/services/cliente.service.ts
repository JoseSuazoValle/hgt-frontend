import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';

import {env} from '../../environment/env'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {

  this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'cliente/'
   }

   register( cliente: Cliente): Observable<any>{
    
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}create`, cliente);
   }

   getCliente(): Observable<Cliente[]>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers});
   }

   deleteCliente(id: number): Observable<void>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}delete/${id}`, {headers: headers})
  }

}
