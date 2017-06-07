import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';

@Component({
    selector: 'object-selection',
    templateUrl: './object-selection.component.html'
})
export class ObjectSelectionComponent implements OnInit {

    placeholder = -1;

    ngOnInit(): void {
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public onChange(target: any): void {
        const object = new Object();
        object.LuggageClaimObject = target.value;
        this.dataService.Objects.push(object);
        target.selectedIndex = 0;
    }
    public removeObject(item: any, index: number): void {
        this.dataService.Objects.splice(index, 1);
    }

    public gatherObjectInformation(): void {
        console.log('Objects', this.dataService.Objects);
        this.router.navigate(['/object-details']);
    }
}


