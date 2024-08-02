import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../../modals/recipe.modal';
import { DropdownDirective } from "../../directives/dropdown.directives";
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  recipeService = inject(RecipeService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  id: number;
  ngOnInit(): void {
    // works only once but not when the id has been changed
    // this.activatedRoute.snapshot.params["id"];
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToSoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute })
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
