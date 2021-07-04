class Table {
  private static ID: number = 1;
  private static MAX_LEVEL: number = 7;
  private static SIZE_W: number = 128;
  private static SIZE_H: number = 48;
  private static TEXT_SIZE: number = 14;
  private static MARGIN: number = 50;

  /*
   * Coordinates for the tables depending on the level of the shop.
   * The position + 1 is the level representing.
   * On the int[]:
   *   - 0: x
   *   - 1: y
   *   - 2: w
   *   - 3: h
   */
  public static get TABLE_POSITIONS(): number[][] {
    return [
      // The bottom one
      [
        Math.round(WIDTH / 2 - Table.SIZE_W / 2),
        Math.round(HEIGHT - Table.MARGIN - SHOP_WALL_MARGIN_BOTTOM - Table.SIZE_H),
        Table.SIZE_W,
        Table.SIZE_H,
      ],

      // The two around the center bottom one
      [
        Math.round(WIDTH / 2 - SHOP_WALL_WIDTH / 2 + Table.MARGIN),
        HEIGHT - Table.MARGIN - SHOP_WALL_MARGIN_BOTTOM - Table.SIZE_H,
        Table.SIZE_W,
        Table.SIZE_H,
      ],
      [
        Math.round(WIDTH / 2 + SHOP_WALL_WIDTH / 2 - Table.MARGIN - Table.SIZE_W),
        HEIGHT - Table.MARGIN - SHOP_WALL_MARGIN_BOTTOM - Table.SIZE_H,
        Table.SIZE_W,
        Table.SIZE_H,
      ],

      // The two at the top of the shop
      [
        Math.round(WIDTH / 2 - SHOP_WALL_WIDTH / 2 + Table.MARGIN),
        HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + Table.MARGIN,
        Table.SIZE_W,
        Table.SIZE_H,
      ],
      [
        Math.round(WIDTH / 2 + SHOP_WALL_WIDTH / 2 - Table.MARGIN - Table.SIZE_W),
        HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + Table.MARGIN,
        Table.SIZE_W,
        Table.SIZE_H,
      ],

      // The two on the middle of the shop
      [
        Math.round(WIDTH / 2 - Table.MARGIN - Table.SIZE_W),
        Math.round(HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + SHOP_WALL_HEIGHT / 2 - Table.SIZE_H / 2),
        Table.SIZE_W,
        Table.SIZE_H,
      ],
      [
        Math.round(WIDTH / 2 + Table.MARGIN),
        Math.round(HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + SHOP_WALL_HEIGHT / 2 - Table.SIZE_H / 2),
        Table.SIZE_W,
        Table.SIZE_H,
      ],

      // These two ones are "flipped", so I use the table h instead of w, and vice-versa.
      [
        Math.round(WIDTH / 2 - SHOP_WALL_WIDTH / 2 + Table.MARGIN),
        Math.round(HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + SHOP_WALL_HEIGHT / 2 - Table.SIZE_W / 2),
        Table.SIZE_H,
        Table.SIZE_W,
      ],
      [
        Math.round(WIDTH / 2 + SHOP_WALL_WIDTH / 2 - Table.MARGIN - Table.SIZE_H),
        Math.round(HEIGHT - SHOP_WALL_MARGIN_BOTTOM - SHOP_WALL_HEIGHT + SHOP_WALL_HEIGHT / 2 - Table.SIZE_W / 2),
        Table.SIZE_H,
        Table.SIZE_W,
      ],
    ];
  }

  private _id: number;
  private _level: number;
  // Experience required for the next level
  private _nextLevelExp: number;
  // Factor that decides how much exp more you will need to level up again
  private _expRequiredFactor: number;
  private _x: number;
  private _y: number;
  private _boxWidth: number;
  private _boxHeight: number;
  private _items: Item[] = [];
  private _size: number;

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get level(): number {
    return this._level;
  }
  public set level(level: number) {
    this._level = level;
  }
  public get nextLevelExp(): number {
    return this._nextLevelExp;
  }
  public set nextLevelExp(requiredExp: number) {
    this._nextLevelExp = requiredExp;
  }
  public get items(): Item[] {
    return this._items;
  }
  public set items(items: Item[]) {
    this._items = [...items];
  }
  public get size() {
    return this._size;
  }
  public set size(size: number) {
    this._size = size;
  }
  public get expRequiredFactor() {
    return this._expRequiredFactor;
  }
  public set expRequiredFactor(expRequiredFactor: number) {
    this._expRequiredFactor = expRequiredFactor;
  }
  public get x() {
    return this._x;
  }
  public set x(x: number) {
    this._x = x;
  }
  public get y() {
    return this._y;
  }
  public set y(y: number) {
    this._y = y;
  }
  public get boxWidth() {
    return this._boxWidth;
  }
  public set boxWidth(boxWidth: number) {
    this._boxWidth = boxWidth;
  }
  public get boxHeight() {
    return this._boxHeight;
  }
  public set boxHeight(boxHeight: number) {
    this._boxHeight = boxHeight;
  }

  public get sizeLeft() {
    let sizeLeft: number = this.size;
    for (const item of this.items) {
      sizeLeft -= item.size;
    }

    return sizeLeft;
  }

  public get sizeOccupied(): number {
    return this.size - this.sizeLeft;
  }

  constructor(startLevelExp: number, expRequiredFactor: number, size: number, x: number, y: number, w: number, h: number) {
    this.id = Table.ID++;
    this.level = 1;
    this.size = size;
    this.x = x;
    this.y = y;
    this.boxWidth = w;
    this.boxHeight = h;
    this.nextLevelExp = startLevelExp;
    this.expRequiredFactor = expRequiredFactor;
  }

  public canAddItem(item: Item): boolean {
    return item.size <= this.sizeLeft;
  }

  public addItem(item: Item) {
    // Can only add the item if it is not already on the table and there is enough size left on it.
    if (this.items.every((_item) => _item.id !== item.id) && this.canAddItem(item)) {
      this.items.push(item);
    }
  }

  public removeItem(item: Item) {
    this.items.filter((_item) => _item.id !== item.id);
  }

  public canLevelUp(experience: number): boolean {
    // Can only level up if the experience is enough and the level is not the max level.
    return experience >= this.nextLevelExp && this.level < Table.MAX_LEVEL;
  }

  public levelUp(experience: number): number {
    if (this.canLevelUp(experience)) {
      this.level++;
      // The nextLevelExp, if it was 100, now it will be 100 + 160 = 260
      this.nextLevelExp += Math.round(this.nextLevelExp * this.expRequiredFactor);
      // Leveling up adds one space to the table.
      this.size++;
      return experience - this.nextLevelExp;
    }
    return experience;
  }

  public draw() {
    push();
    noFill();
    stroke(255);
    rect(this.x, this.y, this.boxWidth, this.boxHeight);
    pop();

    push();
    fill(255);
    // textSize(Table.TEXT_SIZE);
    textAlign(CENTER, CENTER);
    text(str(this.sizeLeft), this.x, this.y, this.boxWidth, this.boxHeight);
    pop();
  }
}
