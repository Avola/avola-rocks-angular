import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../contracts/Policy';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent {

  policynumber: number;
  policyNumberNotFound = false;

  constructor(private dataService: DataService, private router: Router) {
    if (dataService.selectedPolicy) {
      this.policynumber = dataService.selectedPolicy.PolicyNumber;
    }
  }

  public getPolicy(): void {
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

  public goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}


