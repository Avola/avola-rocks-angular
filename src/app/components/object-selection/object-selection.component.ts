import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { ListData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { LuggageClaimObjectCoverage } from '../../contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    selector: 'object-selection',
    templateUrl: './object-selection.component.html'
})
export class ObjectSelectionComponent implements OnInit {

    objectList: ListData;
    completerDataService: CompleterData;

    ngOnInit(): void {
        this.prepareValueLists();
    }

    constructor(private dataService: DataService, private router: Router, private completerService: CompleterService) {
    }

    public removeObject(item: any, index: number): void {
        this.dataService.Objects.splice(index, 1);
    }

    public gatherObjectInformation(): void {
        console.log('items', this.dataService.listLuggageClaimObjectCoverage);
        this.router.navigate(['/object-details']);
    }

    public prepareValueLists(): void {
        const objectListId = this.dataService.mappedDatas[14].Properties.find(p => p.Name == 'ValueListId').Value;
        this.objectList = this.dataService.mappedLists[objectListId];
        this.completerDataService = this.completerService.local(this.objectList.Items, 'Value', 'Value');
    }

    public onSelected(item: any): void {
        if (item != null) {
            const object = new Object();
            object.LuggageClaimObject = item.title;

            const luggageClaimObjectCoverage = new LuggageClaimObjectCoverage();
            luggageClaimObjectCoverage.LuggageClaimObject = object.LuggageClaimObject;
            luggageClaimObjectCoverage.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
            luggageClaimObjectCoverage.LuggageClaimCause = this.dataService.LuggageClaimCause;
            this.dataService.listLuggageClaimObjectCoverage.push(luggageClaimObjectCoverage);

            const luggageClaimObjectCalculatedCompensationAmount = new LuggageClaimObjectCalculatedCompensationAmount();
            luggageClaimObjectCalculatedCompensationAmount.PolicyNumber = this.dataService.selectedPolicy.PolicyNumber.toString();
            luggageClaimObjectCalculatedCompensationAmount.LuggageClaimObject = object.LuggageClaimObject;
            luggageClaimObjectCalculatedCompensationAmount.TravelClaimEventDate = this.dataService.travelClaimEventDate;
            this.dataService.listLuggageClaimObjectCalculatedCompensationAmount.push(luggageClaimObjectCalculatedCompensationAmount);

            this.dataService.Objects.push(object);
        }
    }
}


