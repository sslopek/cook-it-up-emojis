
export enum ServeItemType
{
  HotDog,
  Drink
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
    //TODO: check station type and update status
    if(this.cookedAmount < 100) {
        this.cookedAmount += 10;
    }

  }

  //Icon to show
  getEmoji(): string{
    switch (this.itemType) {
      case ServeItemType.HotDog:    
        return '🌭';
      case ServeItemType.Drink:    
        return '🥤';  
      default:
        return '❓';
    }
    
  }


}