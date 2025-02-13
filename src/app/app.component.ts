import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationStart } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { bootstrapApplication } from '@angular/platform-browser';

import { SessionService } from './services/session.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, RouterLink, RouterLinkActive, HeaderComponent, FooterComponent, CommonModule, HttpClientModule, FormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './dist/css/adminlte.min.css',
  
})



export class AppComponent {
  title = 'hgt-frontend';

  showHead: boolean = this._sesionServices.islogin();//this._sesionServices.islogin()

  ngOnInit() {
  }

  constructor(private router: Router, private _sesionServices: SessionService) 
  {
   

    // on route change to '/login', set the variable showHead to false
    this._sesionServices.user$.subscribe(data => {    
      if(data)
        {
         
          this.showHead = true
          // Aca seteo las seasson a partir de las local
          this.router.navigateByUrl('/home');
          
        }
      else
      {
        this.showHead = false
        // Como no existe el token local, vuelvo al login y, este sabra si crea el local o pasa directo con el seasson
        this.router.navigateByUrl('/login');
      }

    })


      /*router.events.forEach((event) => { // Es probable que fuerzo la llamada de login al iniciar pero no es un /login como tal por eso tngo que recargar con f5 para q se esconda
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' ) {
            this.showHead = false;
          } else {
            // 
            this.showHead = true;
          }
        }
      });*/

    }


    
}


