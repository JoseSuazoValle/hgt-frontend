import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { CalendarOptions, EventInput } from '@fullcalendar/core';

import { faSquare  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import {MatTooltipModule} from '@angular/material/tooltip';
import { Eventocalendario } from '../../interfaces/eventocalendario';
import { EventocalendarioService } from '../../services/eventocalendario.service';
import { Permiso } from '../../interfaces/permiso';
import { PermisosServices } from '../../services/permisos.service';
import { UserService } from '../../services/user.service';
import { Notificacion } from '../../interfaces/notificacion';
import { NotificationService } from '../../services/notification.service';

import * as Tooltip from 'tooltip';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FormsModule, CommonModule,FullCalendarModule, FontAwesomeModule],
  templateUrl: './calendario.component.html',
  styleUrls: 
  [
  ] 
})


export class CalendarioComponent {
  faSquare = faSquare;

  toolTip: MatTooltipModule;
  colorEvent: string = "#007bff";
  empresa: string | null = "";
  tituloEvento: string = "";
  descriptionEvento: string = "";
  diaInicio: string = "";
  horaInicio: string = ""
  checkEnd: boolean = false; // Verifica si esta activo para captura diaFin, horaFin. este mismo almaceno en base de datos para que valide que tipo de evento crear al cargarlos.
  diaFin: string = "";
  horaFin: string = "";
  isGlobal: boolean = false;

  listUsuarios: string[] = []

  globalCheck: boolean = false;
  calendarOptions: CalendarOptions = {}

  administradorCheck: boolean = false; // administrador va siempre en todo como true
  gestionarCheck: boolean = false; // Es para ver si el menu gestionar es desplegable o no
  gerenciaCheck: boolean = false; // Este mmm deberia ser para visualizar todos los requerimientos, no para algo en el menu
  aycCheck: boolean = false;
  valormatrizCheck: boolean = false;
  taoCheck: boolean = false;
  usuario: string | null = ""

  nombreUsuario: string | null = '';
  foto: string | null = 'asd'

  eventList: any[] = [
]

  constructor( private toastr: ToastrService, private router: Router, private _eventoCalendarioService: EventocalendarioService,private _permisoService: PermisosServices,
     private _userService: UserService, private _notificacionService: NotificationService)
  {
    if(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
      this.router.navigateByUrl('/login');

    this.calendarEvents();
  
    this.usuario  = sessionStorage.getItem('username')!;

    this.getPermisos(this.usuario);
  }

  ValidatePermisos()
  {
    if(this.administradorCheck || this.gerenciaCheck)
    {
        this.globalCheck = true;
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
          this.getEvents();
      })
  }

  getEvents()
  {
    if(this.administradorCheck || this.gerenciaCheck)
      {

          this._eventoCalendarioService.getEvent().subscribe(data => {
            for(const item of data)
              {
                this.setEvents(item)
              }
          })
      }

    if(this.aycCheck)
      {
        this._eventoCalendarioService.getEventEmpresa("ayc").subscribe(data => {
          for(const item of data)
            {
              this.setEvents(item)
            }

        })
      }

    if(this.taoCheck)
      {
        this._eventoCalendarioService.getEventEmpresa("tao").subscribe(data => {

          for(const item of data)
            {
              this.setEvents(item)
            }

        })

      }
    if(this.valormatrizCheck)
      {
        this._eventoCalendarioService.getEventEmpresa("valormatriz").subscribe(data => {

          for(const item of data)
            {
              this.setEvents(item)
            }

        })

      }
  }

  setEvents(event: Eventocalendario)
  {
    let addEvent = {};
    if(event.checkFin)
      {
        let dateInicio: string = (event.fechaInicio +"T"+  event.horaInicio)
        const datetimeInicio = new Date(dateInicio);
        let dateFin: string = (event.fechaFin +"T"+  event.horaFin)
        const datetimeFin = new Date(dateFin);   
        addEvent = 
        {
          id: event.id,
          title: event.titulo,
          start: datetimeInicio,
          end: datetimeFin,
          backgroundColor: event.background,
          usuario: event.usuario,
          description: event.description
        }       
        this.eventList.push(addEvent)
        this.calendarEvents();
      }
      else
      {
        let dateTime: string = (event.fechaInicio +"T"+  event.horaInicio)
        const datetimeInicio = new Date(dateTime);
        addEvent = 
        {
          id: event.id,
          title: event.titulo,
          start: datetimeInicio,
          backgroundColor: event.background,
          usuario: event.usuario,
          description: event.description
        }

        this.eventList.push(addEvent)
        this.calendarEvents();
      }

  }

  calendarEvents()
  {   

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: esLocale,
/*       dateClick: (arg) => this.handleDateClick(arg), Esta me dejaba añadir un evento al clickear en un cuadrado de la fecha, es el evento al clickear una fecha*/
      eventClick: (crg) => this.handleEventClick(crg.event.id),//crg.event.id
      eventMouseEnter: (mouseEnterInfo ) => this.eventMouseOver(mouseEnterInfo),
      editable: true,
      events: this.eventList
    };

  }


  eventMouseOver(mouseEnterInfo: any ) {
    this.toastr.info(mouseEnterInfo.event.extendedProps.description, mouseEnterInfo.event.title)  
}


  setColorEvent(color: string)
  {
    this.colorEvent = color;
  }
  
  eventsPromise: Promise<EventInput[]>;


  handleEventClick(crg)
  {

    this._eventoCalendarioService.getEventID(crg).subscribe((data: Eventocalendario) => {

    if(this.usuario == data.usuario)
    {
      if(window.confirm("Estas seguro que quieres borrar el evento?"))
        {
          let i = 0;
          for(i = 0 ; i < this.eventList.length; i++)
            {
              if(this.eventList[i].id == crg)
                {
                  this._eventoCalendarioService.deleteEvent(this.eventList[i].id).subscribe(() => {
                    this.calendarEvents();
                    this.toastr.success('Se elimino un evento.', 'Exito')    
                  })
                  this.eventList.splice(i, 1);
                }
            }
        }
    }
    else
    {
      this.toastr.warning('Solo el creador puede eliminar el evento.', 'Fallo')    
      return;
    }
    })


  }

public events: any[];
public options: any;



addEvent()
{
  if(this.tituloEvento == "")
    {
      this.toastr.error('Debe ingresar titulo.', 'Error')
      return;
    }
  
    let addEvent = {};
    if(this.checkEnd)
      {
        if(this.diaInicio == "" || this.horaInicio == "")
          {
            this.toastr.error('Debe ingresar fecha y hora inicio.', 'Error')
            return;
          }
          if(this.diaFin == "" || this.horaFin == "")
            {
              this.toastr.error('Debe ingresar fecha y hora fin.', 'Error')
              return;
            }

        this.empresa  = sessionStorage.getItem('empresa')!;
        this.usuario  = sessionStorage.getItem('username')!;
        const event: Eventocalendario = 
        {
          id: 0, // Este id debe retornar el subscribe
          empresa: this.empresa,
          titulo: this.tituloEvento,
          fechaInicio: this.diaInicio,
          horaInicio: this.horaInicio,
          checkFin: this.checkEnd,
          fechaFin: this.diaFin,
          horaFin: this.horaFin,
          background: this.colorEvent,
          isGlobal: this.isGlobal,
          usuario: this.usuario,
          description: this.descriptionEvento
        }
        this._eventoCalendarioService.postEvent(event).subscribe((data) => 
          {
            let dateInicio: string = (this.diaInicio +"T"+  this.horaInicio)
            const datetimeInicio = new Date(dateInicio);
            let dateFin: string = (this.diaFin +"T"+  this.horaFin)
            const datetimeFin = new Date(dateFin);   
            addEvent = 
            {
              id: data.id,
              title: this.tituloEvento,
              start: datetimeInicio,
              end: datetimeFin,
              backgroundColor: this.colorEvent,
              description: this.descriptionEvento
            }
              
            this.eventList.push(addEvent)
            this.calendarEvents();
            this.toastr.success('Se ingreso un evento.', 'Exito')
          })
      }
      else
      {
        if(this.diaInicio == "" || this.horaInicio == "")
          {
            this.toastr.error('Debe ingresar fecha y hora.', 'Error')
            return;
          }
          this.empresa  = sessionStorage.getItem('empresa')!;
          this.usuario  = sessionStorage.getItem('username')!;
          const event: Eventocalendario = 
          {
            id: 0, // Este id debe retornar el subscribe
            empresa: this.empresa,
            titulo: this.tituloEvento,
            fechaInicio: this.diaInicio,
            horaInicio: this.horaInicio,
            checkFin: this.checkEnd,
            fechaFin: "",
            horaFin: "",
            background: this.colorEvent,
            isGlobal: this.isGlobal,
            usuario: this.usuario,
            description: this.descriptionEvento
          }
          this._eventoCalendarioService.postEvent(event).subscribe((data) => 
            {
              let dateTime: string = (this.diaInicio +"T"+  this.horaInicio)
              const datetimeInicio = new Date(dateTime);
              addEvent = 
              {
                id: data.id,
                title: this.tituloEvento,
                start: datetimeInicio,
                backgroundColor: this.colorEvent, 
                description: this.descriptionEvento
              }

              this.eventList.push(addEvent)
              this.calendarEvents();
              this.toastr.success('Se ingreso un evento.', 'Exito')
            })
      }
      this.nombreUsuario = sessionStorage.getItem('nombreUsuario')!;
      this.foto = sessionStorage.getItem('foto')!;
      if(this.isGlobal)
      {
        this._userService.getUsuarios().subscribe(data => {
          for(const item of data)
            {
              if(this.listUsuarios.indexOf(item.usuario) < 0)
                {
                  this.listUsuarios.push(item.usuario)
                }
            }
            for(const item of this.listUsuarios) // Pero mi listUsuarios, tiene que tener a todos los usuarios del sistema para que se les notifique a todos.
            {
              const notificacion: Notificacion = 
              {
                id: 0,
                usuarioReceptor: item,
                nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
                encabezado: "Se a creado un nuevo evento en el calendario.",
                createdAt: "", // Tengo que cambiar este
                hora: new Date().toString().split(' ')[4],
                idRequerimiento: 0, // El 0 indicara que es calendario porque ningun requerimiento puede tener el id 0, ya que parten desde el 1
                isChecked: true,
                foto: this.foto 
              }
              this._notificacionService.postNotificacion(notificacion).subscribe(() => {
              })
            }
        })
      }
      else
      {
        for(const item of this.listUsuarios)
          {
            const notificacion: Notificacion = 
            {
              id: 0,
              usuarioReceptor: item,
              nombreNotificante: this.nombreUsuario, // Aca tengo que poder extraer el nombre
              encabezado: "Se a creado un nuevo evento en el calendario.",
              createdAt: "", // Tengo que cambiar este
              hora: new Date().toString().split(' ')[4],
              idRequerimiento: 0, // El 0 indicara que es calendario porque ningun requerimiento puede tener el id 0, ya que parten desde el 1
              isChecked: true,
              foto: this.foto 
            }
    
            this._notificacionService.postNotificacion(notificacion).subscribe(() => {
    
            })
          }
      }
/*       this.tituloEvento = '';
      this.descriptionEvento = ''; */
/*       this.diaInicio = ''
      this.horaInicio = ''
      this.diaFin = ''
      this.horaFin = '' */
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



}
