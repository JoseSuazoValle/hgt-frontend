import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RequerimientoService } from '../../services/requerimiento.service';
import { HttpHeaders } from '@angular/common/http';
import { Requerimiento } from '../../interfaces/Requerimiento';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencilAlt, faCalendar, faPenToSquare, faTableList, faTableCellsLarge, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../../pipes/filter.pipe";
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-requerimientos',
    standalone: true,
    templateUrl: './requerimientos.component.html',
    styleUrl: './requerimientos.component.css',
    imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule, FormsModule, FilterPipe]
})
export class RequerimientosComponent {


  filterReq: string = '';
  properties: string = 'Todos';
  state: string = 'Todos';
  emisor: string = 'Todos';
  receptor: string = 'Todos';
  tipo: string = 'Todos';
  plazo: string = 'Todos';
  empresa: string = 'Todos';
  foto: string = '';
  cliente: string = 'Todos';

  fechaFiltro: string = '';

  token: string | null = ''

  faPencilAlt = faPencilAlt;
  faCalendar = faCalendar;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faTableList = faTableList;
  faTableCellsLarge = faTableCellsLarge
  faTrash = faTrash;
  
  listrequerimientos: Requerimiento[] = []
  listReceptorSplit: string [] = []


  listaEmpresas: string[] = []
  listaEmisor: string[] = []
  listaReceptor: User[] = []
  listaTipo: string[] = []
  listaPlazo: number[] = []
  listReceptores: string[] = []
  listClientes: Cliente[] = []
  viewListValue: boolean = true
  viewCuadriculeValue: boolean = false;

 usuario: string | null = '';
 empresaReceptor: string | null = '';

administradorCheck: boolean = false; // administrador va siempre en todo como true
gerenciaCheck: boolean = false; // Este mmm deberia ser para visualizar todos los requerimientos, no para algo en el menu
aycCheck: boolean = false;
valormatrizCheck: boolean = false;
taoCheck: boolean = false;

clienteCheckPermiso: boolean = false;
DeleteCheckPermiso: boolean = false;

UpdateCheckPermiso: boolean = false;

  constructor(private router: Router, private _requerimientoService: RequerimientoService, private _clienteService: ClienteService, private _userService: UserService,
     private _permisoService: PermisosServices, private toastr: ToastrService) 
  {
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');

      this.usuario  = sessionStorage.getItem('username')!;
      this.empresaReceptor = sessionStorage.getItem('empresa')!;
      this.getPermisos(this.usuario);
      this.vista();

  }

  ValidatePermisos()
  {
    if(this.administradorCheck || this.aycCheck)
    {
        this.clienteCheckPermiso = true;
    }

    if(this.administradorCheck)
      {
          this.DeleteCheckPermiso = true;
      }
  }
  getPermisos(user: string)
  {
        this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
          this.administradorCheck = data.administrador;
          this.aycCheck = data.ayc;
          this.gerenciaCheck = data.gerencia;
          this.valormatrizCheck = data.valormatriz;
          this.taoCheck = data.tao;
          this.ValidatePermisos();
          this.getRequerimiento();
      })
  }


  deleteRequerimiento(idRequerimiento: number)
  {

      if(window.confirm("Estas seguro que quieres borrar el requerimiento?"))
      {
        this._requerimientoService.deleteRequerimiento(idRequerimiento).subscribe(() => {
          this.getRequerimiento();
          this.toastr.success('El requerimiento fue eliminado.', 'Exito')
          
          //this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
        })
      }
      


  }

  req_view(idRequerimiento: number)
  {
    this.router.navigateByUrl('/req-view/' + idRequerimiento);
  }

  vista()
  {
    if(sessionStorage.getItem('vista') == 'cuadricula')
    {
      this.viewCuadriculeValue = true
      this.viewListValue = false
    }
    else
    {
      this.viewListValue = true
      this.viewCuadriculeValue = false 
      
    }
  }

  viewList()
  {
    if(this.viewListValue)
      {
        this.viewListValue = false
        this.viewCuadriculeValue = true
        
      }
    else
      {
        this.viewListValue = true
        this.viewCuadriculeValue = false 
        sessionStorage.removeItem('vista')
        sessionStorage.setItem('vista', 'lista')
      }
  }

  viewCuadricule()
  {
    if(this.viewCuadriculeValue)
      {
        this.viewCuadriculeValue = false
        this.viewListValue = true

      }
    else
      {
        this.viewCuadriculeValue = true
        this.viewListValue = false
        sessionStorage.removeItem('vista')
        sessionStorage.setItem('vista', 'cuadricula')
      }
  }

  getRequerimiento(){
    this.listrequerimientos = [];
    if(this.gerenciaCheck || this.administradorCheck)
      {
        this._requerimientoService.getrequerimientos().subscribe(data => {        
          for(const item of data)
            {
              item.isEditable = true;
              this.listrequerimientos.push(item);
            }
          this.getEmpresas(this.listrequerimientos)
          this.getEmisor(this.listrequerimientos)
          this.getReceptor(this.listrequerimientos)
          this.getTipo(this.listrequerimientos)
          this.getPlazo(this.listrequerimientos)
          this.getClientes();
        })
      }
    if(this.aycCheck)
    {
      this.usuario  = sessionStorage.getItem('username')!;
      this.empresaReceptor = sessionStorage.getItem('empresa')!;

      const parametros =
      {
        empresa: 'ayc',
        receptor: this.usuario
      }

      this._requerimientoService.getrequerimientosAyC(parametros).subscribe(data => { // Debo pasarle como parametro la empresa del usuario, este parametro no va de la mano cn la cuenta sino cn el permiso
        
        this.usuario  = sessionStorage.getItem('username')!;
        for(const item of data)
          {
            if(item.isPrivate) // Si el requerimiento es privado, necesito que cumpla con una de estas dos o no se agrega.
              {
                if(item.emisor == this.usuario) // Chequeo si el usuario es el emisor del requerimiento
                  {
                    item.isEditable = true;
                    this.listrequerimientos.push(item);
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario) // Chequeo si el usuario logeado es un receptor del requerimiento privado
                        {
                          item.isEditable = true;
                          this.listrequerimientos.push(item);
                        }
                    }
                }
              }
            else // Si el requerimiento no es privado solo lo añado a la lista.
            {
              if(item.emisor == this.usuario) // Chequeo si el usuario es el emisor del requerimiento
                  {
                    item.isEditable = true;
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario) // Chequeo si el usuario logeado es un receptor del requerimiento privado
                        {
                          item.isEditable = true;
                        }
                    }
                }

              this.listrequerimientos.push(item);
            }
          }

        this.listrequerimientos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        this.getEmpresas(this.listrequerimientos)
        this.getEmisor(this.listrequerimientos)
        this.getReceptor(this.listrequerimientos)
        this.getTipo(this.listrequerimientos)
        this.getPlazo(this.listrequerimientos)
        this.getClientes();
      })
    }
    if(this.valormatrizCheck)
    {
      this.usuario  = sessionStorage.getItem('username')!;
      this.empresaReceptor = sessionStorage.getItem('empresa')!;
      
      const parametros =
      {
        empresa: 'valormatriz',
        receptor: this.usuario
      }

      this._requerimientoService.getrequerimientosValorMatriz(parametros).subscribe(data => { // Debo pasarle como parametro la empresa del usuario, este parametro no va de la mano cn la cuenta sino cn el permiso
        this.usuario  = sessionStorage.getItem('username')!;
        for(const item of data)
          {
            if(item.isPrivate) // Si el requerimiento es privado, necesito que cumpla con una de estas dos o no se agrega.
              {
                if(item.emisor == this.usuario) // Chequeo si el usuario es el emisor del requerimiento
                  {
                    item.isEditable = true;
                    this.listrequerimientos.push(item);
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario) // Chequeo si el usuario logeado es un receptor del requerimiento privado
                        {
                          item.isEditable = true;
                          this.listrequerimientos.push(item);
                        }
                    }
                }
              }
            else // Si el requerimiento no es privado solo lo añado a la lista.
            {
              if(item.emisor == this.usuario) // Chequeo si el usuario es el emisor del requerimiento
                  {
                    item.isEditable = true;
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario) // Chequeo si el usuario logeado es un receptor del requerimiento privado
                        {
                          item.isEditable = true;
                        }
                    }
                }

              this.listrequerimientos.push(item);
            }
          }
          this.listrequerimientos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.getEmpresas(this.listrequerimientos)
        this.getEmisor(this.listrequerimientos)
        this.getReceptor(this.listrequerimientos)
        this.getTipo(this.listrequerimientos)
        this.getPlazo(this.listrequerimientos)
        this.getClientes();
      })
    }
    if(this.taoCheck)
    {
      this.usuario  = sessionStorage.getItem('username')!;
      this.empresaReceptor = sessionStorage.getItem('empresa')!;
      
      const parametros =
      {
        empresa: 'tao',
        receptor: this.usuario
      } 

      this._requerimientoService.getrequerimientosTao(parametros).subscribe(data => { // Debo pasarle como parametro la empresa del usuario, este parametro no va de la mano cn la cuenta sino cn el permiso
        this.usuario  = sessionStorage.getItem('username')!;
        for(const item of data)
          {
            if(item.isPrivate) // Si el requerimiento es privado, necesito que cumpla con una de estas dos o no se agrega.
              {
                if(item.emisor == this.usuario) // Chequeo si el usuario es el emisor del requerimiento
                  {
                    item.isEditable = true;
                    this.listrequerimientos.push(item);
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario)
                        {
                          item.isEditable = true;
                          this.listrequerimientos.push(item);
                        }
                    }
                }
              }
            else // Si el requerimiento no es privado solo lo añado a la lista.
            {
              if(item.emisor == this.usuario)
                  {
                    item.isEditable = true;
                  }
                else
                {
                  this.listReceptores = item.receptor.split(",")
                  for(const receptor of this.listReceptores)
                    {
                      if(receptor == this.usuario)
                        {
                          item.isEditable = true;
                        }
                    }
                }

              this.listrequerimientos.push(item);
            }
          }
          this.listrequerimientos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.getEmpresas(this.listrequerimientos)
        this.getEmisor(this.listrequerimientos)
        this.getReceptor(this.listrequerimientos)
        this.getTipo(this.listrequerimientos)
        this.getPlazo(this.listrequerimientos)
        this.getClientes();
      })
    }
  }

getClientes(){

  this._clienteService.getCliente().subscribe(data => {
    this.listClientes = data;
  })

}

getEmpresas(list: Requerimiento[]){


  for(const item of list)
  {
   
    if(this.listaEmpresas.indexOf(item.empresa) < 0)
    {
     
      this.listaEmpresas.push(item.empresa)
    }

  }
  this.listaEmpresas.sort((a,b) => a.localeCompare(b));

}

getEmisor(list: Requerimiento[]){


  for(const item of list)
  {
   
    if(this.listaEmisor.indexOf(item.emisor) < 0)
    {
     
      this.listaEmisor.push(item.emisor)

    }

  }
  this.listaEmisor.sort((a,b) => a.localeCompare(b));
}

getReceptor(list: Requerimiento[])
{

  this._userService.getUsuarios().subscribe(data => {
    this.listaReceptor = data;
  })


}

getTipo(list: Requerimiento[]){


  for(const item of list)
  {
   
    if(this.listaTipo.indexOf(item.tipo) < 0)
    {
     
      this.listaTipo.push(item.tipo)
    }

  }
  this.listaTipo.sort((a,b) => a.localeCompare(b));
}

getPlazo(list: Requerimiento[]){


  for(const item of list)
  {
   
    if(this.listaPlazo.indexOf(item.plazo) < 0)
    {    
      this.listaPlazo.push(item.plazo);  
    }

  }
  this.listaPlazo.sort((a,b) => a - b);
}

  req_add() {
    this.router.navigateByUrl('/req-add');
  }


}
