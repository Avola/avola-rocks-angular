import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {

  data: string;
  allData: any;

  ngOnInit(): void {
    this.dataService.getJSON();
  }

  constructor(private dataService: DataService) { }
}


