import { Action } from '@ngrx/store';

// Create auth action constants
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_TOKEN = 'SET_TOKEN';


export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
  // constructor(public payload: { email: string, password: string }) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

// Export Action class types
export type AuthActions = SignUp | SignIn | SignOut | SetToken;
