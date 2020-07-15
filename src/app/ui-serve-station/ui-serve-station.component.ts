import { Component, OnInit, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../game/game.service';
import { ServeStationType, ServeStation } from '../game/serve-station';
import { ServeItem } from '../game/serve-item';


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
  isCustomer: boolean = false;
  
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.isCustomer = (this.serveStation.stationType == ServeStationType.Customer);
  }

  onDrop(event: CdkDragDrop<ServeItem[]>) {
    //Reordering in current station (not needed if station can only hold one)
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }
    //Moving to empty station
    else if(event.container.data.length == 0){
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //Moving to full station
    else{
      const firstIdx = 0;
      const droppedItem = event.previousContainer.data[event.previousIndex];
      const thisfirstItem = event.container.data[firstIdx];
      
      //Check forward and backward
      if(droppedItem.canCombine(thisfirstItem))
      {
        droppedItem.combineWith(thisfirstItem);
        //Remove this item and move base item here
        event.container.data.splice(firstIdx, 1);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          firstIdx);
      }
      else if(thisfirstItem.canCombine(droppedItem))
      {  
        thisfirstItem.combineWith(droppedItem);
        //Remove dropped item combined into this one
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }

  }  


}
