export class ServeItem
{
  private settings: IItemSettings;
  private readonly burntTarget = 200;
  private readonly cookedTarget = 100;

  constructor(
    public foodName: FoodName,
    public cookedAmount: number = 0
  ) {
    this.reloadItemSettings();
  }

  getDisplayText =  () => FoodType[this.foodName];
  getEmoji = () => this.settings.Emoji;    
  isBurnt = () => this.cookedAmount >= this.burntTarget;
  isCooked = () => this.cookedAmount > this.cookedTarget && !this.isBurnt();

  doProcessTick() {
    if(this.cookedAmount < this.burntTarget) {
        this.cookedAmount += 10;
    }
  }
  
  canCombine(other: ServeItem) {
    if(this.settings.Type == FoodType.CombineBase
        && this.settings.CombineWith.find(v => v == other.foodName)
        && this.settings.CombineCondition(this, other))
      return true;
    else 
      return false;
  }

  combineWith(other: ServeItem) {
    if(!this.canCombine(other))
      return;

    this.foodName = this.settings.CombineResult;
    this.reloadItemSettings();
  }

  private reloadItemSettings() {
    const newSettings = AllItemSettings[this.foodName];
    this.settings = { ...ItemDefaults, ...newSettings };
  }

}


/* Enums for items*/
export enum FoodName
{
  Meat,
  Bread,
  Sandwich,
  Drink
}

enum FoodType
{
  CombineBase,
  CombineComponent,
  CombineResult,
  ProcessAndServe
}


/* Functions for item logic */
type CombineCheckFunc = (a:ServeItem, b:ServeItem) => boolean;

const Conditions: Record<string, CombineCheckFunc> = {
  cooked: (a:ServeItem) => a.isCooked(),
  never: () => false,
  always: () => true
}

/* Item setting definition */
interface IItemSettings {
  Type: FoodType,
  Emoji: string,
  CombineWith? : Array<FoodName>,
  CombineResult? : FoodName,
  CombineCondition? : CombineCheckFunc,
  ServeCondition? : CombineCheckFunc
}

const ItemDefaults: IItemSettings = {
  Type: FoodType.ProcessAndServe,
  Emoji: '❓',
  CombineWith: [],
  CombineCondition: Conditions.never,
  ServeCondition : Conditions.never
}

const AllItemSettings: Record<FoodName, IItemSettings> = {
  [FoodName.Meat]: {   
    Type: FoodType.CombineBase,
    Emoji: '🥩',
    CombineWith: [FoodName.Bread],
    CombineResult: FoodName.Sandwich,
    CombineCondition: Conditions.cooked
  },
  [FoodName.Bread]:{
    Type: FoodType.CombineComponent,
    Emoji: '🍞'
  },
  [FoodName.Sandwich]: {
    Type: FoodType.CombineResult,
    Emoji: '🥪',
    ServeCondition: Conditions.always
  },
  [FoodName.Drink]:{
    Type: FoodType.CombineComponent,
    Emoji: '🥤',
    ServeCondition: Conditions.cooked
  }
};





