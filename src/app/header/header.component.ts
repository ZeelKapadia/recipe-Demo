import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { DropdownDirective } from "../directives/dropdown.directives";
import { RouterLink } from "@angular/router";
import { DataStorageService } from "../services/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: './header.component.html',
    standalone: true,
    imports: [DropdownDirective, RouterLink]
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;

    private usersub: Subscription;
    isAuthenticated = false;

    dataStorageService = inject(DataStorageService);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.usersub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
            console.log(!user);
            console.log(!!user);
        })
    }

    onSaveData() {
        this.dataStorageService.storedRecipes();
    }

    onGetRecipes() {
        this.dataStorageService.fetchedRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout()
    }

    ngOnDestroy(): void {
        this.usersub.unsubscribe();
    }
}