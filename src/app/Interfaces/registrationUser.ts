export interface RegistrationUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface UserData {
  displayName: string;
  photoUrl?: string;
  idToken: string;
  returnSecureToken?: boolean;
}
