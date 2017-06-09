import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../contracts/Policy';
import { OnInit } from '@angular/core';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent implements OnInit {
  policyNumberNotFound = false;

  ngOnInit(): void {
    if (this.dataService.foundPolicies.length > 0) {
      this.dataService.selectedPolicy = this.dataService.foundPolicies[0];
    } else {
      this.policyNumberNotFound = true;
    }
  }

  constructor(private dataService: DataService, private router: Router) {
  }

  public setPolicy(): void {
    this.router.navigate(['/travel-info']);
  }

  public selectPolicy(item: Policy): void {
    this.dataService.selectedPolicy = item;
  }

  public goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
}


