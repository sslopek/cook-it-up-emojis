import { Component } from '@angular/core';
import { GameService } from './game.service';
import { ServeStation } from './servestation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  intervalId = 0;
  stations: ServeStation[][]

  constructor(private gameService: GameService) {}
    

  ngOnInit() { 
    this.gameService.setupStations();
    this.loadStations();
    this.startGameTimer(); 
  }
  ngOnDestroy() { 
    this.clearGameTimer(); 
  }



  //Main game loop
  startGameTimer() {
    this.clearGameTimer();
    this.intervalId = window.setInterval(() => {

      this.gameService.doAllTicks();

    }, 500);
  }

  //Clear timer (for pausing)
  clearGameTimer() { 
    clearInterval(this.intervalId); 
  }

  
  loadStations(): void {
    this.gameService.getStations()
        .subscribe(stations => this.stations = stations);
  }

  getStationsIds(): string[] {
    return this.gameService.getStationIds();
  }
  getScore(): number {
    return this.gameService.getScore();
  }

}








