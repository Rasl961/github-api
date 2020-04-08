import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Repo } from './../../models/repo.model';
import { UsersService } from '../../services/users.service';
@Component({
    selector: 'app-user-repositories',
    templateUrl: './user-repositories.component.html',
    styleUrls: ['./user-repositories.component.css']
})
export class UserRepositoriesComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    public displayedColumns: string[] = ['name', 'description', 'url', 'forks_count', 'watchers_count'];
    public totalRepos = 0;
    public reposPerPage = 30;
    public currentPage = 1;
    public dataSource: MatTableDataSource<Repo[]>;
    private subscriptions: Subscription[] = [];
    constructor(
        private activatedRoute: ActivatedRoute,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.syncUsers();
    }

    ngAfterViewInit() {
    }

    public onChangedPage(pageData: PageEvent) {
        this.currentPage = pageData.pageIndex + 1;
        this.syncUsers();
    }

    private syncUsers() {
        const username = this.activatedRoute.snapshot.paramMap.get('username');
        this.usersService.getUserRepositories(username, this.currentPage);
        this.subscriptions.push(
            this.usersService.getUpdatedUserRepositories().subscribe((repos) => {
                this.dataSource = new MatTableDataSource<Repo[]>(repos.data);
                this.totalRepos = repos.total_count;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
