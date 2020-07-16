import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FoodName, ServeItem } from './serve-item';
import { ServeStationType, ServeStation } from './serve-station';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  configStationLayout: ServeStationType[][] = [
    [ServeStationType.Customer,ServeStationType.Customer,ServeStationType.Customer,ServeStationType.Customer],
    [ServeStationType.Locked,ServeStationType.Locked,ServeStationType.Locked,ServeStationType.Locked],
    [ServeStationType.Process_Cup,ServeStationType.Process_Meat,ServeStationType.Process_Meat,ServeStationType.Locked],
    [ServeStationType.Bin_Cup,ServeStationType.Bin_Bread,ServeStationType.Bin_Meat,ServeStationType.Trash]
  ];

  stationMatrix: ServeStation[][] = []; 
  private stationIds: string[] = [];
  private gameScore:number = 0;

  constructor() { }

  setupStations() {
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
  getStationIds(): string[] {
    return this.stationIds;
  }

  getScore(): number {
    return this.gameScore;
  }

  doAllTicks() {

    for (let x = 0; x < this.stationMatrix.length; x++) {   
      for (let y = 0; y < this.stationMatrix.length; y++) { 

        const station = this.stationMatrix[x][y];

        switch (station.stationType) {
          case ServeStationType.Process_Cup:
          case ServeStationType.Process_Meat:
            station.currentItems.forEach(function (value:ServeItem) {
              
              const combination = VALID_PROCESSING_COMBINATIONS.find(([firstType, secondType]) =>
                firstType == value.foodName && secondType == station.stationType
              );

              if(combination)
                value.doProcessTick();
            });
            break;
          case ServeStationType.Trash:
            station.currentItems = [];
            break;
          case ServeStationType.Customer:
            //Score each item and clear
            station.currentItems.forEach(i => {
              if(i.foodName==FoodName.Sandwich
                  || (i.foodName==FoodName.Drink && i.isCooked()) )
                this.gameScore += 10;
              else
                this.gameScore -= 10;
            });
            station.currentItems = [];
            break;
          case ServeStationType.Bin_Bread:
            if(station.currentItems.length == 0)
              station.currentItems.push(new ServeItem(FoodName.Bread));
            break;
          case ServeStationType.Bin_Meat:
            if(station.currentItems.length == 0)
              station.currentItems.push(new ServeItem(FoodName.Meat));
            break;
          case ServeStationType.Bin_Cup:
            if(station.currentItems.length == 0)
              station.currentItems.push(new ServeItem(FoodName.Drink));
            break;
          default:
            break;
        }

      } 
    }

  }

}



type IProcessDictionary = [FoodName, ServeStationType];


const VALID_PROCESSING_COMBINATIONS: IProcessDictionary[] = [ 
  [FoodName.Meat, ServeStationType.Process_Meat],
  [FoodName.Drink, ServeStationType.Process_Cup] 
];
