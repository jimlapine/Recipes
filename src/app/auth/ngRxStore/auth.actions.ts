import { Action } from '@ngrx/store';

// Used for side effect
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
// Create auth action constants
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_TOKEN = 'SET_TOKEN';

// Used by out auth side effects
export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: { username: string, password: string }) {}
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: { username: string, password: string }) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

// Export Action class types
export type AuthActions = SignUp | SignIn | SignOut | SetToken | TrySignUp | TrySignIn;
