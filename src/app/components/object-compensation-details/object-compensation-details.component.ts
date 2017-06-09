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
    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService) {
    }

    public checkAmount() {
        this.avolaclient.checkCompensationAmount(this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject]).subscribe((amount) => {
            if (amount != null) {
                if (amount === 'NoConclusion' || amount === 'Error') {
                    this.errorAmountCalculation = true;
                } else {
                    this.dataService.Objects[this.dataService.currentObject].CoverageAmount = Number(amount);
                }
            }
        });
    }

    public nextDetail(moreItems: boolean): void {
        this.dataService.currentObject++;
        if (moreItems) {
            this.router.navigate(['/object-details']);
        }
        else {
            //go to final pay amount
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


