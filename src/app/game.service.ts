import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServeItemType, ServeItem } from './serveitem';
import { ServeStationType, ServeStation } from './servestation';


@Injectable({
  providedIn: 'root'
})
export class GameService {


  //TODO: swap x and y config after changing CSS to output as rows
  configStationLayout: ServeStationType[][] = [
    [ServeStationType.Customer,ServeStationType.Locked,ServeStationType.Locked,ServeStationType.Bin_Cup],
    [ServeStationType.Customer,ServeStationType.Process_Meat,ServeStationType.Process_Meat,ServeStationType.Bin_Bread],
    [ServeStationType.Customer,ServeStationType.Process_Meat,ServeStationType.Process_Meat,ServeStationType.Bin_Meat],
    [ServeStationType.Customer,ServeStationType.Locked,ServeStationType.Locked,ServeStationType.Trash]
  ];


  stationMatrix: ServeStation[][] = []; 
  private stationIds: string[] = [];
  private gameScore:number = 0;

  constructor() { }

  setupStations()
  {
    this.stationIds = [];

    let currentId = 0;
    for (let x = 0; x < this.configStationLayout.length; x++) {   
      this.stationMatrix[x] = [];
      for (let y = 0; y < this.configStationLayout[x].length; y++) { 
        //Create station based on config
        this.stationMatrix[x][y] = new ServeStation(++currentId, this.configStationLayout[x][y]);
        //Keep track of unique Ids for drag and drop
        this.stationIds.push(this.stationMatrix[x][y].getStationID());
      }
    }
  }

  getStations(): Observable<ServeStation[][]> {
    return of(this.stationMatrix);
  }
  
  //ID list for drag and drop functionality
  getStationIds(): string[]{
    return this.stationIds;
  }

  getScore(): number{
    return this.gameScore;
  }

  doAllTicks(){

    for (let x = 0; x < this.stationMatrix.length; x++) {   
      for (let y = 0; y < this.stationMatrix.length; y++) { 

        const station = this.stationMatrix[x][y];

        switch (station.stationType) {
          case ServeStationType.Process_Meat:
            station.currentItems.forEach(function (value:ServeItem) {
              value.doGameTick();
            })
            break;
          case ServeStationType.Trash:
            station.currentItems = [];
            break;
          case ServeStationType.Customer:
            //Score each item and clear
            station.currentItems.forEach(i => {
              if(i.itemType==ServeItemType.MeatAndBread)
                this.gameScore += 10;
              else
                this.gameScore -= 10;
            });
            station.currentItems = [];
            break;
          case ServeStationType.Bin_Bread:
            if(station.currentItems.length == 0)
              station.currentItems.push(new ServeItem(ServeItemType.Bread));
            break;
          case ServeStationType.Bin_Meat:
            if(station.currentItems.length == 0)
              station.currentItems.push(new ServeItem(ServeItemType.Meat));
            break;
          default:
            break;
        }

      } 
    }

  }


  
}
