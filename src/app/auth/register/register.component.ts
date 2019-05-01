import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public cargando = false;

  constructor(
    private store: Store<AppState>,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading);
  }

  public onSubmit( data: any ): void {
    this.authService.crearUsuario( data.nombre, data.email, data.password );
  }

}
