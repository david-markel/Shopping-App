import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemsYouWillLikeComponent } from './components/items-you-will-like/items-you-will-like.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemComponent } from './components/item/item.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { AboutComponent } from './components/about/about.component';
import { SupportComponent } from './components/support/support.component';
import { ContactComponent } from './components/contact/contact.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CommunityComponent } from './components/community/community.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { SkeletonItemComponent } from './components/skeleton-item/skeleton-item.component';
import { SkeletonOrderComponent } from './components/skeleton-order/skeleton-order.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ErrorInterceptor } from './error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    ItemsYouWillLikeComponent,
    FooterComponent,
    ItemComponent,
    CategoryListComponent,
    ItemDetailComponent,
    CategoryPageComponent,
    AboutComponent,
    SupportComponent,
    ContactComponent,
    JobsComponent,
    CommunityComponent,
    OrdersComponent,
    CartComponent,
    BillingFormComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    PasswordDialogComponent,
    OrderDialogComponent,
    SkeletonItemComponent,
    SkeletonOrderComponent,
    ConditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  entryComponents: [OrderDialogComponent],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
