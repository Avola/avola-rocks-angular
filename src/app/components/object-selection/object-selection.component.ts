import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { ListData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { LuggageClaimObjectCoverage } from '../../contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';

@Component({
    selector: 'object-selection',
    templateUrl: './object-selection.component.html'
})
export class ObjectSelectionComponent implements OnInit {

    placeholder = -1;
    objectList: ListData;

    ngOnInit(): void {
        this.prepareValueLists();
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public onChange(target: any): void {
        const object = new Object();
        object.LuggageClaimObject = target.value;
console.log(object);
        const luggageClaimObjectCoverage = new LuggageClaimObjectCoverage();
        luggageClaimObjectCoverage.LuggageClaimObject = object.LuggageClaimObject;
        luggageClaimObjectCoverage.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
        luggageClaimObjectCoverage.LuggageClaimCause = this.dataService.LuggageClaimCause;
        this.dataService.listLuggageClaimObjectCoverage.push(luggageClaimObjectCoverage);

        const luggageClaimObjectCalculatedCompensationAmount = new LuggageClaimObjectCalculatedCompensationAmount();
        luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObject = object.LuggageClaimObject;
        luggageClaimObjectCalculatedCompensationAmount.TravelClaimEventDate = this.dataService.travelClaimEventDate;
        this.dataService.listLuggageClaimObjectCalculatedCompensationAmount.push(luggageClaimObjectCalculatedCompensationAmount);

        this.dataService.Objects.push(object);
        target.selectedIndex = 0;
    }
    public removeObject(item: any, index: number): void {
        this.dataService.Objects.splice(index, 1);
    }

    public gatherObjectInformation(): void {
        this.router.navigate(['/object-details']);
    }

    public prepareValueLists(): void {
        const objectListId = this.dataService.mappedDatas[14].Properties.find(p => p.Name == 'ValueListId').Value;
        this.objectList = this.dataService.mappedLists[objectListId];
    }
}


