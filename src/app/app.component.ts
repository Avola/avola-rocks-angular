import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';
import { AvolaClientService } from './services/avolaclient-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, AvolaClientService]
})
export class AppComponent implements OnInit {

  data: string;
  allData: any;

  ngOnInit(): void {
    this.dataService.getJSON();
    this.dataService.getDecisions();
    this.dataService.getDecisionVersions();
  }

  constructor(private dataService: DataService) { }
}


