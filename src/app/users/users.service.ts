import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { inspect } from '@rxjs-insights/devtools';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { User, FindByParams } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #http = inject(HttpClient);
  #apiUrl = 'https://jsonplaceholder.typicode.com';
  #users$ = new BehaviorSubject<Array<User>>([]);
  users$ = this.#users$.asObservable().pipe(inspect);

  getAll(params?: FindByParams): Observable<Array<User>> {
    return this.#http
      .get<Array<User>>(`${this.#apiUrl}/users`, { params })
      .pipe(tap((users) => this.#users$.next(users)));
  }

  create(user: Partial<User>) {
    return this.#http
      .post<User>(`${this.#apiUrl}/users`, user)
      .pipe(
        tap((user) => this.#users$.next([...this.#users$.getValue(), user]))
      );
  }

  update(id: User['id'], user: Partial<User>) {
    return this.#http
      .patch<User>(`${this.#apiUrl}/users/${id}`, user)
      .pipe(
        tap((user) =>
          this.#users$.next(
            this.#users$
              .getValue()
              .map((_user) => (_user.id === user.id ? user : _user))
          )
        )
      );
  }

  remove(id: User['id']) {
    return this.#http
      .delete(`${this.#apiUrl}/users/${id}`)
      .pipe(
        tap(() =>
          this.#users$.next(
            this.#users$.getValue().filter((user) => user.id !== id)
          )
        )
      );
  }
}
