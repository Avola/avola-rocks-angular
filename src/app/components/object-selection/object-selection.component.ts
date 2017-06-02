import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
    selector: 'object-selection',
    templateUrl: './object-selection.component.html'
})
export class ObjectSelectionComponent implements OnInit {

    public object: string;

    ngOnInit(): void {
    }

    constructor(private dataService: DataService, private router: Router) {
    }

    public keyPressed(keyCode: any): void {
        if(keyCode == 13 && this.object != null && this.object != '') {
            this.dataService.Objects.push(this.object);
            this.object = '';
        }
    }
    public removeObject(item: string, index: number): void {
        this.dataService.Objects.splice(index, 1);
    }
}


