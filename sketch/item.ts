class Item {
  private static ID: number = 1;

  private _id: number;
  private _itemName: string;
  private _originalPrice: number;
  private _sellingPrice: number;
  private _rarity: number;
  private _probabilities: number;
  private _size: number;

  public get itemName(): string {
    return this._itemName;
  }
  public set itemName(name: string) {
    this._itemName = name;
  }
  public get originalPrice(): number {
    return this._originalPrice;
  }
  public set originalPrice(originalPrice: number) {
    this._originalPrice = originalPrice;
  }
  public get sellingPrice(): number {
    return this._sellingPrice;
  }
  public set sellingPrice(sellingPrice: number) {
    this._sellingPrice = sellingPrice;
  }
  public get rarity(): number {
    return this._rarity;
  }
  public set rarity(rarity: number) {
    this._rarity = rarity;
  }
  public get size(): number {
    return this._size;
  }
  public set size(size: number) {
    this._size = size;
  }
  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get probabilities(): number {
    return this._probabilities;
  }
  public set probabilities(probabilities: number) {
    this._probabilities = probabilities;
  }

  public constructor(itemName: string, price: number, rarity: number, size: number) {
    this.id = Item.ID++;
    this.itemName = itemName;
    this.originalPrice = price;
    this.sellingPrice = price;
    this.rarity = rarity;
    this.size = size;
    this.setProbabilitiesByRarity(rarity);
  }

  private setProbabilitiesByRarity(rarity: number): void {
    switch (rarity) {
      case 1:
        this.probabilities = INVENTORY_CHANCES_RARITY_1;
        break;
      case 2:
        this.probabilities = INVENTORY_CHANCES_RARITY_2;
        break;
      case 3:
        this.probabilities = INVENTORY_CHANCES_RARITY_3;
        break;
      case 4:
        this.probabilities = INVENTORY_CHANCES_RARITY_4;
        break;
      case 5:
        this.probabilities = INVENTORY_CHANCES_RARITY_5;
        break;
    }
  }
}

function setupItems() {
  items = [
    // RPG Adventurer + generics
    new Item('Sword', 125, 1, 2),
    new Item('Shield', 200, 1, 3),
    new Item('Heal Potion', 25, 1, 1),
    new Item('Mana Potion', 25, 1, 1),
    new Item('Leather Gloves', 40, 1, 1),
    new Item('Leather Boots', 40, 1, 1),
    new Item('Leather Belt', 40, 1, 1),
    new Item('Leather Helmet', 125, 1, 2),
    new Item('Leather Chestplate', 200, 1, 3),
    new Item('Leather Pants', 125, 1, 2),
    // RPG Wizard
    new Item('Wand', 150, 1, 2),
    new Item('Sorcery book', 250, 1, 3),
    new Item('Silver Ring', 50, 1, 1),
    new Item('Enchanted Ring', 100, 3, 1),
    new Item('Cloak', 150, 1, 2),
    new Item('Wizard hat', 150, 1, 2),
  ];
}
