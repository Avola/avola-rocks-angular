import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';
import { PairData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { AvolaClientService } from '../../services/avolaclient-service';

@Component({
    selector: 'object-compensation-details',
    templateUrl: './object-compensation-details.component.html'
})
export class ObjectCompensationDetailsComponent implements OnInit {

    repair: PairData;
    opened: PairData;
    errorAmountCalculation = false;

    ngOnInit(): void {
        this.prepareValuePairsAndLists();
        this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].TravelClaimEventDate = this.dataService.checkPolicyCoverage.TravelClaimEventDate;
    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService) {
    }

    public checkAmount() {
        if (this.dataService.Objects[this.dataService.currentObject].LuggageClaimObject === 'Money') {
            this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].LuggageClaimObjectCurrentSalesValue
                = this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].LuggageClaimObjectPurchaseValue;
        }
        this.avolaclient.checkCompensationAmount(this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject]).subscribe((amount) => {
            if (amount != null) {
                if (amount === 'NoConclusion' || amount === 'Error') {
                    this.errorAmountCalculation = true;
                } else {
                    this.dataService.totalCalculatedCompensationAmount += Number(amount);
                    this.dataService.Objects[this.dataService.currentObject].CoverageAmount = Number(amount);
                }
            }
        });

        this.avolaclient.checkObjectSettlementMandate(this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject]).subscribe((mandate) => {
            if (mandate.toString() === 'No Flexible Mandate') {
                this.dataService.totalClaimObjectsWithoutFlexibleSettlementMandate++;
            }
            this.dataService.Objects[this.dataService.currentObject].SettlementMandate = mandate.toString();
        });
    }

    public nextDetail(moreItems: boolean): void {
        console.log('objects', this.dataService.listLuggageClaimObjectCoverage);
        this.dataService.currentObject++;
        if (moreItems) {
            this.router.navigate(['/object-details']);
        } else {
            this.dataService.travelClaimSettlementMandate.FrissScore = this.dataService.selectedPolicy.FrissScore;
            this.dataService.travelClaimSettlementMandate.NumberOfClaimObjectsWithoutFlexibleMandate = this.dataService.totalClaimObjectsWithoutFlexibleSettlementMandate.toString();
            this.dataService.travelClaimSettlementMandate.TotalCalculatedComensationAmount = this.dataService.totalCalculatedCompensationAmount.toString();
            this.dataService.travelClaimSettlementMandate.NumberOfClaimsInPast3Years = this.dataService.selectedPolicy.ClaimsPastYears.toString();
            this.dataService.travelClaimSettlementMandate.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
            this.avolaclient.checkSettlementMandate(this.dataService.travelClaimSettlementMandate).subscribe((mandate) => {
                this.dataService.finalSettlementMandate = mandate.toString();
            });
            this.router.navigate(['/final-amount']);
        }
    }

    public prepareValuePairsAndLists(): void {
        const repairId = this.dataService.mappedDatas[23].Properties.find(p => p.Name === 'PairId').Value;
        this.repair = this.dataService.mappedPairs[repairId];
        this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].LuggageClaimObjectRepair = this.repair.ValueForFalse;

        const openedId = this.dataService.mappedDatas[20].Properties.find(p => p.Name === 'PairId').Value;
        this.opened = this.dataService.mappedPairs[openedId];
        this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].LuggageClaimObjectOpened = this.opened.ValueForFalse;

    }
}


