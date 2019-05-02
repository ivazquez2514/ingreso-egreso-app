import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription = new Subscription();

  constructor(
    private service: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {
    this.service.borrarIngresoEgreso( item.uid )
      .then(( response: any ) => {
        Swal.fire({
          title: 'Eliminado!',
          text: item.descripcion,
          type: 'success',
          confirmButtonText: 'Ok'
        });
      });
  }

}
