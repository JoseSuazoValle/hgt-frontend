import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../interfaces/comentario';
import { Observable } from 'rxjs';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'comentario/'
   }

 // El comentario tiene la misma estructura de la notificacion.

// Crud de notificacion

getNotification(usuario: string): Observable<Comentario[]>{
  const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  return this.http.get<Comentario[]>(`${this.myAppUrl}${this.myApiUrl}notificacion/${usuario}`, {headers: headers})
}


 // Crud de comentario

  getComentarios(id: number): Observable<Comentario[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Comentario[]>(`${this.myAppUrl}${this.myApiUrl}${id}`, {headers: headers})
  }

  postComentario(comentario: Comentario): Observable<void>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}com-add`, comentario, {headers: headers})
  }

  deleteComentario(id: number): Observable<void>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}com-del/${id}`, {headers: headers})
  }

}
