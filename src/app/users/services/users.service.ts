import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user.model';
import { Repo } from './../models/repo.model';
import { Pagination } from './../models/pagination.model';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    public users: User[] = [];
    public repositories: Repo[] = [];
    private usersUpdated = new Subject<any>();
    private reposUpdated = new Subject<any>();

    constructor(
        private http: HttpClient,
    ) { }

    public getUserInfo(id): Observable<User> {
        return this.http.get<User>(`${apiUrl}/user/${id}`);
    }

    public searchUser(page, filter = ''): Observable<Pagination<User>> {
        const queryParams = `?q=user:${filter}&page=${page}`;
        return this.http.get<HttpResponse<Pagination<User>>>(apiUrl + '/search/users' + queryParams, { observe: 'response' })
        .pipe(
            map((response: any) => {
                return  {data: response.body.items, total_count: response.body.total_count};
            }
        )
        );
    }

    public getUpdatedUsers(): Subject<Pagination<User>> {
        return this.usersUpdated;
    }

    public getUserRepositories(username, page) {
       return this.http.get<HttpResponse<Pagination<Repo>>>(`${apiUrl}/search/repositories?q=user:${username}&page=${page}`
       , { observe: 'response' })
            .subscribe((response: any) => {
                this.repositories = response.body.data;
                this.reposUpdated.next({
                    data: response.body.items,
                    total_count: response.body.total_count
                });
            });
    }

    public getUpdatedUserRepositories(): Subject<Pagination<Repo>> {
        return this.reposUpdated;
    }
}
