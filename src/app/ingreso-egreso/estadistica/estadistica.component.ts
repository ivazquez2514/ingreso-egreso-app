import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  numeroDeIngresos: number;
  numeroDeEgresos: number;
  subscription = new Subscription();

  public doughnutChartLabels: Label[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: MultiDataSet = [
    [350, 450],
    [50, 150],
    [250, 130],
  ];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso => {
        this.contarIngresoEgreso( ingresoEgreso.items );
      });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;
    this.numeroDeIngresos = 0;
    this.numeroDeEgresos = 0;

    items.forEach( item => {

      if ( item.tipo === 'ingreso' ) {
        this.ingresos += item.monto;
        this.numeroDeIngresos++;
      } else {
        this.egresos += item.monto;
        this.numeroDeEgresos++;
      }

    });

    this.doughnutChartData = [ [ this.ingresos, this.egresos] ];

  }

}
