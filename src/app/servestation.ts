import { ServeItemType, ServeItem } from './serveitem';

export enum ServeStationType
{
  DrinkDispenser,
  HotDogBun,
  HotDogRaw,
  Cooker,
  Trash
}


export class ServeStation
{
  constructor(
    public id: number,
    public title: string,
    public stationType: ServeStationType,
    public currentItems: ServeItem[] 
  ) {}

  getStationID(): string {
    return "station" + this.id;
  }
}
