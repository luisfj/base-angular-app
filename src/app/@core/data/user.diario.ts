import { Observable } from 'rxjs';

export interface UserDiario {
  email: string;
  name: string;
  imageUrl: string;
}

export interface UserDiarioChangePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export abstract class UserDiarioData {
  abstract getLoggedUser(): Observable<any>;
  abstract forceUpdateLoggedUser(): void;
  abstract update(user: UserDiario): Observable<any>;
  abstract changePassword(user: UserDiarioChangePassword): Observable<any>;
}
