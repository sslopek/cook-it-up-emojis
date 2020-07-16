import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';
import { ServeStation } from '../game/serve-station';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

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
