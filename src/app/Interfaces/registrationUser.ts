export interface RegistrationUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface UserData {
  firstName: string;
  lastName: string;
  uniqueUserId: string;
}
