import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../Classes/Object';

@Component({
    selector: 'object-details',
    templateUrl: './object-details.component.html'
})
export class ObjectDetailsComponent implements OnInit {

    ngOnInit(): void {
        this.dataService.luggageClaimObjectCoverage.LuggageClaimObjectinHandLuggage = 'Not in Hand Luggage';
        this.dataService.luggageClaimObjectCoverage.LuggageClaimObject
            = this.dataService.Objects[this.dataService.currentObject].LuggageClaimObject;
        this.dataService.luggageClaimObjectCoverage.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public nextDetail(): void {
        const current = this.dataService.Objects[this.dataService.currentObject];
        for (let i = 0; i < this.dataService.allObjects.length; i++) {
            if (current.LuggageClaimObject === this.dataService.allObjects[i].LuggageClaimObject &&
                current.Brand === this.dataService.allObjects[i].Brand && current.Model === this.dataService.allObjects[i].Model) {
                this.dataService.Objects[this.dataService.currentObject] = this.dataService.allObjects[i];
                break;
            }
        }
        // this.dataService.currentObject++;
        this.dataService.luggageClaimObjectCoverage.LuggageClaimObjectLocation = '';
        this.dataService.luggageClaimObjectCoverage.LuggageClaimObjectinHandLuggage = 'Not in Hand Luggage';
        this.router.navigate(['/object-compensation-details']);
    }
}


