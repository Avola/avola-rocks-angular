import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Object } from '../../contracts/Object';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'object-accordion',
    templateUrl: './object-accordion.html'
})
export class ObjectAccordionComponent {

    constructor(private dataService: DataService, private router: Router) {
    }

    public beforeChange($event: NgbPanelChangeEvent) {

        if (parseInt($event.panelId) > this.dataService.currentObject) {
            $event.preventDefault();
        }
    }

}