import { SnackbarComponent } from './snackbar/snackbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SnackbarComponent
  ],
  entryComponents: [SnackbarComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}]
})
export class SharedModule { }
