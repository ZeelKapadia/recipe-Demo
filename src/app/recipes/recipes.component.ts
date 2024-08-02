import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { NotfoundComponent } from '../notfound/notfound.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RecipeListComponent, RecipeDetailComponent, NotfoundComponent, RouterModule]
})
export class RecipesComponent implements OnInit {

  ngOnInit(): void {
  }
}
