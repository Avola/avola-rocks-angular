import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { AvolaClientService } from '../../services/avolaclient-service';
import { OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'incident-information',
  templateUrl: './incident-information.component.html',
  providers: [AvolaClientService]
})
export class IncidentInformationComponent implements OnInit {

  title = 'Incident information';
  notCovered: boolean;

  ngOnInit(): void {
    this.dataService.checkPolicyCoverage.CrimeorAttempttoCrime = 'No Crime or Attempt to Crime';
  }

  constructor(private dataService: DataService, private avolaclient: AvolaClientService, private router: Router) { }

  public checkCoverage() {
    this.avolaclient.checkPolicyCoverage(this.dataService.checkPolicyCoverage).subscribe((coverage) => {
      if (coverage != null) {
        // if (coverage === 'Not Covered') {
        //   this.notCovered = true;
        // } else {
          this.dataService.luggageClaimObjectCalculatedCompensationAmount.TravelClaimEventDate
            = this.dataService.checkPolicyCoverage.TravelClaimEventDate;
          this.router.navigate(['/object-selection']);
        //}
      }
    });
  }

}


