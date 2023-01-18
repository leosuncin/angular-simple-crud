import { Component, inject, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { User } from './user.type';

@Component({
  selector: 'crud-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  static title = 'Users';
  #usersService = inject(UsersService);
  protected users$ = this.#usersService.getAll();

  trackByFn: TrackByFunction<User> = (_, user) => user.id;
}
