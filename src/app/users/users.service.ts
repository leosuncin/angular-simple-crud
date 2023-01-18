import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, FindByParams } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #http = inject(HttpClient);
  #apiUrl = 'https://jsonplaceholder.typicode.com';

  getAll(params?: FindByParams): Observable<Array<User>> {
    return this.#http.get<Array<User>>(`${this.#apiUrl}/users`, { params });
  }

  create(user: Partial<User>) {
    return this.#http.post<User>(`${this.#apiUrl}/users`, user);
  }

  update(id: User['id'], user: Partial<User>) {
    return this.#http.patch<User>(`${this.#apiUrl}/users/${id}`, user);
  }

  remove(id: User['id']) {
    return this.#http.delete(`${this.#apiUrl}/users/${id}`);
  }
}
