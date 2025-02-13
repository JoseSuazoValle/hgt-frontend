import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  idUsuario: number = 0;
  usuario: string | null = '';
  email: string = "";
  nombre: string = "";
  empresa: string = "";
  contrasena: string = "";
  re_contrasena: string = "";
  foto: string = "string";

  archivoCargado: string = "Seleccionar un archivo...";

  fileTmp: any;

  constructor(private router: Router, private _userService: UserService, private toastr: ToastrService) {
    
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');
    
    this.usuario  = sessionStorage.getItem('username')!;
    this.getUsuario(this.usuario);
  } // , private toastr: ToastrService cuando inicializo eso me aparece el error de toastr


  getFile($event: any): void
  {
    const [ file ] = $event.target.files;
    this.archivoCargado = file.name
    this.fileTmp = 
    {
      fileRaw: file,
      fileName: file.name
    }
  }

  sendFile(): void
  {
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName)
    /* body.append('email', 'test@test.cl') */ // asi añado mas cosas al formData, quizas para despues pasar todos los archivos al crear el requerimiento.
    this._userService.sendPostImage(body).subscribe(data => {
      this.foto = data.url
      
    })
  }

  getUsuario(usuario: string) 
  {
    this._userService.getUsuario(usuario).subscribe((data: User) => {
      this.idUsuario = data.id;
      this.email = data.email;
      this.nombre = data.nombre;
      this.empresa = data.empresa;
      if(this.empresa == 'ayc')
        this.empresa = 'A&C'
      this.contrasena = data.contrasena;
      this.re_contrasena = data.re_contrasena;
      this.foto = data.foto;
    })
  }

actualizarUsuario(){

  if(this.usuario == "" || this.email == "" || this.nombre == "" || this.empresa == "" || this.contrasena == "" || this.re_contrasena == ""){ // Si tengo error aca quizas es porque el usuario no se ingresa
    this.toastr.error("Todos los campos son obligatorios.", "Error");
    return;
  }


  if(this.contrasena != this.re_contrasena) {
    //this.toastr.error("Error", "Las contraseñas ingresadas no coinciden");
    this.toastr.error("Las contraseñas deben ser iguales.", "Error");
    return;
  }

  if(this.archivoCargado == "Seleccionar un archivo...")
  {
    this.foto = sessionStorage.getItem('foto')!;
    this.usuario  = sessionStorage.getItem('username')!;

    if(this.empresa == 'A&C')
      this.empresa = 'ayc'
    const user: User = {
      id: this.idUsuario,
      usuario: this.usuario,
      email: this.email,
      nombre: this.nombre,
      empresa: this.empresa,
      contrasena: this.contrasena,
      re_contrasena: this.re_contrasena,
      foto: this.foto
    }
  
    this._userService.perfil( this.usuario ,user).subscribe(() => {
      this.toastr.success("El usuario fue modificado.", "Exito");
      this.router.navigateByUrl('/home');
      })
  }
  else
  {
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName)
    this._userService.sendPostImage(body).subscribe(data => {
      this.foto = data.url
      sessionStorage.removeItem('foto')
      sessionStorage.setItem('foto', this.foto)
      this.usuario  = sessionStorage.getItem('username')!;
      if(this.empresa == 'A&C')
        this.empresa = 'ayc'
      const user: User = {
        id: this.idUsuario,
        usuario: this.usuario,
        email: this.email,
        nombre: this.nombre,
        empresa: this.empresa,
        contrasena: this.contrasena,
        re_contrasena: this.re_contrasena,
        foto: this.foto
      }
    
      this._userService.perfil( this.usuario ,user).subscribe(() => {
        this.toastr.success("El usuario fue modificado.", "Exito");
        this.router.navigateByUrl('/home');
        })
    })
  }






}

msjErrror(e:HttpErrorResponse) {
  if(e.error.msg){
    this.toastr.error(e.error.msg, "Error");
  }else{
    this.toastr.error("Comuniquese con el administrador.", "Error");

  }
}


}
