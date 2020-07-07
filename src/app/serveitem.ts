
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

  //Icon to show
  getEmoji(): string{
    switch (this.itemType) {
      case ServeItemType.Meat:    
        return '🥩';
      case ServeItemType.Bread:    
        return '🍞';
      case ServeItemType.MeatAndBread:    
        return '🥪';
      case ServeItemType.Drink:   
        return '🥤';
      default:
        return '❓';
    }
    
  }


}