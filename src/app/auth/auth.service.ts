import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    //create a new user
    registerUser(user: User) {
        this.httpClient.post(environment.apiUrl + '/user/register', user)
            .subscribe(() => {
                this.router.navigate(['']);
            }, (err) => {
                console.log(err);
            });
    }

    //login
    loginUser(email: string, password: string) {
        this.httpClient.post(environment.apiUrl + '/user/login', {email, password})
            .subscribe(() => {
                this.router.navigate(['']);
            }, (err) => {
                console.log(err);
            });
    }
}