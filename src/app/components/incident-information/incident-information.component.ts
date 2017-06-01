import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'incident-information',
  templateUrl: './incident-information.component.html'
})
export class IncidentInformationComponent {

  title = 'Incident information';

  constructor(private dataService: DataService) { }

}


