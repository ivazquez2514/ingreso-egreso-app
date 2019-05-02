import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo = 'ingreso';
  loadingSubs = new Subscription();
  cargando = false;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>
  ) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading);

    this.form = new FormGroup({
      descripcion: new FormControl( '', Validators.required ),
      monto: new FormControl( 0, Validators.min(1) ),
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivarLoadingAction() );

    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, tipo: this.tipo });

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.store.dispatch( new DesactivarLoadingAction() );
        this.form.reset({ monto: 0 });
        Swal.fire({
          title: 'Item creado!',
          text: ingresoEgreso.descripcion,
          type: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch( e => {
        this.store.dispatch( new DesactivarLoadingAction() );
        console.error(e);
      });
  }

}
