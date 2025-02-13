import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequerimientoService } from '../../services/requerimiento.service';
import { Requerimiento } from '../../interfaces/Requerimiento';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../interfaces/comentario';
import { ComentarioService } from '../../services/comentario.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faCommentDots, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { RequerimientosFiles } from '../../interfaces/requerimientos-files';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { Notificacion } from '../../interfaces/notificacion';
import { NotificationService } from '../../services/notification.service';
import { RequerimientoFilesService } from '../../services/requerimientos-files';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';

@Component({
  selector: 'app-requerimiento-view',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './requerimiento-view.component.html',
  styleUrl: './requerimiento-view.component.css'
})
export class RequerimientoViewComponent {


  // Iconos 
  
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faCommentDots = faCommentDots;
  // Variables requerimiento

  id: number;
  asunto: string = '';
  empresa: string = '';
  emisor: string = '';
  plazo: number = 0;
  receptor: string = '';
  tipo: string = '';
  estado: string = 'Sin revisión';
  detalle: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  createdHour: string = '';
  foto: string | null = '';
  valueUser: string | null = '';
  cliente: string = '';

  checkReceptor: boolean = false;
  updatedHour: string = '';
  updatedUser: string = '';

  nombreUsuario: string | null = '';

  // Variables comentario 

  listcomentarios: Comentario[] = []
  listReceptores: string[] = []
  comentario: string = '';

  listFiles: RequerimientosFiles[] = [];

  
    constructor(private router: Router, private aRouter: ActivatedRoute, private _requerimientoService: RequerimientoService, private _comentarioService: ComentarioService,
    private toastr: ToastrService, private _notificacionService: NotificationService, private _requerimientosFiles: RequerimientoFilesService, private _permisoService: PermisosServices
    )
    {

      if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
        this.router.navigateByUrl('/login');
      
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
      this.valueUser = sessionStorage.getItem('username')!
      this.foto = sessionStorage.getItem('foto')!
      this.getPermisos(this.valueUser);
      this.getRequerimiento(this.id);
      this.getComentarios(this.id);
    }

    administradorCheck: boolean = false; // administrador va siempre en todo como true
    aycCheck: boolean = false;
    isPrivate: boolean = false;
    
    clienteCheckPermiso: boolean = false;

      ValidatePermisos()
      {
        if(this.administradorCheck || this.aycCheck)
        {
            this.clienteCheckPermiso = true;
        }
    
      }
      getPermisos(user: string)
      {
        console.log(user)
            this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
              this.administradorCheck = data.administrador;
              this.aycCheck = data.ayc;
              this.ValidatePermisos();
          })
      }


    
    getComentarios(id: number) // Tengo que pasar como parametro
    {
      this._comentarioService.getComentarios(id).subscribe(data => {
        this.listcomentarios = data;
      })
    }

    addComentario()
    {      
      if(this.comentario == "")
        {
          this.toastr.error('Debe escribir un comentario.', 'Error')
          return;
        }  
      this.foto = sessionStorage.getItem('foto')!
      const comentario: Comentario = {
        id: 0,
        usuario: sessionStorage.getItem('username')!,
        nombre: sessionStorage.getItem('nombre')!,
        comentario: this.comentario,
        idRequerimiento: this.id,
        createdAt: "",
        hora: new Date().toString().split(' ')[4],// Este debo alimentarlo de alguna funcion
        foto: this.foto
      }
          
      this._comentarioService.postComentario(comentario).subscribe(() => {
        this.toastr.success('El comentario fue añadido.', 'Exito')
        this.comentario = ""
        this.getComentarios(this.id);
      })

      this.valueUser = sessionStorage.getItem('username')!


      for(const item of this.listReceptores)
        {
          if(this.valueUser != item)
          {
            this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!
            this.foto = sessionStorage.getItem('foto')!
            const notificacion: Notificacion = {
              id: 0,
              usuarioReceptor: item,
              nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
              encabezado: "Hay un nuevo comentario!",
              createdAt: "",
              hora: new Date().toString().split(' ')[4],
              idRequerimiento: this.id,
              isChecked: true,
              foto: this.foto
            }  
      
            this._notificacionService.postNotificacion(notificacion).subscribe(() => {
              console.log("Se añadio una notificacion!");
            })
          }    
        }
        
        if(this.valueUser != this.emisor)
        {
          this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!
          this.foto = sessionStorage.getItem('foto')!
          const notificacion: Notificacion = {
            id: 0,
            usuarioReceptor: this.emisor,
            nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
            encabezado: "Hay un nuevo comentario!",
            createdAt: "",
            hora: new Date().toString().split(' ')[4],
            idRequerimiento: this.id,
            isChecked: true,
            foto: this.foto
          }  
    
          this._notificacionService.postNotificacion(notificacion).subscribe(() => {
            console.log("Se añadio una notificacion!");
          })
        }
      
      
    }

    deleteComentario(idComentario: number)
    {
      this._comentarioService.deleteComentario(idComentario).subscribe(() => {
        this.getComentarios(this.id);
        this.toastr.success('El comentario fue eliminado.', 'Exito')
        //this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
      })
      
    }

    getRequerimiento(id: number) 
    {
      this._requerimientoService.getRequerimiento(id).subscribe((data: Requerimiento) => {

        this.valueUser = sessionStorage.getItem('username')!
        this.listReceptores = data.receptor.split(",")
        for(const item of this.listReceptores)
          {
            if(item == this.valueUser)
              {
                this.checkReceptor = true
              }
          }
        this.asunto = data.asunto;
        this.empresa = data.empresa;
        this.emisor = data.emisor;
        this.plazo = data.plazo;
        this.receptor = data.receptor;
        this.cliente = data.cliente;
        this.tipo = data.tipo;
        this.estado = data.estado;
        this.detalle = data.detalle;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.createdHour = data.createdHour;
        this.updatedHour = data.updatedHour;
        this.updatedUser = data.updatedUser;
        this.isPrivate = data.isPrivate;
        this._requerimientosFiles.getrequerimientoFiles(id).subscribe(data => { // necesito que en el back haga un getAll
          if(data)
          this.listFiles = data;
        })
      })
    }
  
    requerimientos()
    {
      this.router.navigateByUrl("/home")
     }
  
     modificarRequerimiento(){
      this.valueUser = sessionStorage.getItem('username')!
      this.foto  = sessionStorage.getItem('foto')!;
      const requerimiento: Requerimiento = {
      id: this.id,
      asunto: this.asunto,
      empresa: this.empresa,
      emisor: this.emisor, // Este debe ser rellenado con los datos del usuario
      plazo: this.plazo,
      receptor: this.receptor,
      tipo: this.tipo,
      estado: this.estado,
      detalle: this.detalle,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdHour: this.createdHour,
      updatedHour: new Date().toString().split(' ')[4],
      updatedUser: this.valueUser,
      cliente: this.cliente,
      foto: this.foto,
      archivos: '',
      archivosnewName: '',
      isPrivate: this.isPrivate,
      isEditable: false
    }
    this._requerimientoService.updateRequerimiento(this.id, requerimiento).subscribe(() => {
      this.toastr.success('El estado del requerimiento fue modificado.', 'Exito')
    //this.router.navigateByUrl("/home")
    })

    const date = new Date();
    let day = date.getDate();
    let dia: string = "";
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(day < 10)
      dia = "0" + day;
    else
      dia = "" + day;
    let currentDate: string = year + "-" + month + "-" + dia; // el ultimo valor es para añadirle el 0 adelante

    this.updatedUser = this.valueUser
    this.updatedAt = currentDate;
    this.updatedHour = new Date().toString().split(' ')[4]
    this.valueUser = sessionStorage.getItem('username')!
    
    for(const item of this.listReceptores)
    {
      if(this.valueUser != item)
        {
          this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!
          this.foto = sessionStorage.getItem('foto')!
          const notificacion: Notificacion = {
            id: 0,
            usuarioReceptor: item,
            nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
            encabezado: "A cambiado el estado de un requerimiento",
            createdAt: "",
            hora: new Date().toString().split(' ')[4],
            idRequerimiento: this.id,
            isChecked: true,
            foto: this.foto 
          }  
    
          this._notificacionService.postNotificacion(notificacion).subscribe(() => {
            console.log("Se añadio una notificacion!");
          })
        }
    }

        this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!
        this.foto = sessionStorage.getItem('foto')!
        const notificacion: Notificacion = {
          id: 0,
          usuarioReceptor: this.emisor,
          nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
          encabezado: "A cambiado el estado de un requerimiento",
          createdAt: "",
          hora: new Date().toString().split(' ')[4],
          idRequerimiento: this.id,
          isChecked: true,
          foto: this.foto
        }  
  
        this._notificacionService.postNotificacion(notificacion).subscribe(() => {
          console.log("Se añadio una notificacion!");
        })



      
     }
  
 }