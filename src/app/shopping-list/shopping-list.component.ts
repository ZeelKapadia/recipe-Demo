import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredients } from '../modals/ingredient.modal';
import { ShoppingService } from '../services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  imports: [ShoppingEditComponent]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredients[] = [];
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientChanges.subscribe((ingredients: Ingredients[]) => {
      this.ingredients = ingredients
    })
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
