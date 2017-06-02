import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../Classes/Object';

@Component({
    selector: 'object-selection',
    templateUrl: './object-selection.component.html'
})
export class ObjectSelectionComponent implements OnInit {

    public object: Object = new Object();

    ngOnInit(): void {
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public keyPressed(keyCode: any): void {
        if(keyCode == 13 && this.object.LuggageClaimObject != null && this.object.LuggageClaimObject != "") {
            this.dataService.Objects.push(this.object);
            this.object = new Object();
        }
    }
    public removeObject(item: any, index: number): void {
        this.dataService.Objects.splice(index, 1);
    }

    public gatherObjectInformation(): void {
        console.log('Objects', this.dataService.Objects);
        this.router.navigate(['/object-details']);
    }
}


