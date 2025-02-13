import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from '../../interfaces/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  faBusinessTime = faBusinessTime;

  nombre: string = "";
  rut: string = "";
  cliente: string = "";
  usuario: string | null = '';
  listClientes: Cliente[] = []

  administradorCheck: boolean = false; 

  constructor(private router: Router, private _clienteService: ClienteService, private toastr: ToastrService, private _permisoService: PermisosServices) 
  {
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');
  
    this.getClientes();
    this.usuario  = sessionStorage.getItem('username')!;
    this.getPermisos(this.usuario);
  }
  
  onSelectedCliente(value: string)
  {
    this.cliente = value
  }

getPermisos(user: string)
{
  if(user != "Elige un usuario...")
    {
      this._permisoService.getPermisos(user).subscribe((data: Permiso) => {
        this.administradorCheck = data.administrador;

    })
    }

}


deleteClientes()
{
  this._clienteService.deleteCliente(parseInt(this.cliente)).subscribe(() => {
    this.getClientes();
    this.toastr.success('El cliente fue eliminado.', 'Exito')
    //this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
  })
}

  getClientes(){

    this._clienteService.getCliente().subscribe(data => {
  
      this.listClientes = data;
  
    })
  }
  
  addClientes() {

    // validamos que el usuario ingrese valores

    if(this.nombre == "" || this.rut == ""){
      //this.toastr.error("Error", "Todos los campos son obligatorios");
      this.toastr.error("Todos los campos deben ser rellenados.", "Error");

      return;
    }
    // Validamos contraseñas<

    // Creamos el objeto

    const cliente: Cliente = {
      id: 0,
      nombre: this.nombre,
      rut: this.rut,

    }

    this._clienteService.register(cliente).subscribe({

      next: (v) => {
        this.toastr.success("El cliente fue registrado.", "Exito"); 
      },
      error: (event: HttpErrorResponse) => {
        this.msjErrror(event)
      }
        
    });
    
    this.nombre = "";
    this.rut = "";
  
    this.getClientes();
  }

  msjErrror(e:HttpErrorResponse) {
    if(e.error.msg){
      this.toastr.error(e.error.msg, "Error");
    }else{
      this.toastr.error("Comuniquese con el administrador.", "Error");
    }
  }
  
}
