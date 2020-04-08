import { UserRepositoriesComponent } from './components/user-repositories/user-repositories.component';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    UserListComponent,
    UserInfoComponent,
    UserRepositoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    UserListComponent,
    UserInfoComponent,
    UserRepositoriesComponent
  ],
  providers: [],
})
export class UsersModule { }
