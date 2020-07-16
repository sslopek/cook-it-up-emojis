import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  // Current score
  getScore = () => this.gameScore;

  // ID list for drag and drop functionality
  getStationIds = () => this.stationIds;

  // Create station instances from layout config
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

  // Station matrix for user interface
  getStations(): Observable<ServeStation[][]> {
    return of(this.stationMatrix);
  }
  
  // Process station logic
  doAllTicks() {
    for (let x = 0; x < this.stationMatrix.length; x++) {   
      for (let y = 0; y < this.stationMatrix.length; y++) { 
        const scoreDelta = this.stationMatrix[x][y].processTick();
        this.gameScore += scoreDelta;
      } 
    }
  }

}