import { CommonModule } from '@angular/common';
import { Component, inject, TrackByFunction } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { switchMap, iif } from 'rxjs';

import { UserFormComponent } from './user-form.component';
import { User } from './user.type';
import { UsersService } from './users.service';

@Component({
  selector: 'crud-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  static title = 'Users';
  #usersService = inject(UsersService);
  #modalService = inject(BsModalService);
  protected users$ = this.#usersService.getAll();

  trackByFn: TrackByFunction<User> = (_, user) => user.id;

  protected openModal(user?: User) {
    const modalRef = this.#modalService.show(UserFormComponent, {
      initialState: { user },
    });

    modalRef.content?.saveUser
      .pipe(
        switchMap((user) =>
          iif(
            () => typeof user.id === 'number',
            this.#usersService.update(user.id as number, user),
            this.#usersService.create(user)
          )
        )
      )
      .subscribe();
  }

  protected remove(user: User) {
    return this.#usersService.remove(user.id).subscribe();
  }
}
