import { Observable } from 'rxjs';

export interface UserDiario {
  email: string;
  name: string;
  picture: string;
}

export abstract class UserDiarioData {
  abstract getLoggedUser(): Observable<UserDiario>;
}
