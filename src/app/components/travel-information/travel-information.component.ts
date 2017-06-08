import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../contracts/Policy';
import { OnInit } from '@angular/core';
import { ListData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { PairData } from '../../contracts/DecisionServiceVersionDescriptionDetails';

@Component({
  selector: 'travel-information',
  templateUrl: './travel-information.component.html'
})
export class TravelInformationComponent implements OnInit {

  countryList: ListData;
  businessTravel: PairData;
  winterSports: PairData;
  title = 'Travel information';
  ngOnInit(): void {
    this.dataService.mapFormData();
    // Setup default values
    this.dataService.checkPolicyCoverage.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
    this.prepareValuePairsAndLists();
  }

  constructor(private dataService: DataService, private router: Router) { }

  public getIncidentInfo(): void {
    console.log('ajt', this.dataService.checkPolicyCoverage);
    this.router.navigate(['/incident-info']);
  }

  public prepareValuePairsAndLists(): void {
    let countryListId = this.dataService.mappedDatas[87].Properties.find(p => p.Name == 'ValueListId').Value;
    this.countryList = this.dataService.mappedLists[countryListId];

    let businessTravelId = this.dataService.mappedDatas[36].Properties.find(p => p.Name == 'PairId').Value;
    this.businessTravel = this.dataService.mappedPairs[businessTravelId];
    this.dataService.checkPolicyCoverage.BusinessTravel = this.businessTravel.ValueForFalse;

    let winterSportsId = this.dataService.mappedDatas[42].Properties.find(p => p.Name == 'PairId').Value;
    this.winterSports = this.dataService.mappedPairs[winterSportsId];
    this.dataService.checkPolicyCoverage.WinterSportsTravel = this.winterSports.ValueForFalse;
  }
}
