import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permiso } from '../interfaces/permiso';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class PermisosServices {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {

    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'permiso/'
   }

   addPermisos( permisos: Permiso): Observable<any>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Permiso>(`${this.myAppUrl}${this.myApiUrl}add-perm`, permisos, {headers: headers});
   }

   updPermisos(user: string, permisos: Permiso): Observable<Permiso>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put<Permiso>(`${this.myAppUrl}${this.myApiUrl}upd-perm/${user}`,permisos, {headers: headers});
   }

   getPermisos(user: string): Observable<Permiso>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Permiso>(`${this.myAppUrl}${this.myApiUrl}${user}`, {headers: headers})
  }

}