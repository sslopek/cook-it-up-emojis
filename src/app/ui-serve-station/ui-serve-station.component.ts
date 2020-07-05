import { Component, OnInit, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../game.service';
import { ServeStationType, ServeStation } from '../servestation';


@Component({
  selector: 'app-ui-serve-station',
  templateUrl: './ui-serve-station.component.html',
  styleUrls: ['./ui-serve-station.component.css']
})
export class UiServeStationComponent implements OnInit {

  title: string;

  @Input()
  serveStation: ServeStation;
  @Input()
  allStationsIds: string[];

  connectedStations: string[];
  
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.title = this.serveStation.title;
  }


  
  onDrop(event: CdkDragDrop<string[]>) {
    //Reorder in current station
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
     
    } 
    //Move to another station
    else {

       //todo: tell item station is changed

      if(event.container.data.length >= 1){
        console.debug('Station full');
        return;
      }

      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }  


}
