import { ServeItem, FoodName } from './serve-item';

export class ServeStation
{

  private settings: IStationSettings;
  public currentItems: ServeItem[] = []; 

  //Customer station requests
  public customerRequests: ServeItem[] = []; 
  private lastRequest = 100;

  constructor(
    public id: number,
    public stationType: ServeStationType
  ) {
    const newSettings = AllStationSettings[this.stationType];
    this.settings = { ...StationDefaults, ...newSettings };
  }

  // ID for user interface
  getStationID = () => "station" + this.id;
  // Icon to show in background
  getEmoji = () => this.settings.Emoji;

  // Handle items and return score delta
  processTick(): number {

    // Take out the trash
    if(this.stationType == ServeStationType.Trash)
      this.currentItems = [];

    // Refill empty bins
    if(this.currentItems.length == 0) {
      if(this.settings.RefillItem != null)
        this.currentItems.push(new ServeItem(this.settings.RefillItem));
    }

    // Process applicable items
    for(const item of this.currentItems) {
      if(this.settings.ProcessItems.find(value => value == item.foodName) != null)
        item.doProcessTick();
    }

    // Serve customer
    let scoreChange = 0;
    if(this.stationType == ServeStationType.Customer) {
      scoreChange = this.handleServing();
    }

    // Update customer related properties
    if(this.stationType == ServeStationType.Customer) {
      this.updateRequests();
    }

    return scoreChange;
  }

  handleServing() {
    // Score each item
    let scoreChange = 0;
    for(const item of this.currentItems) {
      const matchingRequest = this.customerRequests.find(req => req.foodName == item.foodName);

      if(matchingRequest != null && item.readyToServe()) {
        // Remove the request
        const index = this.customerRequests.indexOf(matchingRequest, 0);
        if (index > -1)
          this.customerRequests.splice(index, 1);
        // Add points
        scoreChange += 10;
      }
      else {
        scoreChange -= 10;
      }
    }
    // Clear after serve
    this.currentItems = [];
    
    return scoreChange;
  }

  updateRequests() {
    if(this.customerRequests.length == 0) {     
      //Ready for new requests
      if(this.lastRequest >= 100) {
        this.lastRequest = 0;
        this.customerRequests.push(new ServeItem(FoodName.Sandwich));
        this.customerRequests.push(new ServeItem(FoodName.Drink));
      }
      else {
        this.lastRequest += 10;
      }
    }
  }

}


/* Enum of station types */
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


/* Station setting definition */
interface IStationSettings {
  Emoji: string,
  RefillItem? : FoodName,
  ProcessItems? : Array<FoodName>
}

const StationDefaults: IStationSettings = {
  Emoji: '',
  ProcessItems: []
}

const AllStationSettings: Record<ServeStationType, IStationSettings> = {
  [ServeStationType.Bin_Bread]: { 
    Emoji: '🍞',
    RefillItem: FoodName.Bread  
  },
  [ServeStationType.Bin_Cup]: { 
    Emoji: '🥤',
    RefillItem: FoodName.Drink  
  },
  [ServeStationType.Bin_Meat]: { 
    Emoji: '🥩',
    RefillItem: FoodName.Meat  
  },
  [ServeStationType.Customer]: { 
    Emoji: '🙋'
  },
  [ServeStationType.Locked]: { 
    Emoji: '🔒'
  },
  [ServeStationType.Process_Cup]: { 
    Emoji: '🚰',
    ProcessItems: [FoodName.Drink]
  },
  [ServeStationType.Process_Meat]: { 
    Emoji: '🍳',
    ProcessItems: [FoodName.Meat]
  },
  [ServeStationType.Trash]: { 
    Emoji: '🗑️'
  }
};
