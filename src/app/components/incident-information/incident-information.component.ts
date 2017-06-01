import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { AvolaClientService } from '../../services/avolaclient-service';

@Component({
  selector: 'incident-information',
  templateUrl: './incident-information.component.html',
  providers: [AvolaClientService]
})
export class IncidentInformationComponent {

  title = 'Incident information';
  notCovered: boolean;

  constructor(private dataService: DataService, private avolaclient: AvolaClientService) { }

  public checkCoverage() {
    this.avolaclient.checkPolicyCoverage(this.dataService.selectedPolicy.PolicyNumber).subscribe( (coverage) => {
      console.log(coverage);
      if (coverage != null){
        if (coverage == 'Not Covered'){
          this.notCovered = true;
        } else {
          // State go to next page
        }
      }
    });
  }

}


