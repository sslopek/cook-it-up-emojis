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

  doGameTick()
  {
    if(this.itemType !== ServeItemType.Meat)
      return;

    //TODO: check station type and update status
    if(this.cookedAmount < 100) {
        this.cookedAmount += 10;
    }
  }

  canCombine(other: ServeItem): boolean {
    //Look at rule until find matching
    const canCombine = VALID_ITEM_COMBINATIONS.some(tuple => {
      const [firstType, secondType, combinedType, checkFunction] = tuple;

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
    const combination = VALID_ITEM_COMBINATIONS.find(tuple =>
          tuple[0] == this.itemType && tuple[1] == other.itemType
        );

    this.itemType = combination[2];
  }

  //Icon to show
  getEmoji(): string{
    const emoji = ITEM_EMOJI.find(e => (e[0] == this.itemType));
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





