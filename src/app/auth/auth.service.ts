import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./auth/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
    // user = new Subject<User>();
    // used to emit the data on change occured
    user = new BehaviorSubject<User>(null);

    http = inject(HttpClient)
    router = inject(Router)

    private tokenExpirationTimer: any;

    baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:"
    apiKey = "AIzaSyB4hsYarVVh1TF2nPC4Q99bRGgT5f3BjuQ"

    signupUrl = this.baseUrl + "signUp?key=" + this.apiKey
    signInUrl = this.baseUrl + "signInWithPassword?key=" + this.apiKey


    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signupUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        )
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signInUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
            })
        )
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }


    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An Unknown error occurred!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email exists already";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email doesn't exits";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "This password is not Correct";
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
    }
}



// Refer the below URL for the authentication using the firebase
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

// For loader
// https://loading.io/css/