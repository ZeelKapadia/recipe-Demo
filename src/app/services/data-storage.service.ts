import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../modals/recipe.modal";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class DataStorageService {

    url = "https://recipe-book-zeel-default-rtdb.firebaseio.com/";
    http = inject(HttpClient);
    recipeService = inject(RecipeService);
    authService = inject(AuthService);

    storedRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.url + "recipes.json", recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchedRecipes() {
        // exhaustMap will wait till your first subscribe gets value and then subscribes to another one

        return this.http.get<Recipe[]>(this.url + "recipes.json"
        ).pipe(map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes)
            })
        );


        // return this.http.get<Recipe[]>(this.url + "recipes.json").pipe(map(recipes => {
        //     return recipes.map(recipe => {
        //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        //     })
        // }),
        //     tap(recipes => {
        //         this.recipeService.setRecipes(recipes)
        //     })
        // );
    }
}