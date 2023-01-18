import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: NxWelcomeComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
