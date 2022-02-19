import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { WelcomeuserComponent } from './welcomeuser/welcomeuser.component';
import { UserpageComponent } from './userpage/userpage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddInterestingsComponent } from './add-interestings/add-interestings.component';
import { PoisComponent } from './pois/pois.component';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { PoisAdminComponent } from './pois-admin/pois-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodoComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    HomeComponent,
    RegisterComponent,
    TermsComponent,
    ListStudentsComponent,
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    UsersPageComponent,
    AdminpageComponent,
    WelcomeuserComponent,
    UserpageComponent,
    UserProfileComponent,
    AddInterestingsComponent,
    PoisComponent,
    ProductCategoryMenuComponent,
    PoisAdminComponent 
   
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
