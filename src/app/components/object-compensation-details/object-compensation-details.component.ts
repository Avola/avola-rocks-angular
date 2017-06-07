import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';

@Component({
    selector: 'object-compensation-details',
    templateUrl: './object-compensation-details.component.html'
})
export class ObjectCompensationDetailsComponent implements OnInit {

    ngOnInit(): void {
        this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectRepair = 'No Repair';
        this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectOpened = 'Not Opened';
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public nextDetail(moreItems: boolean): void {
        this.dataService.currentObject++;
        this.dataService.listLuggageClaimObjectCalculatedCompensationAmount
            .push(this.dataService.luggageClaimObjectCalculatedCompensationAmount);
        if (moreItems) {
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectPurchaseDate = null;
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectPurchaseValue = null;
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectRepairValue = null;
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.TravelNumberofInsuredPersons = null;
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectRepair = 'No Repair';
            this.dataService.luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObjectOpened = 'Not Opened';

            this.router.navigate(['/object-details']);
        }
        else {
            //go to final pay amount
        }
    }
}


