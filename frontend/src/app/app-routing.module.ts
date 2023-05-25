import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { AboutComponent } from './components/about/about.component';
import { SupportComponent } from './components/support/support.component';
import { ContactComponent } from './components/contact/contact.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CommunityComponent } from './components/community/community.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/movies', pathMatch: 'full' },
  { path: 'category/:category', component: CategoryPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'support', component: SupportComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
