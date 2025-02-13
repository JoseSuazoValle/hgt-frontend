import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule } from '@angular/router';
import { LoginUser } from '../../interfaces/login-user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/User';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = ''
  contrasena: string = ''

  isChecked = false;

  // iconos
  faUser = faUser;
  faLock = faLock;
  
  

  constructor(private router: Router,  private _userService: UserService, private toastr: ToastrService, private _sessionService: SessionService) 
  {
    
  }




  login() {
    // Validamos que los campos esten llenos

    if(this.usuario == '' || this.contrasena == ''){
      this.toastr.error('Los campos no pueden estar vacios.', 'Error')
      return;
    }
    
    // Creamos el body

    const user: LoginUser = {
      usuario: this.usuario,
      contrasena: this.contrasena
    }
    this._userService.login(user).subscribe({
      next: (token) => {
        
        // Aca pongo el ifIscheked, y seteo las localStorage nomas, porque seasson pasa por aca si no hay recuerdame o si cierran sesion

        if(this.isChecked)
          {
            localStorage.setItem('token', token);
            localStorage.setItem('username', this.usuario)  
            localStorage.setItem('rememberMe',JSON.stringify(this.isChecked))      
          }

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', this.usuario);
        this.getUsuario(this.usuario);
        this._sessionService.userSubject.next(this._sessionService.islogin());
        this.router.navigateByUrl('/home');
      },
      error: (e: HttpErrorResponse) => {
        this.msjErrror(e)
      }
    })

    
  }

  getUsuario(usuario: string) 
  {
    this._userService.getUsuario(usuario).subscribe((data: User) => {
      if(this.isChecked)
        {          
          localStorage.setItem('nombreUsuario', data.nombre);
          localStorage.setItem('empresa', data.empresa);    
          localStorage.setItem('foto', data.foto)   
        }
      sessionStorage.setItem('nombreUsuario', data.nombre);
      sessionStorage.setItem('empresa', data.empresa);
      sessionStorage.setItem('foto', data.foto)   
    })
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  msjErrror(e:HttpErrorResponse) {
    if(e.error.msg){
      this.toastr.error(e.error.msg, "Error");
    }else{
      this.toastr.error("Comuniquese con el administrador.", "Error");
    }
  }
}
