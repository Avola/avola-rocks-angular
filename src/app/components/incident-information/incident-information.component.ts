import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { AvolaClientService } from '../../services/avolaclient-service';
import { OnInit } from '@angular/core';

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

  constructor(private dataService: DataService, private avolaclient: AvolaClientService) { }

  public checkCoverage() {
    console.log('checkPolicyCoverage', this.dataService.checkPolicyCoverage);
    this.avolaclient.checkPolicyCoverage(this.dataService.checkPolicyCoverage).subscribe( (coverage) => {
      console.log(coverage);
      if (coverage != null){
        if (coverage === 'Not Covered'){
          this.notCovered = true;
        } else {
          // State go to next page
        }
      }
    });
  }

}


