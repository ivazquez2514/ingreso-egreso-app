import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
  items: []
};

export interface AppState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

export function ingresoEgresoReducer( state = estadoInicial, action: fromIngresoEgresoActions.acciones ): IngresoEgresoState {

  switch ( action.type ) {

    case fromIngresoEgresoActions.SET_ITEMS:
      return {
        items: [ ...action.items.map( item => ({ ...item })) ]
      };

    case fromIngresoEgresoActions.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;

  }

}
