import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServeItemType, ServeItem } from './serveitem';
import { ServeStationType, ServeStation } from './servestation';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  bunStation = new ServeStation(0, "Bun Bin", ServeStationType.HotDogBun, [
    new ServeItem(ServeItemType.HotDog),
    new ServeItem(ServeItemType.Drink)
  ]);
  cookStation  = new ServeStation(1, "Burner", ServeStationType.Cooker, [new ServeItem(ServeItemType.Drink)]);
  trashStation  = new ServeStation(2, "Trash", ServeStationType.Trash, []);
  customer1Station  = new ServeStation(3, "Serve", ServeStationType.Customer, []);
  

  stationList: ServeStation[] = [this.bunStation, this.cookStation, this.trashStation, this.customer1Station];


  constructor() { }


  getStations(): Observable<ServeStation[]> {
    console.log("getStations: " + this.stationList.length);
    return of(this.stationList);
  }
  
  //ID list for drag and drop functionality
  getStationIds(): Observable<string[]>{ //TODO: probably not helpful to use observable
    return of(this.stationList.map(a => "station" + a.id));
  }



  doAllTicks(){
    this.cookStation.currentItems.forEach(function (value:ServeItem) {
      value.doGameTick();
    }); 

    //Clear the trash
    this.trashStation.currentItems = [];
    //Serve the customer
    this.customer1Station.currentItems = [];

    if(this.bunStation.currentItems.length == 0)
      this.bunStation.currentItems.push(new ServeItem(ServeItemType.HotDog));

  }


  
}
