import { Observable, Subscription } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
    public user$: Observable<any>;
    private id: string;
    private subscriptions: Subscription[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private usersService: UsersService) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.user$ = this.usersService.getUserInfo(this.id);
    }

    public navigateToRepo() {
      this.subscriptions.push(
        this.usersService.getUserInfo(this.id)
        .subscribe((user) => {
            this.router.navigate(['/user-respositores', user.login]);
        })
      );
    }
    ngOnDestroy() {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
