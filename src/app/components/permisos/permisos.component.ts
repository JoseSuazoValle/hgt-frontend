import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faEnvelope, faAddressCard, faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/User';
import { CommonModule } from '@angular/common';
import { PermisosServices } from '../../services/permisos.service';
import { Permiso } from '../../interfaces/permiso';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [FormsModule, ToastrModule, FontAwesomeModule, CommonModule],
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.css'
})
export class PermisosComponent {
  idUsuario: number = 0;
  usuario: string = "";
  email: string = "";
  nombre: string = "";
  empresa: string = "Selecciona...";
  contrasena: string = "";
  re_contrasena: string = "";

  firstPermiso: boolean = false;

// CheckBox

administradorCheck: boolean = false;
taoCheck: boolean = false;
aycCheck: boolean = false;
valormatrizCheck: boolean = false;
gestionarCheck: boolean = false;
dashboardCheck: boolean = false;
gerenciaCheck: boolean = false;


isAdmin: boolean = false;
DisableCheckEmpresa: boolean = false;

// inicializando iconos
faUser = faUser;
faEnvelope = faEnvelope;
faAddressCard = faAddressCard;
faBusinessTime = faBusinessTime;
faLock = faLock;

user: string = "Elige un usuario...";
listaUsuarios: User[] = [];
userDelete: string = "Elige un usuario..."
usuarioPermisos: string = "";

constructor(private router: Router, private _userService: UserService, private toastr: ToastrService, private _permisoService: PermisosServices) 
{
  if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
    this.router.navigateByUrl('/login');

  this.getUsuarios();
  this.usuarioPermisos  = sessionStorage.getItem('username')!;
  this.getPermisoDelete(this.usuarioPermisos);
}

deleteUsuario(User: string)
{
  console.log("Useeeer: " + User)
  this._userService.deleteUsuario(User).subscribe(() => {
    this.getUsuarios();
    this.toastr.success('El usuario fue eliminado.', 'Exito')
    //this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
  })
}


RestrictCheckJerencia()
{
  if(this.gerenciaCheck)
  {
  this.valormatrizCheck = false;
  this.taoCheck = false;
  this.aycCheck = false;
  }
}
RestrictCheckAyC()
{
  if(this.aycCheck)
    {
      this.gerenciaCheck = false;
    }
}

RestrictCheckValorMatriz()
{
  if(this.valormatrizCheck)
    {
      this.gerenciaCheck = false;
    }
}
RestrictCheckTao()
{
  if(this.taoCheck)
    {
      this.gerenciaCheck = false;
    }
}
modificarPermisos(user: string)
{
  // Si busco en la lista de usuarios, hasta encontra el que sea igual al user, y le saco el id?
  let userModify: number = 0
  for(const item of this.listaUsuarios)
    {
      if(item.usuario == user)
        {
          userModify = item.id;
        }
    }
  const permiso: Permiso = {
    id: 0,
    usuario: user,
    administrador: this.administradorCheck,
    tao: this.taoCheck,
    ayc: this.aycCheck,
    valormatriz: this.valormatrizCheck,
    gestionar_usuarios: this.gestionarCheck,
    dashboard: this.dashboardCheck,
    gerencia: this.gerenciaCheck,
    idUsuario: userModify//***  Aca va el id del usuario */
  }

  this._permisoService.updPermisos(user,permiso).subscribe();

  this.getUsuarios();
  this.cleanPermisos();
  // Aca seteo la nueva tabla que tengo que crear que almacena los check de permisos

  // aca tengo que crear el servicio para insertar o modificar en la bd?
  // tengo el usuario y los check, aaa, cuando selecciono uno, es q cmo creo
}

cleanPermisos()
{
  this.administradorCheck = false;
  this.taoCheck = false;
  this.aycCheck= false;
  this.valormatrizCheck = false;
  this.gestionarCheck = false;
  this.dashboardCheck = false;
  this.gerenciaCheck = false;
}

getPermisoDelete(user: string)
{

      this._permisoService.getPermisos(user).subscribe((data: Permiso) => {

        this.isAdmin = data.administrador;

    })


}

getPermisos(user: string)
{
  if(user != "Elige un usuario...")
    {
      this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
        this.administradorCheck = data.administrador;
        this.taoCheck = data.tao;
        this.aycCheck = data.ayc;
        this.valormatrizCheck = data.valormatriz;
        this.gestionarCheck = data.gestionar_usuarios;
        this.dashboardCheck = data.dashboard;
        this.gerenciaCheck = data.gerencia;
    })
    }

}

getUsuarios()
{

  console.log("llego a get usuarios")
  this._userService.getUsuarios().subscribe(data => {
    console.log("Get usuarieos")
    this.listaUsuarios = data;
  })
}

addUser() {

  // validamos que el usuario ingrese valores

  if(this.usuario == "")
  {
    this.toastr.error('Debes ingresar un usuario.', 'Error')
    return;
  }
  if(this.email == "")
    {
      this.toastr.error('Debes ingresar un correo electronico.', 'Error')
      return;
    }
  if(this.nombre == "" )
    {
      this.toastr.error('Debes ingresar un nombre.', 'Error')
      return;
    }
    if(this.empresa == "Selecciona...") // Este es un selected
    {
      this.toastr.error('Debes ingresar una empresa.', 'Error')
      return;
    }
    if(this.contrasena == "")
    {
      this.toastr.error('Debes ingresar una contraseña.', 'Error')
      return;
    }
    if(this.re_contrasena == "")
    {
      this.toastr.error('Debes ingresar nuevamente la contraseña.', 'Error')
      return;
    }
  // Validamos contraseñas
  if(this.contrasena != this.re_contrasena) {
    //this.toastr.error("Error", "Las contraseñas ingresadas no coinciden");
    this.toastr.error('Las contraseñas deben ser iguales.', 'Error')
    return;
  }

  // Creamos el objeto

  const user: User = {
    id: 0,
    usuario: this.usuario,
    email: this.email,
    nombre: this.nombre,
    empresa: this.empresa,
    contrasena: this.contrasena,
    re_contrasena: this.re_contrasena,
    foto: "/assets/img/avatar5.png"
  }

  this._userService.register(user).subscribe( (data) =>{
    // Tngo que hacer que register, me devuelva el id del usuario como hago en requerimietos.
    this.idUsuario = data.id
      const permiso: Permiso = {
        id: 0,
        usuario: this.usuario,
        administrador: false,
        tao: false,
        ayc: false,
        valormatriz: false,
        gestionar_usuarios: false,
        dashboard: false,
        gerencia: false,
        idUsuario: this.idUsuario
      }
      
      this._permisoService.addPermisos(permiso).subscribe(() => {
        console.log(this.idUsuario)
        this.getUsuarios();
        this.toastr.success('El usuario fue registrado con exito.', 'Exito')
        this.cleanRegister();
      });

      
  });
  
  
}

cleanRegister()
{
  this.usuario = "";
  this.email = "";
  this.nombre = "";
  this.empresa = "Selecciona...";
  this.contrasena = "";
  this.re_contrasena = "";
}

msjErrror(e:HttpErrorResponse) {
  if(e.error.msg){
    this.toastr.error(e.error.msg, 'Error')
  }else{
    this.toastr.error('Comuniquese con el administrador.', 'Error')
  }
}


}
