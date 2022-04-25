import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AddInterestingsComponent } from './add-interestings/add-interestings.component';
import { AddPoiComponent } from './add-poi/add-poi.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MapComponent } from './map/map.component';
import { PoisAdminComponent } from './pois-admin/pois-admin.component';
import { PoisComponent } from './pois/pois.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuardService } from './service/route-guard.service';
import { TermsComponent } from './terms/terms.component';
import { TodoComponent } from './todo/todo.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRecommendationsComponent } from './user-recommendations/user-recommendations.component';
import { UsersPageComponent } from './users-page/users-page.component';


import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeuserComponent } from './welcomeuser/welcomeuser.component';

const routes:Routes=[
  // {path:'',component:LoginComponent},//can activate,RouteGuardService
  {path:'',component:HomeComponent},
  {path:'welcome/:name',component:WelcomeComponent}, //name:parameter
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent,canActivate:[RouteGuardService]},
  {path:'todos/:id',component:TodoComponent,canActivate:[RouteGuardService]},
  {path:'users/:id',component:AddUserComponent},
  {path:'addPoi',component:AddPoiComponent},
  {path:'students',component:ListStudentsComponent,canActivate:[RouteGuardService]},
  {path:'users',component:UserListComponent},
  {path:'update-user/:id',component:UpdateUserComponent},
  {path:'register',component:RegisterComponent},
  {path:'terms',component:TermsComponent}, 
  {path:'adminpage',component:AdminpageComponent}, 
  {path:'userpage',component:UsersPageComponent},
  {path:'userprofile',component:UserProfileComponent},
  {path:'addinteresting',component:AddInterestingsComponent},
  {path:'viewpois',component:PoisComponent},
  {path:'adminviewpois',component:PoisAdminComponent},
  {path:'category/:id',component:PoisComponent},
  {path:'category',component:PoisComponent},
  {path:'addreviews',component:PoisComponent},
  {path:'recommendations',component:UserRecommendationsComponent},
  {path:'map',component:MapComponent},
  {path:'map/:id',component:MapComponent},
  {path:'',redirectTo:'/pois',pathMatch:'full'},
  {path:'**',redirectTo:'/pois',pathMatch:'full'},
  {path:'**',component:ErrorComponent}
];


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
