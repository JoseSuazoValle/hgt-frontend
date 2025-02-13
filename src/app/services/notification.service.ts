import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../interfaces/notificacion';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
/*     this.myAppUrl = "http://administraciontao.cl/api/" */
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'notificacion/'
   }

// Crud de notificacion

// Obtener notificaciones

getNotification(usuario: string): Observable<Notificacion[]>
{
  const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  return this.http.get<Notificacion[]>(`${this.myAppUrl}${this.myApiUrl}${usuario}`, {headers: headers})
}

// Crear notificaciones

postNotificacion(notificacion: Notificacion): Observable<void>
{
  const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}not-add`, notificacion, {headers: headers})
}

// Eliminar notificaciones

deleteNotificacion(id: number): Observable<void>
{
  const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}not-del/${id}`, {headers: headers})
}

// Update notificaciones

updNotification(id: number, notificacion: Notificacion): Observable<void> 
{
  const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}not-upd/${id}`, notificacion, {headers: headers});

}

}
