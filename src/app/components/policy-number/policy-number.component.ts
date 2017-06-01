import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent {

  title = 'Policy number';

  constructor(private dataService: DataService) { }

  public onClick(): void {

  }
}


