import { ServeItem } from './serve-item';

export enum ServeStationType
{
  Bin_Meat,
  Bin_Bread,
  Bin_Cup,
  Process_Meat,
  Process_Cup,
  Trash,
  Customer,
  Locked
}


export class ServeStation
{
  public currentItems: ServeItem[] = []; 

  constructor(
    public id: number,
    public stationType: ServeStationType
  ) {}

  getStationID(): string {
    return "station" + this.id;
  }

  //Icon to show in background
  getEmoji(): string{
      switch (this.stationType) {
        case ServeStationType.Bin_Bread:    
          return '🍞';
        case ServeStationType.Bin_Meat:    
          return '🥩';
        case ServeStationType.Bin_Cup:    
          return '🥤';
        case ServeStationType.Process_Meat:    
          return '🍳';
        case ServeStationType.Process_Cup:    
          return '🚰';
        case ServeStationType.Locked:   
          return '🔒';
        case ServeStationType.Trash:   
          return '🗑️';
        case ServeStationType.Customer:   
          return '🙋';
        default:
          return '';
      }
  }

}


