import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../../modals/recipe.modal';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent]
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // Inject Variables
  recipeService = inject(RecipeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // Normal Variable
  recipes: Recipe[] = [];
  subcription: Subscription;

  ngOnInit(): void {
    this.subcription = this.recipeService.recipesChanged.subscribe((recipe: Recipe[]) => {
      this.recipes = recipe
    })
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
