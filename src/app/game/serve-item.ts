export class ServeItem
{
  private settings: IItemSettings;

  constructor(
    public foodName: FoodName,
    public cookedAmount: number = 0
  ) {
    const itemSettings = AllItemSettings[foodName];
    this.settings = { ...ItemDefaults, ...itemSettings };
  }

  getDisplayText() {
    return FoodType[this.foodName];
  }

  doProcessTick() {
    if(this.cookedAmount < 100) {
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

    const newSettings = AllItemSettings[this.foodName];
    this.settings = { ...ItemDefaults, ...newSettings };
  }

  //Icon to show
  getEmoji(): string{
    return this.settings.Emoji;    
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

const isCooked:CombineCheckFunc = (a:ServeItem) => a.cookedAmount == 100;
const never:CombineCheckFunc = () => false;
const always:CombineCheckFunc = () => false;


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
  CombineCondition: never,
  ServeCondition : never
}

const AllItemSettings: Record<FoodName, IItemSettings> = {
  [FoodName.Meat]: {   
    Type: FoodType.CombineBase,
    Emoji: '🥩',
    CombineWith: [FoodName.Bread],
    CombineResult: FoodName.Sandwich,
    CombineCondition: isCooked
  },
  [FoodName.Bread]:{
    Type: FoodType.CombineComponent,
    Emoji: '🍞'
  },
  [FoodName.Sandwich]: {
    Type: FoodType.CombineResult,
    Emoji: '🥪',
    ServeCondition: always
  },
  [FoodName.Drink]:{
    Type: FoodType.CombineComponent,
    Emoji: '🥤',
    ServeCondition: isCooked
  }
};





