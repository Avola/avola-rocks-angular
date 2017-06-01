import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolicyNumberComponent } from './components/policy-number/policy-number.component';
import { TravelInformationComponent } from './components/travel-information/travel-information.component';
import { IncidentInformationComponent } from './components/incident-information/incident-information.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PolicyNumberComponent,
    TravelInformationComponent,
    IncidentInformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: PolicyNumberComponent
      },
      {
        path: 'travel-info',
        component: TravelInformationComponent
      },
      {
        path: 'incident-info',
        component: IncidentInformationComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
