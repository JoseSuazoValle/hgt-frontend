import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { RequerimientoAddComponent } from './components/requerimiento-add/requerimiento-add.component';
import { RequerimientoUpdateComponent } from './components/requerimiento-update/requerimiento-update.component';
import { RequerimientoViewComponent } from './components/requerimiento-view/requerimiento-view.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ClientesComponent } from './components/clientes/clientes.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'calendario', component: CalendarioComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'permisos', component: PermisosComponent},
    {path: 'req-add', component: RequerimientoAddComponent},
    {path: 'req-upd/:id', component: RequerimientoUpdateComponent},
    {path: 'req-view/:id', component: RequerimientoViewComponent },
    {path: 'home', component: RequerimientosComponent},

    {path: '**', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes), RouterModule, HttpClientModule, ToastrModule.forRoot(),],
    exports: [RouterModule]
    }
)

export class appRoutingModule{}