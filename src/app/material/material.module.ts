import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
