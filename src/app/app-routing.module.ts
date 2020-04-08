import { UserRepositoriesComponent } from './users/components/user-repositories/user-repositories.component';
import { UserInfoComponent } from './users/components/user-info/user-info.component';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-info/:id',
    component: UserInfoComponent
  },
  {
    path: 'user-respositores/:username',
    component: UserRepositoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
