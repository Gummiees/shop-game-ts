function setupClasses() {
  adventurer = new RPGClass('Adventurer', color(255), RPGCLASS_ADVENTURER_PERCENT, [
    items.find((_item) => _item.itemName === 'Sword'),
    items.find((_item) => _item.itemName === 'Shield'),
    items.find((_item) => _item.itemName === 'Heal Potion'),
    items.find((_item) => _item.itemName === 'Mana Potion'),
    items.find((_item) => _item.itemName === 'Leather Gloves'),
    items.find((_item) => _item.itemName === 'Leather Boots'),
    items.find((_item) => _item.itemName === 'Leather Belt'),
    items.find((_item) => _item.itemName === 'Leather Helmet'),
    items.find((_item) => _item.itemName === 'Leather Chestplate'),
    items.find((_item) => _item.itemName === 'Leather Pants'),
  ]);
  wizard = new RPGClass('Wizard', color(135, 24, 219), RPGCLASS_WIZARD_PERCENT, [
    items.find((_item) => _item.itemName === 'Wand'),
    items.find((_item) => _item.itemName === 'Sorcery book'),
    items.find((_item) => _item.itemName === 'Heal Potion'),
    items.find((_item) => _item.itemName === 'Mana Potion'),
    items.find((_item) => _item.itemName === 'Silver Ring'),
    items.find((_item) => _item.itemName === 'Enchanted Ring'),
    items.find((_item) => _item.itemName === 'Leather Boots'),
    items.find((_item) => _item.itemName === 'Leather Belt'),
    items.find((_item) => _item.itemName === 'Cloak'),
    items.find((_item) => _item.itemName === 'Wizard hat'),
  ]);
  rpgClasses = [adventurer, wizard];
}

class RPGClass {
  private static ID: number = 1;

  private _id: number;
  private _rpgName: string;
  private _rpgColor: p5.Color;
  private _probabilities: number;
  private _items: Item[];

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  public get rpgName(): string {
    return this._rpgName;
  }
  public set rpgName(rpgName: string) {
    this._rpgName = rpgName;
  }

  public get rpgColor(): p5.Color {
    return this._rpgColor;
  }
  public set rpgColor(color: p5.Color) {
    this._rpgColor = color;
  }

  public get items(): Item[] {
    return this._items;
  }
  public set items(items: Item[]) {
    this._items = [...items];
  }

  public get probabilities(): number {
    return this._probabilities;
  }
  public set probabilities(probabilities: number) {
    this._probabilities = probabilities;
  }

  public constructor(rpgName: string, rpgColor: p5.Color, probabilities: number, items: Item[]) {
    this.id = RPGClass.ID++;
    this.rpgName = rpgName;
    this.rpgColor = rpgColor;
    this.probabilities = probabilities;
    this.items = items;
  }

  public generatePerson(): boolean {
    return random(0, 1) <= this.probabilities;
  }
}
