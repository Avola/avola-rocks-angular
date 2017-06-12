import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Object } from '../../contracts/Object';
import { AvolaClientService } from '../../services/avolaclient-service';
import { ListData, PairData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { LuggageClaimObjectCoverage } from '../../contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    selector: 'object-details',
    templateUrl: './object-details.component.html',
    providers: [AvolaClientService]
})
export class ObjectDetailsComponent implements OnInit, OnDestroy, OnChanges {
    notCovered = false;
    objectLocation: ListData;
    handLuggage: PairData;
    completerDataServiceBrand: CompleterData;
    completerDataServiceModel: CompleterData;
    brandList: string[] = [];
    modelList: string[] = [];

    ngOnInit(): void {
        this.prepareValuePairsAndLists();
        this.completerDataServiceBrand = this.completerService.local(this.brandList);
    }

    ngOnChanges(changes: any): void {
        console.log("in changes", changes);
    }
    ngOnDestroy(): void {
        console.log("in destroy");
    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService, private completerService: CompleterService) {
    }


    public checkCoverage() {
        this.avolaclient.checkObjectCoverage(this.dataService.listLuggageClaimObjectCoverage[this.dataService.currentObject]).subscribe((coverage) => {
            if (coverage != null) {
                if (coverage === 'Not Covered') {
                    this.notCovered = true;
                    this.dataService.Objects[this.dataService.currentObject].Coverage = 'Not Covered';
                } else {
                    const current = this.dataService.Objects[this.dataService.currentObject];
                    for (let i = 0; i < this.dataService.allObjects.length; i++) {
                        if (current.LuggageClaimObject === this.dataService.allObjects[i].LuggageClaimObject &&
                            current.Brand === this.dataService.allObjects[i].Brand && current.Model
                            === this.dataService.allObjects[i].Model) {
                            this.dataService.listLuggageClaimObjectCalculatedCompensationAmount[this.dataService.currentObject].LuggageClaimObjectCurrentSalesValue
                                = this.dataService.allObjects[i].ClaimObjectSalesValue.toString();
                            break;
                        }
                    }

                    this.dataService.Objects[this.dataService.currentObject].Coverage = 'Covered';
                    this.router.navigate(['/object-compensation-details']);
                }
            }
        });
    }

    public onSelected(item: any): void {
        this.modelList = [];
        if (item != null) {
            this.dataService.allObjects.forEach((object) => {
                if (object.Brand === item.title) {
                    this.modelList.push(object.Model);
                }
            });
            this.completerDataServiceModel = this.completerService.local(this.modelList);
        }
    }

    public nextObject() {
        this.notCovered = false;

        if (this.dataService.Objects.length > this.dataService.currentObject + 1) {
            this.dataService.currentObject++;
            this.dataService.listLuggageClaimObjectCoverage[this.dataService.currentObject].LuggageClaimObjectinHandLuggage = this.handLuggage.ValueForFalse;
            this.router.navigate(['/object-details']);
        } else {
            this.router.navigate(['/final-amount']);
        }
    }

    public prepareValuePairsAndLists(): void {
        const objectLocationId = this.dataService.mappedDatas[10].Properties.find(p => p.Name === 'ValueListId').Value;
        this.objectLocation = this.dataService.mappedLists[objectLocationId];

        const handLuggageId = this.dataService.mappedDatas[9].Properties.find(p => p.Name === 'PairId').Value;
        this.handLuggage = this.dataService.mappedPairs[handLuggageId];
        this.dataService.listLuggageClaimObjectCoverage[this.dataService.currentObject].LuggageClaimObjectinHandLuggage = this.handLuggage.ValueForFalse;

        this.dataService.allObjects.forEach((object) => {
            if (object.Brand !== '' && this.brandList.find(b => b === object.Brand) == null) {
                this.brandList.push(object.Brand);
            }
        });
    }
}


