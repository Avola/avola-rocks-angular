import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { AvolaClientService } from '../../services/avolaclient-service';
import { OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PairData, ListData } from '../../contracts/DecisionServiceVersionDescriptionDetails';

@Component({
  selector: 'incident-information',
  templateUrl: './incident-information.component.html',
  providers: [AvolaClientService]
})
export class IncidentInformationComponent implements OnInit {

  crimeorAttempttoCrime: PairData;
  luggageClaimCause: ListData;
  sportsPracticed: ListData;
  title = 'Incident information';
  notCovered: boolean;

  ngOnInit(): void {
    this.prepareValuePairsAndLists();
  }

  constructor(private dataService: DataService, private avolaclient: AvolaClientService, private router: Router) { }

  public checkCoverage() {
    this.avolaclient.checkPolicyCoverage(this.dataService.checkPolicyCoverage).subscribe((coverage) => {
      if (coverage != null) {
        if (coverage === 'Not Covered') {
          this.notCovered = true;
        } else {
          this.router.navigate(['/object-selection']);
        }
      }
    });
  }

  public prepareValuePairsAndLists(): void {
    let luggageClaimCauseId = this.dataService.mappedDatas[5].Properties.find(p => p.Name == 'ValueListId').Value;
    this.luggageClaimCause = this.dataService.mappedLists[luggageClaimCauseId];

    let sportsPracticedId = this.dataService.mappedDatas[52].Properties.find(p => p.Name == 'ValueListId').Value;
    this.sportsPracticed = this.dataService.mappedLists[sportsPracticedId];

    let crimeorAttempttoCrimeId = this.dataService.mappedDatas[45].Properties.find(p => p.Name == 'PairId').Value;
    this.crimeorAttempttoCrime = this.dataService.mappedPairs[crimeorAttempttoCrimeId];
    this.dataService.checkPolicyCoverage.CrimeorAttempttoCrime = this.crimeorAttempttoCrime.ValueForFalse;
  }

}


