import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../Classes/Object';

@Component({
    selector: 'object-compensation-details',
    templateUrl: './object-compensation-details.component.html'
})
export class ObjectCompensationDetailsComponent implements OnInit {

    ngOnInit(): void {

    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public nextDetail(moreItems: boolean): void {
        this.dataService.currentObject++;
        if (this.dataService.Objects.length - 1 > this.dataService.currentObject) {
            this.router.navigate(['/object-details']);
        }
        else {
            //go to final pay amount
        }
    }
}


