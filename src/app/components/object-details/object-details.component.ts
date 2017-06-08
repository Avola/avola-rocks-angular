import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { AvolaClientService } from '../../services/avolaclient-service';
import { ListData, PairData } from '../../contracts/DecisionServiceVersionDescriptionDetails';
import { LuggageClaimObjectCoverage } from '../../contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from '../../contracts/LuggageClaimObjectCalculatedCompensationAmount';

@Component({
    selector: 'object-details',
    templateUrl: './object-details.component.html',
    providers: [AvolaClientService]
})
export class ObjectDetailsComponent implements OnInit {
    notCovered = false;
    objectLocation: ListData;
    handLuggage: PairData;

    ngOnInit(): void {
        this.prepareValuePairsAndLists();
    }

    constructor(private dataService: DataService, private router: Router, private avolaclient: AvolaClientService) {
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
                            this.dataService.Objects[this.dataService.currentObject] = this.dataService.allObjects[i];
                            break;
                        }
                    }
                    this.dataService.Objects[this.dataService.currentObject].Coverage = 'Covered';
                    this.router.navigate(['/object-compensation-details']);
                    // }
                }
            }
        });
    }

    public nextObject() {
        this.notCovered = false;
        this.dataService.currentObject++;
        if (this.dataService.Objects.length - 1 > this.dataService.currentObject) {
            this.router.navigate(['/object-details']);
        }
        else {
            //go to final page
        }
    }

    public prepareValuePairsAndLists(): void {
        let objectLocationId = this.dataService.mappedDatas[10].Properties.find(p => p.Name == 'ValueListId').Value;
        this.objectLocation = this.dataService.mappedLists[objectLocationId];

        let handLuggageId = this.dataService.mappedDatas[9].Properties.find(p => p.Name == 'PairId').Value;
        this.handLuggage = this.dataService.mappedPairs[handLuggageId];
        this.dataService.listLuggageClaimObjectCoverage[this.dataService.currentObject].LuggageClaimObjectinHandLuggage = this.handLuggage.ValueForFalse;
    }
}


