import { Component, OnInit, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../game.service';
import { ServeStationType, ServeStation } from '../servestation';
import { ServeItem } from '../serveitem';


@Component({
  selector: 'app-ui-serve-station',
  templateUrl: './ui-serve-station.component.html',
  styleUrls: ['./ui-serve-station.component.css']
})
export class UiServeStationComponent implements OnInit {
  @Input()
  serveStation: ServeStation;
  @Input()
  allStationsIds: string[];

  connectedStations: string[];
  
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<ServeItem[]>) {
    //Reordering in current station (not needed if station can only hold one)
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
     
    } 
    //Moving to another station
    else {

      // If didn't already combine and slot is full, do not change list
      if(event.container.data.length >= 2){
        console.debug('Station full');
        return;
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      //TODO handle before transfering array and only allow one item per station
      //let movingItem:ServeItem = event.previousContainer.data[event.previousIndex];
      this.serveStation.combineItems();


    }
  }  


}
