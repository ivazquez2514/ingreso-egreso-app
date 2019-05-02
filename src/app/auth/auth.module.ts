import { NgModule } from '@angular/core';

// Modulos
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule
  ]
})
export class AuthModule {}
