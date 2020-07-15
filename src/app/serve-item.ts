export enum ServeItemType
{
  Meat,
  Bread,
  MeatAndBread,
  Drink,
}

export class ServeItem
{

  constructor(
    public itemType: ServeItemType,
    public cookedAmount: number = 0
  ) {}


  getDisplayText()
  {
    return ServeItemType[this.itemType];
  }

  doProcessTick()
  {
    if(this.cookedAmount < 100) {
        this.cookedAmount += 10;
    }
  }

  canCombine(other: ServeItem): boolean {
    //Look at rule until find matching
    const canCombine = VALID_ITEM_COMBINATIONS.some(([firstType, secondType, , checkFunction]) => {
      //Check against game rules
      if (firstType == this.itemType
        && secondType == other.itemType
        && checkFunction(this, other)){
          return true;
        }
      else
        return false;
    });

    return canCombine;
  }

  combineWith(other: ServeItem): void {
    if(!this.canCombine(other))
      return;

    //Retrieve first matching combination
    const combination = VALID_ITEM_COMBINATIONS.find(([firstType, secondType]) =>
          firstType == this.itemType && secondType == other.itemType
        );

    this.itemType = combination[2];
  }

  //Icon to show
  getEmoji(): string{
    const emoji = ITEM_EMOJI.find(([serveItemType]) => (serveItemType == this.itemType));
    // show ? when not found
    return emoji?.[1] || '❓';    
  }

}



/* Item Combinations */
type CombineCheckFunc = (a:ServeItem, b:ServeItem) => boolean;
type ICombineDictionary = [ServeItemType, ServeItemType, ServeItemType, CombineCheckFunc];

const isCooked:CombineCheckFunc = function (a:ServeItem){
    return a.cookedAmount == 100;
}

const VALID_ITEM_COMBINATIONS: ICombineDictionary[] = [ 
  [ServeItemType.Meat, ServeItemType.Bread, ServeItemType.MeatAndBread, isCooked] 
];



/* Emojis */

type IItemEmojiDictionary = [ServeItemType, string];
const ITEM_EMOJI: IItemEmojiDictionary[]  = [
    [ServeItemType.Meat, '🥩'],
    [ServeItemType.Bread, '🍞'],
    [ServeItemType.MeatAndBread, '🥪'],
    [ServeItemType.Drink, '🥤']
];





