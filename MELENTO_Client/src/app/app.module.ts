import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AdminComponent } from './components/admin/admin.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddAssessmentComponent } from './components/add-assessment/add-assessment.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { ViewAssessmentDetailsComponent } from './components/view-assessment-details/view-assessment-details.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UpdateAssessmentComponent } from './components/update-assessment/update-assessment.component';
import { ViewAssessmentComponent } from './components/view-assessment/view-assessment.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ViewScoreComponent } from './components/view-score/view-score.component';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ViewAttendanceComponent } from './components/view-attendance/view-attendance.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowStartingWordsPipe } from './pipes/show-starting-words.pipe';
import { SearchAssessmentsPipe } from './pipes/search-assessments.pipe';
import { TakeAssessmentComponent } from './components/take-assessment/take-assessment.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ViewChartsComponent } from './components/view-charts/view-charts.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InstructionsDialogBoxComponent } from './components/instructions-dialog-box/instructions-dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AvatarModule, BadgeModule, CollapseModule, DropdownModule, GridModule, NavbarModule, NavModule } from '@coreui/angular';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SidebarModule } from '@coreui/angular';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { HttpRequestInterceptor } from './interceptors/angular_interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent, AboutusComponent, ContactusComponent, AdminComponent, AssessmentsComponent, AddUserComponent, AddCourseComponent, AddCategoryComponent, AddAssessmentComponent, UpdateUserComponent, ViewUserComponent, ViewCourseComponent, ViewCategoryComponent, LoginComponent, UpdateCourseComponent, ViewAssessmentDetailsComponent, UpdateCategoryComponent, UpdateAssessmentComponent, ViewAssessmentComponent,
    CartComponent,
    RegisterComponent,
    DashboardComponent,
    ViewScoreComponent,
    ViewReportComponent,
    ViewAttendanceComponent,
    CurrencyPipe, PageNotFoundComponent, ShowStartingWordsPipe, SearchAssessmentsPipe, TakeAssessmentComponent, ViewChartsComponent, InstructionsDialogBoxComponent, EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatToolbarModule,
    MatOption, MatIcon, MatSelectModule, MatRadioModule, MatDividerModule, HttpClientModule, MatBadgeModule,MatTabsModule,MatCheckboxModule, CanvasJSAngularChartsModule,
    MatTableModule,MatSortModule,MatSlideToggleModule,MatProgressBarModule,MatDialogModule,MatListModule, MatPaginatorModule, DropdownModule, NavbarModule, GridModule, NavModule, CollapseModule, AvatarModule, BadgeModule,SidebarModule,MatSidenavModule,MatIconModule,
    MatListModule,TagModule,CardModule,RatingModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

