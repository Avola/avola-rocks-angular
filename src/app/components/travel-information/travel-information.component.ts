import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../Classes/Policy';
import { OnInit } from '@angular/core';

@Component({
  selector: 'travel-information',
  templateUrl: './travel-information.component.html'
})
export class TravelInformationComponent implements OnInit{

  title = 'Travel information';

  ngOnInit(): void {
    this.dataService.checkPolicyCoverage.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
    this.dataService.checkPolicyCoverage.BusinessTravel = 'No Business Travel';
    this.dataService.checkPolicyCoverage.WinterSportsTravel = 'No Winter Sports';
  }

  constructor(private dataService: DataService, private router: Router) { }

  public getIncidentInfo(): void {
    this.router.navigate(['/incident-info']);
  }

}


