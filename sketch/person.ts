class Person {
  private static ID: number = 1;
  private static BOX_SIZE: number = 24;
  private static IN_SHOP_PERCENT: number = 0.25;

  // TODO: Should money be something to have on NPCs?
  private _wishlist: Inventory = new Inventory(0);
  private _rpgClass: RPGClass;
  private _speed: number;
  private _x: number;
  private _y: number;
  private _boxWidth: number = Person.BOX_SIZE;
  private _boxHeight: number = Person.BOX_SIZE;
  private _maxX: number = Math.round(WIDTH / 2 - this.boxWidth / 2);
  private _maxY: number = Math.round(HEIGHT / 2 + HEIGHT / 16);
  private _minY: number;
  private _movingY: boolean = false;
  private _id: number;
  private _ltr: boolean;
  private _goesToShop: boolean;
  private _wentInShop: boolean = false;
  private _canBuy: boolean;
  private _thinking: boolean = false;
  private _time: number;
  private _timeThinking: number = 5000;

  public get wishlist(): Inventory {
    return this._wishlist;
  }
  public set wishlist(value: Inventory) {
    this._wishlist = value;
  }
  public get rpgClass(): RPGClass {
    return this._rpgClass;
  }
  public set rpgClass(value: RPGClass) {
    this._rpgClass = value;
  }
  public get speed(): number {
    return this._speed;
  }
  public set speed(value: number) {
    this._speed = value;
  }
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }
  public get boxWidth(): number {
    return this._boxWidth;
  }
  public set boxWidth(value: number) {
    this._boxWidth = value;
  }
  public get boxHeight(): number {
    return this._boxHeight;
  }
  public set boxHeight(value: number) {
    this._boxHeight = value;
  }
  public get maxX(): number {
    return this._maxX;
  }
  public set maxX(value: number) {
    this._maxX = value;
  }
  public get maxY(): number {
    return this._maxY;
  }
  public set maxY(value: number) {
    this._maxY = value;
  }
  public get minY(): number {
    return this._minY;
  }
  public set minY(value: number) {
    this._minY = value;
  }
  public get movingY(): boolean {
    return this._movingY;
  }
  public set movingY(value: boolean) {
    this._movingY = value;
  }
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get ltr(): boolean {
    return this._ltr;
  }
  public set ltr(value: boolean) {
    this._ltr = value;
  }
  public get goesToShop(): boolean {
    return this._goesToShop;
  }
  public set goesToShop(value: boolean) {
    this._goesToShop = value;
  }
  public get wentInShop(): boolean {
    return this._wentInShop;
  }
  public set wentInShop(value: boolean) {
    this._wentInShop = value;
  }
  public get thinking(): boolean {
    return this._thinking;
  }
  public set thinking(value: boolean) {
    this._thinking = value;
  }
  public get canBuy(): boolean {
    return this._canBuy;
  }
  public set canBuy(value: boolean) {
    this._canBuy = value;
  }
  public get time(): number {
    return this._time;
  }
  public set time(value: number) {
    this._time = value;
  }
  public get timeThinking(): number {
    return this._timeThinking;
  }
  public set timeThinking(value: number) {
    this._timeThinking = value;
  }

  constructor(rpgClass: RPGClass, isClassUnlocked: boolean) {
    this.id = Person.ID++;
    this.ltr = Utils.randomBoolean();
    this.goesToShop = random(0, 1) <= Person.IN_SHOP_PERCENT;
    this.speed = random(1, 2);
    this.minY = Math.round(random(10, 100));
    this.canBuy = isClassUnlocked;
    this.rpgClass = rpgClass;

    this.setInitialPosition();
    this.wishlist.setRandomWishlist(rpgClass);
  }

  draw() {
    fill(this.rpgClass.rpgColor);
    noStroke();
    push();
    this.calculatePosition();
    this.buyingItem();
    rect(this.x, this.y, this.boxWidth, this.boxHeight);
    pop();
  }

  public removePerson(): boolean {
    return this.x + this.boxWidth < 0 || this.x > WIDTH;
  }

  private setInitialPosition() {
    this.y = this.minY;
    if (this.ltr) {
      this.x = 0;
    } else {
      this.x = WIDTH - this.boxWidth;
    }
  }

  private calculatePosition() {
    if (this.y >= this.maxY && !this.wentInShop) {
      // He reached the bottom of the shop.
      this.y = this.maxY;
      this.thinking = true;
      this.wentInShop = true;
      // Comenzar temporizador
      this.time = millis();
    }

    if (this.thinking && millis() >= this.timeThinking + this.time) {
      this.thinking = false;
    }

    if (!this.thinking) {
      // Moving

      if (
        this.goesToShop &&
        ((!this.wentInShop && this.ltr && this.x >= this.maxX) || (!this.ltr && this.x <= this.maxX) || (this.wentInShop && this.y > this.minY))
      ) {
        // Move Y
        this.movingY = true;
        if (!this.wentInShop) {
          // It's moving on the Y towards the shop
          this.y += this.speed;
        } else if (this.y > this.minY) {
          // It's moving on the Y away from the shop
          this.y -= this.speed;
        }
      }

      if (this.goesToShop && this.y <= this.minY && this.movingY && this.wentInShop) {
        this.movingY = false;
      }

      if (!this.movingY) {
        // Move X
        if (this.ltr) {
          // It's moving LTR on the X
          this.x += this.speed;
        } else {
          // It's moving RTL on the X
          this.x -= this.speed;
        }
      }
    }
  }

  private buyingItem() {
    if (this.thinking && this.canBuy) {
      // TODO
    }
  }
}
