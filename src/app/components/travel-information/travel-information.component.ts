import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../Policy';

@Component({
  selector: 'travel-information',
  templateUrl: './travel-information.component.html'
})
export class TravelInformationComponent {

  title = 'Travel information';

  constructor(private dataService: DataService, private router: Router) { }

  public getIncidentInfo(): void {
    this.router.navigate(['/incident-info']);
  }

}


