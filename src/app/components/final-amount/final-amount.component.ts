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
    totalAmount: number;

    ngOnInit(): void {
        this.calculateTotal();
    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService) {
    }

    calculateTotal() {
        let total = 0;

        this.dataService.Objects.forEach(object => {
            if (object.CoverageAmount) {
                total += object.CoverageAmount;
            }
        });

        this.totalAmount = total;
    }

}