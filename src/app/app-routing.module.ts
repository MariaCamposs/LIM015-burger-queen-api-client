import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AddUserComponent } from './views/add-user/add-user.component';
import { ManageUsersComponent } from './views/manage-users/manage-users.component';
import { AddProductComponent } from './views/add-product/add-product.component';
import { ManageProductsComponent } from './views/manage-products/manage-products.component';
import { AddOrdersComponent } from './views/add-orders/add-orders.component';
import { ListOrdersComponent } from './views/list-orders/list-orders.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthGuard } from './services/auth/auth.guard'
import { StaffComponent } from './views/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'staff', canActivate: [AuthGuard], component: StaffComponent },
  { path: 'adduser', canActivate: [AuthGuard], component: AddUserComponent },
  { path: 'manageusers', canActivate: [AuthGuard], component: ManageUsersComponent },
  { path: 'addproduct', canActivate: [AuthGuard], component: AddProductComponent },
  { path: 'manageproducts', canActivate: [AuthGuard], component: ManageProductsComponent },
  { path: 'addorders', canActivate: [AuthGuard], component: AddOrdersComponent },
  { path: 'listorders', canActivate: [AuthGuard], component: ListOrdersComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, StaffComponent, AddUserComponent,
ManageUsersComponent, AddProductComponent, ManageProductsComponent, AddOrdersComponent, ListOrdersComponent, ProfileComponent]
