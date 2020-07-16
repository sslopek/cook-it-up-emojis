import { ServeItem, FoodName } from './serve-item';

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
  getEmoji(): string {
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


  // Handle items and return score delta
  processTick(): number {
    // Refill empty bins
    if(this.currentItems.length == 0) {
      switch (this.stationType) {
        case ServeStationType.Bin_Bread:
          this.currentItems.push(new ServeItem(FoodName.Bread));
          break;
        case ServeStationType.Bin_Meat:
          this.currentItems.push(new ServeItem(FoodName.Meat));
          break;
        case ServeStationType.Bin_Cup:
          this.currentItems.push(new ServeItem(FoodName.Drink));
          break;
      }
    }

    // Take out the trash
    if(this.stationType == ServeStationType.Trash)
      this.currentItems = [];

    // Process items
    if(this.stationType == ServeStationType.Process_Cup || this.stationType == ServeStationType.Process_Meat) { 
      for(const item of this.currentItems) {
        const combination = VALID_PROCESSING_COMBINATIONS.find(([firstType, secondType]) =>
          firstType == item.foodName && secondType == this.stationType
        );

        if(combination)
          item.doProcessTick();
      }
    }

    // Serve customer
    var scoreChange = 0;
    if(this.stationType == ServeStationType.Customer) {
      //Score each item
      for(const item of this.currentItems) {
        if(item.foodName==FoodName.Sandwich || (item.foodName==FoodName.Drink && item.isCooked()) )
            scoreChange += 10;
        else
          scoreChange -= 10;
      }
      //Clear after serve
      this.currentItems = [];
    }
    return scoreChange;
  }

}


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

type IProcessDictionary = [FoodName, ServeStationType];


const VALID_PROCESSING_COMBINATIONS: IProcessDictionary[] = [ 
  [FoodName.Meat, ServeStationType.Process_Meat],
  [FoodName.Drink, ServeStationType.Process_Cup] 
];



