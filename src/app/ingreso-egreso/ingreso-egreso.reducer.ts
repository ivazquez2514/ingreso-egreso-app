import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
  items: []
};

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
