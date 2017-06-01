import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent {

  title = 'Policy number';

  constructor(private dataService: DataService) { }

  public getPolicy(): void {
    //leeg of niet gevonden, geef een mooie melding -> bootstrap alert
    //gevonden, onthou current policy + navigate to step 2
    console.log('objecten', this.dataService.allObjects);
    console.log('policies', this.dataService.allPolicies);
  }
}


