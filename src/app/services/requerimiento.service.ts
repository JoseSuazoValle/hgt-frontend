import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requerimiento } from '../interfaces/Requerimiento';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'requerimiento/'
   }

  getrequerimientos(): Observable<Requerimiento[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Requerimiento[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})
  }

  getrequerimientosEmpresa(empresa: string): Observable<Requerimiento[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Requerimiento[]>(`${this.myAppUrl}${this.myApiUrl}req-emp/${empresa}`, {headers: headers})
  }

  getrequerimientosAyC(parametros:any): Observable<Requerimiento[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Requerimiento[]>(`${this.myAppUrl}${this.myApiUrl}empresa/ayc`,parametros, {headers: headers})
  }

  getrequerimientosValorMatriz(parametros:any): Observable<Requerimiento[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Requerimiento[]>(`${this.myAppUrl}${this.myApiUrl}empresa/valormatriz`,parametros, {headers: headers})
  }

  getrequerimientosTao(parametros:any): Observable<Requerimiento[]>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Requerimiento[]>(`${this.myAppUrl}${this.myApiUrl}empresa/tao`,parametros, {headers: headers})
  }
   
  saverequerimiento(requerimiento: Requerimiento): Observable<Requerimiento>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<Requerimiento>(`${this.myAppUrl}${this.myApiUrl}req-add`, requerimiento, {headers: headers})
  }

  getRequerimiento(id: number): Observable<Requerimiento> {
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Requerimiento>(`${this.myAppUrl}${this.myApiUrl}${id}`, {headers: headers})
  }

  updateRequerimiento(id: number, requerimiento: Requerimiento): Observable<void> {
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}req-upd/${id}`, requerimiento, {headers: headers});
  }

  deleteRequerimiento(id: number): Observable<void>{
    const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}req-del/${id}`, {headers: headers})
  }

  sendPostImage(body: FormData): Observable<any>
  {
   const token = sessionStorage.getItem('token')
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
   return this.http.post(`${this.myAppUrl}uploadfiles`, body, {headers: headers});
  }

}
