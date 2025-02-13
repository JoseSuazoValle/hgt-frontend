import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequerimientosFiles } from '../interfaces/requerimientos-files';
import { env } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoFilesService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    
    this.myAppUrl = env.myAppUrl
    this.myApiUrl = 'uploadfiles'
   }


  

    sendPostImage(body: FormData): Observable<any>
    {
     const token = sessionStorage.getItem('token')
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
     return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body, {headers: headers});
    }

    saverequerimientoFiles(requerimientoFile: RequerimientosFiles): Observable<RequerimientosFiles>{
        const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.post<RequerimientosFiles>(`${this.myAppUrl}${this.myApiUrl}/req-file-add`, requerimientoFile, {headers: headers})
      }
    getrequerimientoFiles(idRequerimiento: number): Observable<RequerimientosFiles[]>{
      const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<RequerimientosFiles[]>(`${this.myAppUrl}${this.myApiUrl}/req-file-get/${idRequerimiento}`, {headers: headers})
    }

    deleterequerimientoFiles(idRequerimientoFile: number): Observable<void>{
      const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/req-file-del/${idRequerimientoFile}`, {headers: headers})
    }

    deleteFile(path: string): Observable<void>{
      const token = sessionStorage.getItem('token') //'Token' es porque es la key con la que almacenamos
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/req-file-filedel/${path}`, {headers: headers})
    }

}
