import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/adminguard';
import { CartComponent } from './components/cart/cart.component';
import { ViewAssessmentDetailsComponent } from './components/view-assessment-details/view-assessment-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TakeAssessmentComponent } from './components/take-assessment/take-assessment.component';
import { ViewChartsComponent } from './components/view-charts/view-charts.component';
import { LoginGuard } from './guards/loginguard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"dashboard",component:DashboardComponent, canActivate:[LoginGuard()]},
  {path:"aboutus",component:AboutusComponent},
  {path:"admin",component:AdminComponent, canActivate:[LoginGuard,AdminGuard()]},
  {path:"assessments",component:AssessmentsComponent},
  {path:"home",component:HomeComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"cart",component:CartComponent,canActivate:[LoginGuard()]},
  {path:"viewassessmentdetails/:id",component:ViewAssessmentDetailsComponent},
  {path:"takeassessment/:id",component:TakeAssessmentComponent},
  {path:"viewcharts/:id",component:ViewChartsComponent,canActivate:[LoginGuard()]},
  {path:"editprofile",component:EditProfileComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
