import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { AvolaClientService } from '../../services/avolaclient-service';

@Component({
    selector: 'final-amount',
    templateUrl: './final-amount.html'
})
export class FinalAmountComponent implements OnInit {
    claimed: boolean = false;

    ngOnInit(): void {

    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService) {
    }

    claim() {
        this.avolaclient.checkSettlementMandate(this.dataService.travelClaimSettlementMandate).subscribe((mandate) => {
            if (mandate != null) {
                this.dataService.finalSettlementMandate = mandate.toString();
            }
        });
        this.claimed = true;
    }

}