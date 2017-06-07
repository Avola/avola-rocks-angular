import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  constructor(private dataService: DataService, private router: Router) { }

  public goToTravelInfo(): void{
    this.router.navigate(['/travel-info']);
  }
}