import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faComments, faBook, faCalendarAlt, faCheckSquare, faUser, faUsers, faTachometerAlt, faWindowClose, faBars, faCircle, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { Comentario } from '../../interfaces/comentario';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { RequerimientoService } from '../../services/requerimiento.service';
import { Requerimiento } from '../../interfaces/Requerimiento';
import { Notificacion } from '../../interfaces/notificacion';
import { Observable, Subject } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: 
  [
  ]

})


export class HeaderComponent {
  // Importando los iconos del menu
  faSearch = faSearch;
  facomments = faComments ;
  faBook = faBook;
  faCalendarAlt = faCalendarAlt;
  faCheckSquare = faCheckSquare;
  faUser = faUser;
  faUsers = faUsers;
  faTachometerAlt = faTachometerAlt;
  faWindowClose = faWindowClose;
  faBars = faBars;
  faCircle = faCircle;
  faTrash = faTrash;

  usuario: string | null = '';
  nombreUsuario: string | null = '';
  nombreCompleto: string = '';
  listNotification: Notificacion[] = [];
  newNotification: number = 0; // Este tiene que sumar los checkIn de los comentarios, asi que le añadire el checkIN
  bottonNotificacion: string = 'Mostrar todas las notificaciones';
  totalNotificacion: number = 0;

  foto: string = ''

  constructor(private router: Router,private _userService: UserService, private _notificacionService: NotificationService, private _sessionService: SessionService, private _permisoService: PermisosServices) 
  {

/*       if(sessionStorage.getItem('token')!)
        this.router.navigateByUrl('/login') */
if(localStorage.getItem('rememberMe'))
  {
    sessionStorage.setItem('token', localStorage.getItem('token')!)
    sessionStorage.setItem('username', localStorage.getItem('username')!)
    sessionStorage.setItem('nombreUsuario', localStorage.getItem('nombreUsuario')!);
    sessionStorage.setItem('empresa', localStorage.getItem('empresa')!);
    sessionStorage.setItem('foto', localStorage.getItem('foto')!);
  }
    this.usuario  = sessionStorage.getItem('username')!;
    this.getUsuario(this.usuario);
    this.getNotification(this.usuario);
    this.getPermisos(this.usuario);
    setInterval(() => this.getNotification(this.usuario!), 5000);
  }

  administradorCheck: boolean = false; // administrador va siempre en todo como true
  gestionarCheck: boolean = false; // Es para ver si el menu gestionar es desplegable o no
  dashboardCheck: boolean = false; // Es para ver si dashboard es desplegable o no
  gerenciaCheck: boolean = false; // Este mmm deberia ser para visualizar todos los requerimientos, no para algo en el menu
  aycCheck: boolean = false;

  gestionarCheckButton: boolean = false;
  dashboardCheckButton: boolean = false;
  clientesCheckButton: boolean = false;

  ValidatePermisos()
  {
    if(this.administradorCheck || this.gestionarCheck)
    {
      this.gestionarCheckButton = true;
    }
    if(this.administradorCheck || this.dashboardCheck)
    {
      this.dashboardCheckButton = true;
    }
    if(this.administradorCheck || this.aycCheck)
    {
        this.clientesCheckButton = true;
    }
  }
  getPermisos(user: string)
  {
        this.usuario  = sessionStorage.getItem('username')!;
        this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
          this.administradorCheck = data.administrador;
          this.aycCheck = data.ayc;
          this.gestionarCheck = data.gestionar_usuarios;
          this.dashboardCheck = data.dashboard;
          this.gerenciaCheck = data.gerencia;
          this.ValidatePermisos();
      })
  }



  getNotification(usuario: string)
  {
    if(localStorage.getItem('rememberMe'))
      {
        sessionStorage.setItem('token', localStorage.getItem('token')!)
        sessionStorage.setItem('username', localStorage.getItem('username')!)
        sessionStorage.setItem('nombreUsuario', localStorage.getItem('nombreUsuario')!);
        sessionStorage.setItem('empresa', localStorage.getItem('empresa')!);
        sessionStorage.setItem('foto', localStorage.getItem('foto')!);
      }
    this._notificacionService.getNotification(usuario).subscribe(data => { // Aca tengo que hacer que traiga las notificaciones a gerencia
      this.listNotification = data // con el boolean del ischecked lo tiro directo al ngIf para que muestre el circulito, y abajo a la derecha tiene que ir el basurerito para limpiar la notificacion
      var sum = 0;
      for(let item = 0 ; item < this.listNotification.length ; item++)
        {
          if(this.listNotification[item].isChecked)
            {
              sum++;      
            }
        }
      this.totalNotificacion = sum;
    })
  }

  marcarNotificaciones()
  {
    for(const item of this.listNotification)
      {
        this.foto = sessionStorage.getItem('foto')!
        const notificacion: Notificacion = {
          id: item.id,
          usuarioReceptor: item.usuarioReceptor,
          nombreNotificante: item.nombreNotificante,
          encabezado: item.encabezado,
          createdAt: item.createdAt,
          hora: item.hora,
          idRequerimiento: item.idRequerimiento,
          isChecked: false,
          foto: item.foto
        }  
    
        this._notificacionService.updNotification(item.id, notificacion).subscribe(() => {
          this.usuario  = sessionStorage.getItem('username')!;
          this.getNotification(this.usuario); //volver a llamar a la funcion para cargar
      })
      }
    //llamo al servicio que updatea pero que lo repita para todas las notificaciones
  }

  borrarNotificaciones()
  {
    for(const item of this.listNotification)
      {
        if(item.isChecked == false)
        {
 
            this._notificacionService.deleteNotificacion(item.id).subscribe(() => {
              this.usuario  = sessionStorage.getItem('username')!;
              this.getNotification(this.usuario); //volver a llamar a la funcion para cargar
            })
        }
      }
    //llamo al servicio que los conoce a todos pero marco borrar en loop
  }

  deleteNotificacion(idNotificacion: number)
  {

  }
  
  navigateNotification(idRequerimiento: number, idNotificacion: number, nombreNotificante: string, usuarioReceptor: string, encabezado: string, createdAt: string, hora: string, foto: string)
  {

    const notificacion: Notificacion = {
      id: idNotificacion,
      usuarioReceptor: usuarioReceptor,
      nombreNotificante: nombreNotificante,
      encabezado: encabezado,
      createdAt: createdAt,
      hora: hora,
      idRequerimiento: idRequerimiento,
      isChecked: false,
      foto: foto
    }  

    this._notificacionService.updNotification(idNotificacion, notificacion).subscribe(() => {
      this.usuario  = sessionStorage.getItem('username')!;
      this.getNotification(this.usuario); //volver a llamar a la funcion para cargar
      //const currentUrl = this.router.url;
      // Por aca debo hacer un if else, con el idRequerimiento == 0 anda al calendario, sino, lo que ya hace.
      if(idRequerimiento == 0)
      {
        this.router.navigateByUrl('/calendario').then(() => {
          //this.router.navigate([currentUrl]);
          this.router.navigateByUrl('/calendario').then(() => {
            window.location.reload();
          });
        });
      }
      else
      {
        this.router.navigateByUrl('/req-view/' + idRequerimiento).then(() => {
          //this.router.navigate([currentUrl]);
          this.router.navigateByUrl('/req-view/' + idRequerimiento).then(() => {
            window.location.reload();
          });
        });
      }

  })

  }

  mostrarNotificaciones(flag: boolean)
  {
    if(flag)
    this.bottonNotificacion = 'Esconder todas las notificaciones'

    // Algo esta pasando aca, es posible lo que uqiero aca igualando la listnotification a la lista con 5 valores o la lista con todos.
  }

  getUsuario(usuario: string) 
  {
    this._userService.getUsuario(usuario).subscribe((data: User) => {
      this.nombreUsuario = data.nombre;
      this.foto = data.foto
      sessionStorage.setItem('nombre', data.nombre);
    })
  }


  requerimientosView(id: number) {
    this.router.navigateByUrl('/home');
  }

  requerimientos() {
    this.router.navigateByUrl('/home');
  }
  calendario() {
    this.router.navigateByUrl('/calendario');
  }
  permisos() {
    this.router.navigateByUrl('/permisos');
  }
  perfil() {
    this.router.navigateByUrl('/perfil');
  }
  dashboard() {  
    this.router.navigateByUrl('/dashboard');
  }
  clientes() {
    this.router.navigateByUrl('/clientes');
  }
  logout() {   
    sessionStorage.clear()
    if(localStorage.getItem('rememberMe'))
      localStorage.clear()
    this._sessionService.userSubject.next(this._sessionService.islogin());
    this.router.navigateByUrl('/login');
  }

}
