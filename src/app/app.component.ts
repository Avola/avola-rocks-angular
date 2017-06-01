import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Avola Rocks!!!';

  public onStep1Next(ev): void {
    console.log("clicked 1");
  }

  public onStep2Next(ev): void {
    console.log("clicked 2");
  }

  public onStep3Next(ev): void {
    console.log("clicked 3");
  }

  public onStep4Next(ev): void {
    console.log("clicked 4");
  }

    public onComplete(ev): void {
    console.log("Completed");
  }
}


