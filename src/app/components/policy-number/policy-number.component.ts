import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'policy-number',
  templateUrl: './policy-number.component.html'
})
export class PolicyNumberComponent {

  title = 'Policy number';

  constructor(private dataService: DataService, private router: Router) { }


  public getPolicy(): void {
    //leeg of niet gevonden, geef een mooie melding -> bootstrap alert
    //gevonden, onthou current policy + navigate to step 2
    console.log('objecten', this.dataService.allObjects);
    console.log('policies', this.dataService.allPolicies);
<<<<<<< HEAD

    this.router.navigate(['/travel-info']);
=======
    console.log('fixed', this.dataService.fixedValues);
>>>>>>> 91bd7bfef34e52f31827444530c9ec11714a999a
  }
}


