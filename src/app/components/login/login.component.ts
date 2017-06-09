import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Policy } from '../../contracts/Policy';

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
    for (let i = 0; i < this.dataService.allPolicies.length; i++) {
      if (this.dataService.allPolicies[i].UserName === this.username && this.dataService.allPolicies[i].Password === this.password) {
        this.dataService.foundPolicies.push(this.dataService.allPolicies[i]);
      }
    }
    if (this.dataService.foundPolicies.length > 0) {
      this.router.navigate(['/policy-number']);
    } else {
      this.userNotFound = true;
    }
  }
}
