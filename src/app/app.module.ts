import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { StaffComponent } from './views/staff/staff.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AddUserComponent } from './views/add-user/add-user.component';
import { ManageUsersComponent } from './views/manage-users/manage-users.component';
import { AddProductComponent } from './views/add-product/add-product.component';
import { ManageProductsComponent } from './views/manage-products/manage-products.component';
import { AddOrdersComponent } from './views/add-orders/add-orders.component';
import { ListOrdersComponent } from './views/list-orders/list-orders.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ModalUserComponent } from './views/modal-user/modal-user.component';
import { ModalProductComponent } from './views/modal-product/modal-product.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    routingComponents,
    LoginComponent,
    StaffComponent,
    AddUserComponent,
    ManageUsersComponent,
    AddProductComponent,
    ManageProductsComponent,
    AddOrdersComponent,
    ListOrdersComponent,
    ProfileComponent,
    ModalUserComponent,
    ModalProductComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
