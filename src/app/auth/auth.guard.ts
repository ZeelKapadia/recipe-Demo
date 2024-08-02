import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    authService = inject(AuthService);
    router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user
                if (isAuth) {
                    return true;
                }
                else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}