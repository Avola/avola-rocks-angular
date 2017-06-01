import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../Policy';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent {

  title = 'Policy number';
  policynumber: string;
  policyNumberNotFound = false;

  constructor(private dataService: DataService, private router: Router) { }


  public getPolicy(): void {
    // leeg of niet gevonden, geef een mooie melding -> bootstrap alert
    // gevonden, onthou current policy + navigate to step 2
    console.log('objecten', this.dataService.allObjects);
    console.log('policies', this.dataService.allPolicies);
    console.log('fixed', this.dataService.fixedValues);

    let foundPolicy = null;

    for (let i = 0; i < this.dataService.allPolicies.length; i++) {
      if (this.dataService.allPolicies[i].PolicyNumber == +this.policynumber) {
        foundPolicy = this.dataService.allPolicies[i];
        break;
      }
    }
    if (foundPolicy != null) {
      this.dataService.selectedPolicy = foundPolicy;
      this.router.navigate(['/travel-info']);
    } else {
      this.policyNumberNotFound = true;
    }
  }
}


