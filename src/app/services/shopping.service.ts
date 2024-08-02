import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../modals/ingredient.modal";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ShoppingService {

    ingredientChanges = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredients[] = [
        new Ingredients("apples", 5),
        new Ingredients("Tomatoes", 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients.slice()[index];
    }

    addIngridient(ingredient: Ingredients) {
        this.ingredients.push(ingredient);
        this.ingredientChanges.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredients[]) {
        // for (const ingredient of ingredients) {
        //     this.addIngridient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.ingredientChanges.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredients) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanges.next(this.ingredients.slice())
    }

    deleteIngredients(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanges.next(this.ingredients.slice())
    }
}