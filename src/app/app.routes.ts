import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './Resolver/recipe-resolver.service';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
        children: [
            { path: "", component: NotfoundComponent },
            { path: "new", component: RecipeEditComponent },
            { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolverService] },
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent }
];
