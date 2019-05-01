import * as fromUI from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
}

export function uiReducer( state = initState, actions: fromUI.acciones ): State {

  switch ( actions.type ) {

    case fromUI.ACTIVAR_LOADING:
      return {
        isLoading: true
      };

    case fromUI.DESACTIVAR_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;

  }

}
