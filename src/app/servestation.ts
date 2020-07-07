import { ServeItemType, ServeItem } from './serveitem';

export enum ServeStationType
{
  Bin_Meat,
  Bin_Bread,
  Bin_Cup,
  Process_Meat,
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


  combineItems(): void{

    //Find any items that can be combined
    let baseItemsToCombine = this.currentItems.filter(i => 
        i.itemType == ServeItemType.Meat 
        && i.cookedAmount == 100)

    baseItemsToCombine.forEach(item => {
      //Find first item to combine with    
      let index = this.currentItems.findIndex(c => c.itemType == ServeItemType.Bread)
      if(index != -1){
        item.itemType = ServeItemType.MeatAndBread;
        //Remove item that was combined
        this.currentItems.splice(index, 1);
      }
    });


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


