import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { inspect } from '@rxjs-insights/devtools';
import { BsModalService } from 'ngx-bootstrap/modal';
import { switchMap, iif } from 'rxjs';

import { UserFormComponent } from './user-form.component';
import { User } from './user.type';
import { UsersService } from './users.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
})
export default class UsersComponent implements OnInit {
  static title = 'Users';
  #usersService = inject(UsersService);
  #modalService = inject(BsModalService);
  protected users$ = this.#usersService.users$;

  ngOnInit() {
    this.#usersService.getAll().subscribe();
  }

  trackByFn: TrackByFunction<User> = (_, user) => user.id;

  protected openModal(user?: User) {
    const modalRef = this.#modalService.show(UserFormComponent, {
      initialState: { user },
    });

    modalRef.content?.saveUser
      .pipe(
        inspect,
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
