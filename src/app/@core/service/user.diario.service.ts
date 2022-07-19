import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import {UserDiario, UserDiarioChangePassword, UserDiarioData} from '../data/user.diario';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserDiarioService extends UserDiarioData {

  private user = new BehaviorSubject({
    name: 'Loading ...',
    imageUrl: '/assets/images/default-user-img.png',
    email: '',
  });

  constructor(private httpClient: HttpClient) {
    super(); }

  getLoggedUser(): Observable<UserDiario> {
    if (this.user.value.name === 'Loading ...')
      this.forceUpdateLoggedUser();
    return this.user;
  }

  update(user: UserDiario): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/authentication/update', user);
  }

  forceUpdateLoggedUser(): void {
    this.httpClient.get<UserDiario>('http://localhost:8080/api/authentication/my-info')
      .subscribe(user => this.user.next(user));
  }

  changePassword(user: UserDiarioChangePassword): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/authentication/change-password', user);
  }
}
