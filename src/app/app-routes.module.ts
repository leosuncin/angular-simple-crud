import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: NxWelcomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
