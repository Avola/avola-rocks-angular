import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../Policy';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username: string;
  password: string;
  userNotFound = false;
  
  constructor(private dataService: DataService, private router: Router) { }


  public Login(): void {
    // leeg of niet gevonden, geef een mooie melding -> bootstrap alert
    // gevonden, onthou current policy + navigate to step 2
    console.log('objecten', this.dataService.allObjects);
    console.log('policies', this.dataService.allPolicies);
    console.log('fixed', this.dataService.fixedValues);

    let foundPolicy = null;

    for (let i = 0; i < this.dataService.allPolicies.length; i++) {
      if (this.dataService.allPolicies[i].UserName == this.username && this.dataService.allPolicies[i].Password == this.password) {
        foundPolicy = this.dataService.allPolicies[i];
        break;
      }
    }
    if (foundPolicy != null) {
      this.dataService.selectedPolicy = foundPolicy;
      this.router.navigate(['/policy-number']);
    } else {
      this.userNotFound = true;
    }
  }
}