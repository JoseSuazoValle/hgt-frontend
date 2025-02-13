import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Requerimiento } from '../../interfaces/Requerimiento';
import { RequerimientoService } from '../../services/requerimiento.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencilAlt, faCalendar, faPenToSquare, faFloppyDisk, faTrash, faCircleXmark  } from '@fortawesome/free-solid-svg-icons';
import { Notificacion } from '../../interfaces/notificacion';
import { NotificationService } from '../../services/notification.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';
import { RequerimientosFiles } from '../../interfaces/requerimientos-files';
import { RequerimientoFilesService } from '../../services/requerimientos-files';


@Component({
  selector: 'app-requerimiento-add',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './requerimiento-add.component.html',
  styleUrl: './requerimiento-add.component.css'
})

export class RequerimientoAddComponent {

  asunto: string = '';
  empresa: string | null = '';
  emisor: string | null = '';
  plazo: number = 0;
  receptor: string = 'Selecciona...';
  tipo: string = 'Selecciona...';
  estado: string = 'Sin revisión';
  detalle: string = '';
  valueUser: string | null = '';
  cliente: string = 'Selecciona...';
  foto: string | null = 'asd'
  // Parametros de requerimiento creado

  idRequerimiento: number = 0;
  fechaCreacion: string = ''

  nombreUsuario: string | null = '';

  faFloppyDisk = faFloppyDisk;
  faCalendar = faCalendar;
  faCircleXmark = faCircleXmark;


  listClientes: Cliente[] = []
  listUsuarios: string[] = []
  listUsuariosEmpresa: User[] = []
  listReceptores: string[] = []


  administradorCheck: boolean = false; // administrador va siempre en todo como true
  gestionarCheck: boolean = false; // Es para ver si el menu gestionar es desplegable o no
  gerenciaCheck: boolean = false; // Este mmm deberia ser para visualizar todos los requerimientos, no para algo en el menu
  aycCheck: boolean = false;
  valormatrizCheck: boolean = false;
  taoCheck: boolean = false;

  ReqPrivateCheck: boolean = false;

  clienteCheckPermiso: boolean = false;

  usuario: string | null = '';


  archivoCargado: string = 'Selecciona archivo...';
  fileTmp: any;
  listFiles: any[] = [];


  constructor(private router: Router, private _requerimientoService: RequerimientoService, private _userService: UserService, private _clienteService: ClienteService,
     private toastr: ToastrService, private _notificacionService: NotificationService, private _permisoService: PermisosServices, private _requerimientosFiles: RequerimientoFilesService)
  {
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');

      this.usuario  = sessionStorage.getItem('username')!;
      this.getPermisos(this.usuario);
  }
  ngOnInit(): void {
    this.getClientes(); 

  }

  getFile($event: any): void
  {
    const [ file ] = $event.target.files;
    this.archivoCargado = file.name
    this.fileTmp = 
    {
      fileRaw: file,
      fileName: file.name
    }
    this.addFiles(this.fileTmp);
  }

  addFiles(archivo: any)
  {
    if(this.listFiles.indexOf(archivo) < 0)
    {
      this.listFiles.push(archivo)
    }
  }

  deleteFiles(archivo: any)
  {
    console.log(archivo.fileName)
    for(const item of this.listFiles)
      {
        if(item.fileName == archivo.fileName)
          {
            this.listFiles.splice(item, 1);
          }
      }
  }
  
  addReceptores(receptor: string)
  {
    if(this.listReceptores.indexOf(receptor) < 0)
    {
      this.listReceptores.push(receptor)
    }
  }

  deleteReceptor(receptor: string)
  {
    const index = this.listReceptores.indexOf(receptor, 0);
      if (index > -1) 
        {
          this.listReceptores.splice(index, 1);
      }     
  }

  getClientes(){

    this._clienteService.getCliente().subscribe(data => {
  
      this.listClientes = data;
  
    })
  }

  ValidatePermisos()
  {
    if(this.administradorCheck || this.aycCheck)
    {
        this.clienteCheckPermiso = true;
    }
  }

  getPermisos(user: string)
  {
        this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
          this.administradorCheck = data.administrador;
          this.aycCheck = data.ayc;
          this.valormatrizCheck = data.valormatriz;
          this.taoCheck = data.tao;
          this.gestionarCheck = data.gestionar_usuarios;
          this.gerenciaCheck = data.gerencia;
          this.ValidatePermisos();
          this.getUsuarios(); 
      })
  }

  getUsuarios()
  {

    if(this.administradorCheck || this.gerenciaCheck)
    {
      this._userService.getUsuarios().subscribe(data => {
        for(const item of data)
          {
            if(this.listUsuarios.indexOf(item.usuario) < 0)
              {
                this.listUsuarios.push(item.usuario)
              }
          }
      })
    }
    if(this.aycCheck)
    {
      this._userService.getUsuariosAyC().subscribe(data => { 
        for(const item of data)
          {
            if(this.listUsuarios.indexOf(item.usuario) < 0)
              {
                this.listUsuarios.push(item.usuario)
              }
          }
      })
    }
    if(this.valormatrizCheck)
    {

      this._userService.getUsuariosValorMatriz().subscribe(data => {
        for(const item of data)
          {
            if(this.listUsuarios.indexOf(item.usuario) < 0)
              {
                this.listUsuarios.push(item.usuario)
              }
          }
      })
    }
    if(this.taoCheck)
    {
      this._userService.getUsuariosTao().subscribe(data => {
        for(const item of data)
          {
            if(this.listUsuarios.indexOf(item.usuario) < 0)
              {
                this.listUsuarios.push(item.usuario)
              }
          }

      })
    }

  }

  requerimientos(){
    this.router.navigateByUrl('/home')
  }

  req_add(){
    this.emisor  = sessionStorage.getItem('username')!;
    this.empresa  = sessionStorage.getItem('empresa')!;
    this.foto = sessionStorage.getItem('foto')!;


    if(this.asunto == "")
      {
        this.toastr.error('Debe ingresar asunto.', 'Error')
        return;
      }
      if(this.listReceptores.length <= 0)
        {
          this.toastr.error('Debe seleccionar un receptor.', 'Error')
          return;
        }
        if(this.plazo == 0)
        {
          this.toastr.error('Debe ingresar un plazo.', 'Error')
          return;
        }
        if(this.tipo == "Selecciona...")
        {
          this.toastr.error('Debe seleccionar el tipo de requerimiento.', 'Error')
          return;
        }
        if(this.detalle == "")
        {
          this.toastr.error('Debe ingresar detalle.', 'Error')
          return;
        }  

        if(this.cliente == "Selecciona..." && this.clienteCheckPermiso )
          {
            this.toastr.error('Debe seleccionar un cliente.', 'Error')
            return;
          }  
  
        this.valueUser = sessionStorage.getItem('username')!

        for(const item of this.listReceptores)
          {
            if(item == 'Todos')
              {
                this.listReceptores = []
                for(const index of this.listUsuarios)
                  {
                        this.listReceptores.push(index)              
                  }             
              } 
          }
      if(this.cliente == "Selecciona..." )
        {
          this.cliente = "N/A"
        }
        const elements = this.listReceptores;

      

    const requerimiento: Requerimiento = {
      id: 0,
      asunto: this.asunto,
      empresa: this.empresa,
      emisor: this.emisor, // Este debe ser rellenado con los datos del usuario
      plazo: this.plazo,
      receptor: elements.join(','),
      tipo: this.tipo,
      estado: this.estado,
      detalle: this.detalle,
      createdAt: "",
      updatedAt: "",
      createdHour: new Date().toString().split(' ')[4],
      updatedHour: new Date().toString().split(' ')[4],
      updatedUser: this.emisor,
      cliente: this.cliente,
      foto: this.foto,
      archivos: '',
      archivosnewName: '',
      isPrivate: this.ReqPrivateCheck,
      isEditable: false
    }

    this._requerimientoService.saverequerimiento(requerimiento).subscribe((data) => { 
      this.idRequerimiento = data.id

      this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!;
      this.foto = sessionStorage.getItem('foto')!;

    for(const item of this.listFiles)
        {
          const body = new FormData();
          body.append('myfile', item.fileRaw, item.fileName)
          /* body.append('email', 'test@test.cl') */ // asi añado mas cosas al formData, quizas para despues pasar todos los archivos al crear el requerimiento.
          
          this._requerimientoService.sendPostImage(body).subscribe(data => {
            const file: RequerimientosFiles = 
            {
              id: 0,
              originalName: item.fileName,
              newName: data.url, // Aca tengo que poder extraer el nombre
              idRequerimiento: this.idRequerimiento
            }   
            this._requerimientosFiles.saverequerimientoFiles(file).subscribe(() => {

            })   
          })
        }

    for(const item of this.listReceptores)
      {

        const notificacion: Notificacion = 
        {
          id: 0,
          usuarioReceptor: item,
          nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
          encabezado: "Se a asignado un nuevo requerimiento",
          createdAt: "", // Tengo que cambiar este
          hora: new Date().toString().split(' ')[4],
          idRequerimiento: this.idRequerimiento, // Tengo que cambiar este
          isChecked: true,
          foto: this.foto 
        }  

        this._notificacionService.postNotificacion(notificacion).subscribe(() => {

        })
      }
    this.toastr.success('El requerimiento fue ingresado correctamente.', 'Exito')
    this.router.navigateByUrl('/home');

    })


  }
  
}
