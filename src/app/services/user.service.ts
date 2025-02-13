import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import {LoginUser} from '../interfaces/login-user'
import { Observable, Subject } from 'rxjs';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myApiUrl: string;
  


  constructor( private http: HttpClient) {
    
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'usuario/'
   }

   register( user: User): Observable<any>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user, {headers: headers});
   }

   login(user: LoginUser): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}login`, user);
   }

   perfil(usuario: string, user: User): Observable<void>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}perfil/${usuario}`, user, {headers: headers});
   }

   getUsuario (usuario: string): Observable<User>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${usuario}`, {headers: headers});
   }

   getUsuarios (): Observable<User[]>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}usuarios`, {headers: headers});
   }

   getUsuariosAyC (): Observable<User[]>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}empresa/ayc`, {headers: headers});
   }

   getUsuariosValorMatriz (): Observable<User[]>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}empresa/valormatriz`, {headers: headers});
   }

   getUsuariosTao (): Observable<User[]>{
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}empresa/tao`, {headers: headers});
   }

   deleteUsuario(user: string): Observable<void>
   {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}delete/${user}`, {headers: headers})
   }


   sendPostImage(body: FormData): Observable<any>
   {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.myAppUrl}uploadfiles`, body, {headers: headers});
   }
}
