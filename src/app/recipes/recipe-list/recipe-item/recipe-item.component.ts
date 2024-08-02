import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Recipe } from '../../../modals/recipe.modal';
import { RecipeService } from '../../../services/recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;
  @Input() index: number;

}
