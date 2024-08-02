import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Ingredients } from '../../modals/ingredient.modal';
import { ShoppingService } from '../../services/shopping.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm

  slService = inject(ShoppingService);
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(index => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.slService.addIngridient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
