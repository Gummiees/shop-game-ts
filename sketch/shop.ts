function setupShop() {
  shop = new Shop(SHOP_START_EXP_REQUIRED, SHOP_EXP_REQUIRED_FACTOR);
}

class Shop {
  private static MAX_LEVEL: number = 10;
  private static SMALL_WALL_WIDTH: number = 350;

  private _level: number;
  // Experience required for the next level
  private _nextLevelExp: number;
  // Factor that decides how much exp more you will need to level up again
  private _expRequiredFactor: number;
  private _tables: Table[] = [];

  public get level(): number {
    return this._level;
  }
  public set level(value: number) {
    this._level = value;
  }
  public get nextLevelExp(): number {
    return this._nextLevelExp;
  }
  public set nextLevelExp(value: number) {
    this._nextLevelExp = value;
  }
  public get expRequiredFactor(): number {
    return this._expRequiredFactor;
  }
  public set expRequiredFactor(value: number) {
    this._expRequiredFactor = value;
  }
  public get tables(): Table[] {
    return this._tables;
  }
  public set tables(value: Table[]) {
    this._tables = value;
  }

  constructor(startLevelExp: number, expRequiredFactor: number) {
    this.level = 1;
    this.nextLevelExp = startLevelExp;
    this.expRequiredFactor = expRequiredFactor;
    this.addTable();
  }

  public canLevelUp(experience: number): boolean {
    return experience >= this.nextLevelExp && this.level < Shop.MAX_LEVEL;
  }

  public levelUp(experience: number): number {
    if (this.canLevelUp(experience)) {
      this.level++;
      // The nextLevelExp, if it was 100, now it will be 100 + 160 = 260
      this.nextLevelExp += Math.round(this.nextLevelExp * this.expRequiredFactor);
      // Leveling up creates a new table.
      this.addTable();
      return experience - this.nextLevelExp;
    }
    return experience;
  }

  public draw() {
    push();
    // Draw walls
    this.drawWalls();
    // Draw tables
    this.drawTables();
    pop();
  }

  private drawWalls() {
    stroke(255);
    const startX: number = Math.round(WIDTH / 2 - SHOP_WALL_WIDTH / 2);
    const endX: number = Math.round(WIDTH / 2 + SHOP_WALL_WIDTH / 2);
    const endY: number = HEIGHT - SHOP_WALL_MARGIN_BOTTOM;
    const startY: number = endY - SHOP_WALL_HEIGHT;

    const endSmallX: number = startX + Shop.SMALL_WALL_WIDTH;
    const startSmallX: number = endX - Shop.SMALL_WALL_WIDTH;

    // Top left line
    line(startX, startY, endSmallX, startY);
    // Top right line
    line(startSmallX, startY, endX, startY);
    // Left line
    line(startX, startY, startX, endY);
    // Right line
    line(endX, startY, endX, endY);
    // Bottom line
    line(startX, endY, endX, endY);
  }

  private drawTables() {
    for (const table of this.tables) {
      table.draw();
    }
  }

  private addTable() {
    const tablePosition: number[] = Utils.getTablePosition(this.level);
    this.tables.push(
      new Table(
        TABLE_START_EXP_REQUIRED,
        TABLE_EXP_REQUIRED_FACTOR,
        TABLE_STARTING_SIZE,
        tablePosition[0],
        tablePosition[1],
        tablePosition[2],
        tablePosition[3]
      )
    );
  }
}
