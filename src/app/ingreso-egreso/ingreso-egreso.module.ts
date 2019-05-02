import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';

// Pipes
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';

// Gráficas
import { ChartsModule } from 'ng2-charts';

// Modulos personalizados
import { SharedModule } from '../shared/shared.module';

// Rutas hijas
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
