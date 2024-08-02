import { Injectable, inject } from "@angular/core";
import { Recipe } from "../modals/recipe.modal";
import { Ingredients } from "../modals/ingredient.modal";
import { ShoppingService } from "./shopping.service";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    slService = inject(ShoppingService)

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzel', 'A super-tasty schnitzel - Just awesome!', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
    //         new Ingredients("Meat", 1),
    //         new Ingredients("French Fries", 2),
    //     ]),
    //     new Recipe('Big Fat Burger', 'This is test', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [
    //         new Ingredients("Buns", 2),
    //         new Ingredients("Meat", 1),
    //     ]),
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredient: Ingredients[]) {
        this.slService.addIngredients(ingredient);
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}