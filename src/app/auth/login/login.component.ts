import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public cargando = false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading );
  }

  public onSubmit( data: any ): void {
    this.authService.login( data.email, data.password );
  }

}
