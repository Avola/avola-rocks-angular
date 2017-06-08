import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolicyNumberComponent } from './components/policy-number/policy-number.component';
import { TravelInformationComponent } from './components/travel-information/travel-information.component';
import { IncidentInformationComponent } from './components/incident-information/incident-information.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { ObjectSelectionComponent } from './components/object-selection/object-selection.component';
import { ObjectDetailsComponent } from './components/object-details/object-details.component';
import { ObjectCompensationDetailsComponent } from './components/object-compensation-details/object-compensation-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { ObjectAccordionComponent } from './components/object-accordion/object-accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    PolicyNumberComponent,
    TravelInformationComponent,
    IncidentInformationComponent,
    LoginComponent,
    ObjectSelectionComponent,
    ObjectDetailsComponent,
    ObjectCompensationDetailsComponent,
    AdminComponent,
    ObjectAccordionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'policy-number',
        component: PolicyNumberComponent
      },
      {
        path: 'travel-info',
        component: TravelInformationComponent
      },
      {
        path: 'incident-info',
        component: IncidentInformationComponent
      },
      {
        path: 'object-selection',
        component: ObjectSelectionComponent
      },
      {
        path: 'object-details',
        component: ObjectDetailsComponent
      },
      {
        path: 'object-compensation-details',
        component: ObjectCompensationDetailsComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
