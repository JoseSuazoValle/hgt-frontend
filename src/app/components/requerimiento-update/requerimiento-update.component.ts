import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requerimiento } from '../../interfaces/Requerimiento';
import { RequerimientoService } from '../../services/requerimiento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { PermisosServices } from '../../services/permisos.service';
import { Permiso } from '../../interfaces/permiso';
import { RequerimientosFiles } from '../../interfaces/requerimientos-files';
import { RequerimientoFilesService } from '../../services/requerimientos-files';

@Component({
  selector: 'app-requerimiento-update',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './requerimiento-update.component.html',
  styleUrl: './requerimiento-update.component.css'
})
export class RequerimientoUpdateComponent 
{

id: number;
asunto: string = '';
empresa: string = '';
emisor: string | null = '';
plazo: number = 0;
receptor: string = '';
tipo: string = '';
estado: string = 'Sin revisión';
detalle: string = '';
createdHour: string = '';
cliente: string = 'Selecciona...';
foto: string = '';

faCircleXmark = faCircleXmark;
faTrash = faTrash;
valueUser: string | null = '';
usuario: string | null = '';


listUsuarios: string[] = []
listUsuariosEmpresa: User[] = []
listReceptores: string[] = []
listReceptoresSave: string[] = []
listClientes: Cliente[] = []
listFiles: RequerimientosFiles[] = [];
username: string | null = '';

archivoCargado: string = 'Selecciona archivo...';
fileTmp: any;
listFilesUpload: any[] = [];



administradorCheck: boolean = false; // administrador va siempre en todo como true
gestionarCheck: boolean = false; // Es para ver si el menu gestionar es desplegable o no
gerenciaCheck: boolean = false; // Este mmm deberia ser para visualizar todos los requerimientos, no para algo en el menu
aycCheck: boolean = false;
valormatrizCheck: boolean = false;
taoCheck: boolean = false;
ReqPrivateCheck: boolean = false;

clienteCheckPermiso: boolean = false;

  constructor(private router: Router, private aRouter: ActivatedRoute, private _requerimientoService: RequerimientoService, private toastr: ToastrService, private _userService: UserService,
    private _clienteService: ClienteService,  private _permisoService: PermisosServices, private _requerimientosFiles: RequerimientoFilesService
  )
  {
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.getClientes();
    this.getRequerimiento(this.id);
    this.usuario  = sessionStorage.getItem('username')!;
    this.getPermisos(this.usuario);

   
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
    this.addFilesUpload(this.fileTmp);
  }
  deleteFilesUpload(archivo: any)
  {
    for(const item of this.listFilesUpload)
      {
        if(item.fileName == archivo.fileName)
          {
            this.listFilesUpload.splice(item, 1);
          }
      }
  }

  addFilesUpload(archivo: any)
  {
    console.log(archivo)
    if(this.listFilesUpload.indexOf(archivo) < 0)
    {
      this.listFilesUpload.push(archivo)
    }
  }

  DeleteFile(idFile: number, path: string, idrequerimiento: number)
  {

    this._requerimientosFiles.deleterequerimientoFiles(idFile).subscribe(() => { // necesito que en el back haga un getAll
    })
    const fileName = path.split('/uploads/')[1]
    this._requerimientosFiles.deleteFile(fileName).subscribe(() => { // necesito que en el back haga un getAll
    })

    this.getRequerimiento(idrequerimiento);

    this.toastr.success('El archivo fue eliminado.', 'Exito')
    // Genero 2 servicios, uno para borrar la tabla y otro para borrar el archivo por path y me faltaria añadir para agregar mas archivos en el editar?
  }

  getClientes(){

    this._clienteService.getCliente().subscribe(data => {
      this.listClientes = data;
    })
  
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

  getRequerimiento(id: number) 
  {
    this._requerimientoService.getRequerimiento(id).subscribe((data: Requerimiento) => {
      this.listReceptores = data.receptor.split(",")
      this.asunto = data.asunto;
      this.empresa = data.empresa;
      this.emisor = data.emisor;
      this.plazo = data.plazo;
      this.tipo = data.tipo;
      this.estado = data.estado;
      this.detalle = data.detalle;
      this.createdHour = data.createdHour;
      this.cliente = data.cliente;
      this.foto = data.foto;
      this.ReqPrivateCheck = data.isPrivate;

      this._requerimientosFiles.getrequerimientoFiles(id).subscribe(data => { // necesito que en el back haga un getAll
        if(data)
        this.listFiles = data;
      })
    })
  }

  updateRequerimiento()
  {
    
    this.emisor  = sessionStorage.getItem('username')!;

      if(this.asunto == "")
        {
          this.toastr.error('Debe ingresar asunto.', 'Error')
          return;
        }
      if(this.receptor == "Selecciona...")
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
    // tengo que revisar si listFilesUpload es distinto de vacio, entonces tngo que inyectar los servicios para añadir los nuevos archivos
    this.username = sessionStorage.getItem('username')!;
    const requerimiento: Requerimiento = {
      id: this.id,
      asunto: this.asunto,
      empresa: this.empresa,
      emisor: this.emisor, // Este debe ser rellenado con los datos del usuario
      plazo: this.plazo,
      receptor: this.listReceptores.join(','),
      tipo: this.tipo,
      estado: this.estado,
      detalle: this.detalle,
      createdAt: "",
      updatedAt: "",
      createdHour: this.createdHour,
      updatedHour: new Date().toString().split(' ')[4],
      updatedUser: this.username,
      cliente: this.cliente,
      foto: this.foto,
      archivos: "un texto?",
      archivosnewName: "un texto?",
      isPrivate: this.ReqPrivateCheck,
      isEditable: false
    }
    this._requerimientoService.updateRequerimiento(this.id, requerimiento).subscribe(() => {

      for(const item of this.listFilesUpload)
        {
          const body = new FormData();
          body.append('myfile', item.fileRaw, item.fileName)      
          this._requerimientoService.sendPostImage(body).subscribe(data => {
            const file: RequerimientosFiles = 
            {
              id: 0,
              originalName: item.fileName,
              newName: data.url, // Aca tengo que poder extraer el nombre
              idRequerimiento: this.id
            }   
            this._requerimientosFiles.saverequerimientoFiles(file).subscribe(() => {
              console.log("Se guardaron los archivos!");
            })   
          })
        }
      this.toastr.success('El requerimiento fue modificado.', 'Exito')
    this.router.navigateByUrl("/home")
    })
  }

  requerimientos()
  {
    this.router.navigateByUrl("/home")
   }


}
