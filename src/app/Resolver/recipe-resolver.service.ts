import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../modals/recipe.modal";
import { DataStorageService } from "../services/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "../services/recipe.service";

@Injectable({
    providedIn: "root"
})
export class RecipeResolverService implements Resolve<Recipe[]> {
    dataStorageService = inject(DataStorageService);
    recipesService = inject(RecipeService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageService.fetchedRecipes();
        }
        else {
            return recipes;
        }
    }
}   