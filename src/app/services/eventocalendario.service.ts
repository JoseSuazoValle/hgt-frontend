
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventocalendario } from '../interfaces/eventocalendario';
import { Observable } from 'rxjs';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class EventocalendarioService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'eventocalendario/'
   }

 // El evento tiene la misma estructura de la notificacion.



 // Crud de eventos

  getEvent(): Observable<Eventocalendario[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Eventocalendario[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})
  }

  
  getEventID(id: number): Observable<Eventocalendario>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Eventocalendario>(`${this.myAppUrl}${this.myApiUrl}evento/${id}`, {headers: headers})
  }

  getEventEmpresa(empresa: string): Observable<Eventocalendario[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Eventocalendario[]>(`${this.myAppUrl}${this.myApiUrl}${empresa}`, {headers: headers})
  }

  postEvent(event: Eventocalendario): Observable<Eventocalendario>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Eventocalendario>(`${this.myAppUrl}${this.myApiUrl}event-add`, event, {headers: headers})
  }

  deleteEvent(id: number): Observable<void>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}event-del/${id}`, {headers: headers})
  }

}

