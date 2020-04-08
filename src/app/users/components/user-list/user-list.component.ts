import { debounceTime, switchMap, shareReplay, map } from 'rxjs/operators';
import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';

import { User } from './../../models/user.model';
import { Pagination } from './../../models/pagination.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('searchUser', { static: true }) searchUserInput: ElementRef;

    public displayedColumns: string[] = ['id', 'username', 'view'];
    public totalUsers = 0;
    public usersPerPage = 30;
    public currentPage = 1;
    public dataSource: MatTableDataSource<Pagination<User[]>>;
    private subscriptions: Subscription[] = [];
    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.paginator.hidePageSize = true;
        this.searchUser();
    }

    public onChangedPage(pageData: PageEvent) {
        if (this.searchUserInput.nativeElement.value) {
            this.currentPage = pageData.pageIndex + 1;
            this.subscriptions.push(
            this.usersService.searchUser(this.currentPage,
                this.searchUserInput.nativeElement.value)
                .subscribe()
            );
        }
    }

    public searchUser() {
        this.subscriptions.push(
            fromEvent(this.searchUserInput.nativeElement, 'input')
                .pipe(
                    debounceTime(500),
                    switchMap((term: Event) => {
                        this.currentPage = 1;
                        this.paginator.pageIndex = 0;
                        return this.usersService.searchUser(this.currentPage,
                            (term.target as HTMLInputElement).value);
                    }),
                    shareReplay(1)
                ).subscribe((result: Pagination<User>) => {
                    this.dataSource = new MatTableDataSource<Pagination<User>>(result.data);
                    this.totalUsers = result.total_count;
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
