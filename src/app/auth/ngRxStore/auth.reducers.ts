import * as AuthActions from './auth.actions';

// Create a Auth Interface
export interface State {
  token: string;
  isAuthenticated: boolean;
}

// Create an intial state
const initialState: State = {
  token: null,
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    // since both cases uses the same code, we can use the switch fall-through belove when both cases use same logic
    case AuthActions.SIGN_IN:
    case AuthActions.SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}
