import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './components/category-page/category-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/movies', pathMatch: 'full' },
  { path: 'category/:category', component: CategoryPageComponent },
  // Other routes go here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
