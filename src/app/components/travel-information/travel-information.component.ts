import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'travel-information',
  templateUrl: './travel-information.component.html'
})
export class TravelInformationComponent {

  title = 'Travel information';

  constructor(private dataService: DataService) { }

}


