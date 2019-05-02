import { NgModule } from '@angular/core';

// Modulos
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
