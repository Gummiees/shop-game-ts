class Inventory {
  private static ID: number = 1;
  private static RANDOM_ITEM_CHANCES: number = 0.75;

  private _id: number;
  private _items: Item[];
  private _money: number;

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get items(): Item[] {
    return this._items;
  }
  public set items(items: Item[]) {
    this._items = [...items];
  }

  public get money(): number {
    return this._money;
  }
  public set money(money: number) {
    this._money = money;
  }

  constructor(money: number) {
    this.id = Inventory.ID++;
    this.money = money;
  }

  // Can only add the item if it is not already on the table and there is enough size left on it.
  public addItem(newItem: Item) {
    if (this.items.every((item) => newItem.id !== item.id)) {
      this.items.push(newItem);
    }
  }

  public removeItem(oldItem: Item) {
    this.items = this.items.filter((item) => item.id !== oldItem.id);
  }

  public addMoney(money: number) {
    this.money += money;
  }

  public removeMoney(money: number) {
    this.money -= money;
  }

  public setRandomWishlist(rpgClass: RPGClass) {
    // TODO: Setup an initial random inventory
    this.items = this.addRandomItem(rpgClass.items, [], 1);
    if (!this.items.length) {
      // Add random item
      this.addItem(Utils.getRandom(rpgClass.items));
    }
  }

  private addRandomItem(originalItems: Item[], addedItems: Item[], chances: number): Item[] {
    const added: boolean = random(1) <= chances;
    if (added) {
      // Get a random item from the ones that have not been added yet.
      const randomItem: Item = Utils.getRandom(originalItems);
      // Make sure that it wasn't added before by any chance AND that it should be added by the chances of it
      const canAddItem: boolean = random(1) <= randomItem.probabilities;
      if (canAddItem && addedItems.every((item) => item.id !== randomItem.id)) {
        addedItems.push(randomItem);
      }

      // Rarity goes from 1 to 5. The more rare, the less common to want it, since it's supposed to be something not everyone can buy.
      // Remove the one that has been already added, so it cannot be added again.
      originalItems = originalItems.filter((item) => item.id !== randomItem.id);
      // Call it again, dividing the probabilities of adding a new one.
      addedItems = this.addRandomItem(originalItems, addedItems, chances * Inventory.RANDOM_ITEM_CHANCES);
    }
    return addedItems;
  }
}
