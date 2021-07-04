// TODO: hacer en un formulario
function setupCharacter() {
  character = new Character(adventurer);
  character.name = 'Gummiees';
  character.color = color('red');
  character.addClass(wizard);
}

class Character {
  private _x: number;
  private _y: number;
  private _experience: number;
  private _name: string;
  private _inventory: Inventory = new Inventory(PERSON_MONEY_START);
  private _unlockedClasses: RPGClass[] = [];
  private _color: p5.Color;

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
  public get experience(): number {
    return this._experience;
  }
  public set experience(value: number) {
    this._experience = value;
  }
  public get color(): p5.Color {
    return this._color;
  }
  public set color(value: p5.Color) {
    this._color = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get inventory(): Inventory {
    return this._inventory;
  }
  public set inventory(value: Inventory) {
    this._inventory = value;
  }
  public get unlockedClasses(): RPGClass[] {
    return this._unlockedClasses;
  }
  public set unlockedClasses(value: RPGClass[]) {
    this._unlockedClasses = value;
  }

  constructor(defaultClass: RPGClass) {
    this.experience = 0;
    this.x = 16;
    this.y = 16;

    // By default, the Aventurer is unlocked.
    this.unlockedClasses.push(defaultClass);
    // TODO: Setup an initial random inventory
  }

  public draw() {
    push();
    noStroke();
    fill(this.color);
    rect(0, 0, this.x, this.y);
    pop();
  }

  public addClass(rpgClass: RPGClass) {
    if (this.unlockedClasses.every((_rpgClass) => _rpgClass.id !== rpgClass.id)) {
      this.unlockedClasses.push(rpgClass);
    }
  }

  public isClassUnlocked(newRpgClass: RPGClass): boolean {
    for (const rpgClass of this.unlockedClasses) {
      if (rpgClass.id === newRpgClass.id) {
        return true;
      }
    }
    return false;
  }
}
