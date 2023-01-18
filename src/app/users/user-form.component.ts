import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { User } from './user.type';

function buildUserForm() {
  const formBuilder = inject(FormBuilder);

  return formBuilder.nonNullable.group({
    id: undefined as undefined | number,
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: formBuilder.nonNullable.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      geo: formBuilder.nonNullable.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
    }),
    phone: ['', [Validators.required, Validators.pattern(/\d{4}-\d{4}/)]],
    website: ['', Validators.required],
    company: formBuilder.nonNullable.group({
      name: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required],
    }),
  });
}

@Component({
  selector: 'crud-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  protected userForm = buildUserForm();
  protected modalRef = inject(BsModalRef);
  protected editing = false;

  @Input() set user(user: User | undefined) {
    if (user) {
      this.userForm.patchValue(user);
      this.editing = true;
    }
  }
  @Output() saveUser = new EventEmitter<Partial<User>>();

  protected isInvalid(field: string) {
    const control = this.userForm?.get(field);

    if (!control) return false;

    const { invalid, dirty, touched } = control;

    return invalid && (dirty || touched);
  }

  protected getError(field: string) {
    const control = this.userForm.get(field);

    if (!control || !control.errors) return null;
    const { errors } = control;

    if ('required' in errors) {
      return `The ${field} is required`;
    }
    if ('pattern' in errors) {
      return `The ${field} is not valid`;
    }
    if ('email' in errors) {
      return `The ${field} is not a valid email`;
    }

    return null;
  }

  protected submitUser() {
    this.saveUser.emit(this.userForm.getRawValue());
    this.modalRef.hide();
  }
}
