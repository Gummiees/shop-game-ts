class ColorHelper {
    static getColorVector(c) {
        return createVector(red(c), green(c), blue(c));
    }
    static rainbowColorBase() {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    }
    static getColorsArray(total, baseColorArray = null) {
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(x => this.getColorVector(x));
        ;
        let colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    }
    static getColorByPercentage(firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    }
}
function setupCharacter() {
    character = new Character(adventurer);
    character.name = 'Gummiees';
    character.color = color('red');
    character.addClass(wizard);
}
class Character {
    constructor(defaultClass) {
        this._inventory = new Inventory(PERSON_MONEY_START);
        this._unlockedClasses = [];
        this.experience = 0;
        this.x = 16;
        this.y = 16;
        this.unlockedClasses.push(defaultClass);
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get experience() {
        return this._experience;
    }
    set experience(value) {
        this._experience = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get inventory() {
        return this._inventory;
    }
    set inventory(value) {
        this._inventory = value;
    }
    get unlockedClasses() {
        return this._unlockedClasses;
    }
    set unlockedClasses(value) {
        this._unlockedClasses = value;
    }
    draw() {
        push();
        noStroke();
        fill(this.color);
        rect(0, 0, this.x, this.y);
        pop();
    }
    addClass(rpgClass) {
        if (this.unlockedClasses.every((_rpgClass) => _rpgClass.id !== rpgClass.id)) {
            this.unlockedClasses.push(rpgClass);
        }
    }
    isClassUnlocked(newRpgClass) {
        for (const rpgClass of this.unlockedClasses) {
            if (rpgClass.id === newRpgClass.id) {
                return true;
            }
        }
        return false;
    }
}
class Inventory {
    constructor(money) {
        this.id = Inventory.ID++;
        this.money = money;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = [...items];
    }
    get money() {
        return this._money;
    }
    set money(money) {
        this._money = money;
    }
    addItem(newItem) {
        if (this.items.every((item) => newItem.id !== item.id)) {
            this.items.push(newItem);
        }
    }
    removeItem(oldItem) {
        this.items = this.items.filter((item) => item.id !== oldItem.id);
    }
    addMoney(money) {
        this.money += money;
    }
    removeMoney(money) {
        this.money -= money;
    }
    setRandomWishlist(rpgClass) {
        this.items = this.addRandomItem(rpgClass.items, [], 1);
        if (!this.items.length) {
            this.addItem(Utils.getRandom(rpgClass.items));
        }
    }
    addRandomItem(originalItems, addedItems, chances) {
        const added = random(1) <= chances;
        if (added) {
            const randomItem = Utils.getRandom(originalItems);
            const canAddItem = random(1) <= randomItem.probabilities;
            if (canAddItem && addedItems.every((item) => item.id !== randomItem.id)) {
                addedItems.push(randomItem);
            }
            originalItems = originalItems.filter((item) => item.id !== randomItem.id);
            addedItems = this.addRandomItem(originalItems, addedItems, chances * Inventory.RANDOM_ITEM_CHANCES);
        }
        return addedItems;
    }
}
Inventory.ID = 1;
Inventory.RANDOM_ITEM_CHANCES = 0.75;
class Item {
    constructor(itemName, price, rarity, size) {
        this.id = Item.ID++;
        this.itemName = itemName;
        this.originalPrice = price;
        this.sellingPrice = price;
        this.rarity = rarity;
        this.size = size;
        this.setProbabilitiesByRarity(rarity);
    }
    get itemName() {
        return this._itemName;
    }
    set itemName(name) {
        this._itemName = name;
    }
    get originalPrice() {
        return this._originalPrice;
    }
    set originalPrice(originalPrice) {
        this._originalPrice = originalPrice;
    }
    get sellingPrice() {
        return this._sellingPrice;
    }
    set sellingPrice(sellingPrice) {
        this._sellingPrice = sellingPrice;
    }
    get rarity() {
        return this._rarity;
    }
    set rarity(rarity) {
        this._rarity = rarity;
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get probabilities() {
        return this._probabilities;
    }
    set probabilities(probabilities) {
        this._probabilities = probabilities;
    }
    setProbabilitiesByRarity(rarity) {
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
Item.ID = 1;
function setupItems() {
    items = [
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
        new Item('Wand', 150, 1, 2),
        new Item('Sorcery book', 250, 1, 3),
        new Item('Silver Ring', 50, 1, 1),
        new Item('Enchanted Ring', 100, 3, 1),
        new Item('Cloak', 150, 1, 2),
        new Item('Wizard hat', 150, 1, 2),
    ];
}
class Person {
    constructor(rpgClass, isClassUnlocked) {
        this._wishlist = new Inventory(0);
        this._boxWidth = Person.BOX_SIZE;
        this._boxHeight = Person.BOX_SIZE;
        this._maxX = Math.round(WIDTH / 2 - this.boxWidth / 2);
        this._maxY = Math.round(HEIGHT / 2 + HEIGHT / 16);
        this._movingY = false;
        this._wentInShop = false;
        this._thinking = false;
        this._timeThinking = 5000;
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
    get wishlist() {
        return this._wishlist;
    }
    set wishlist(value) {
        this._wishlist = value;
    }
    get rpgClass() {
        return this._rpgClass;
    }
    set rpgClass(value) {
        this._rpgClass = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get boxWidth() {
        return this._boxWidth;
    }
    set boxWidth(value) {
        this._boxWidth = value;
    }
    get boxHeight() {
        return this._boxHeight;
    }
    set boxHeight(value) {
        this._boxHeight = value;
    }
    get maxX() {
        return this._maxX;
    }
    set maxX(value) {
        this._maxX = value;
    }
    get maxY() {
        return this._maxY;
    }
    set maxY(value) {
        this._maxY = value;
    }
    get minY() {
        return this._minY;
    }
    set minY(value) {
        this._minY = value;
    }
    get movingY() {
        return this._movingY;
    }
    set movingY(value) {
        this._movingY = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get ltr() {
        return this._ltr;
    }
    set ltr(value) {
        this._ltr = value;
    }
    get goesToShop() {
        return this._goesToShop;
    }
    set goesToShop(value) {
        this._goesToShop = value;
    }
    get wentInShop() {
        return this._wentInShop;
    }
    set wentInShop(value) {
        this._wentInShop = value;
    }
    get thinking() {
        return this._thinking;
    }
    set thinking(value) {
        this._thinking = value;
    }
    get canBuy() {
        return this._canBuy;
    }
    set canBuy(value) {
        this._canBuy = value;
    }
    get time() {
        return this._time;
    }
    set time(value) {
        this._time = value;
    }
    get timeThinking() {
        return this._timeThinking;
    }
    set timeThinking(value) {
        this._timeThinking = value;
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
    removePerson() {
        return this.x + this.boxWidth < 0 || this.x > WIDTH;
    }
    setInitialPosition() {
        this.y = this.minY;
        if (this.ltr) {
            this.x = 0;
        }
        else {
            this.x = WIDTH - this.boxWidth;
        }
    }
    calculatePosition() {
        if (this.y >= this.maxY && !this.wentInShop) {
            this.y = this.maxY;
            this.thinking = true;
            this.wentInShop = true;
            this.time = millis();
        }
        if (this.thinking && millis() >= this.timeThinking + this.time) {
            this.thinking = false;
        }
        if (!this.thinking) {
            if (this.goesToShop &&
                ((!this.wentInShop && this.ltr && this.x >= this.maxX) || (!this.ltr && this.x <= this.maxX) || (this.wentInShop && this.y > this.minY))) {
                this.movingY = true;
                if (!this.wentInShop) {
                    this.y += this.speed;
                }
                else if (this.y > this.minY) {
                    this.y -= this.speed;
                }
            }
            if (this.goesToShop && this.y <= this.minY && this.movingY && this.wentInShop) {
                this.movingY = false;
            }
            if (!this.movingY) {
                if (this.ltr) {
                    this.x += this.speed;
                }
                else {
                    this.x -= this.speed;
                }
            }
        }
    }
    buyingItem() {
        if (this.thinking && this.canBuy) {
        }
    }
}
Person.ID = 1;
Person.BOX_SIZE = 24;
Person.IN_SHOP_PERCENT = 0.25;
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
    constructor(rpgName, rpgColor, probabilities, items) {
        this.id = RPGClass.ID++;
        this.rpgName = rpgName;
        this.rpgColor = rpgColor;
        this.probabilities = probabilities;
        this.items = items;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get rpgName() {
        return this._rpgName;
    }
    set rpgName(rpgName) {
        this._rpgName = rpgName;
    }
    get rpgColor() {
        return this._rpgColor;
    }
    set rpgColor(color) {
        this._rpgColor = color;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = [...items];
    }
    get probabilities() {
        return this._probabilities;
    }
    set probabilities(probabilities) {
        this._probabilities = probabilities;
    }
    generatePerson() {
        return random(0, 1) <= this.probabilities;
    }
}
RPGClass.ID = 1;
function setupShop() {
    shop = new Shop(SHOP_START_EXP_REQUIRED, SHOP_EXP_REQUIRED_FACTOR);
}
class Shop {
    constructor(startLevelExp, expRequiredFactor) {
        this._tables = [];
        this.level = 1;
        this.nextLevelExp = startLevelExp;
        this.expRequiredFactor = expRequiredFactor;
        this.addTable();
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get nextLevelExp() {
        return this._nextLevelExp;
    }
    set nextLevelExp(value) {
        this._nextLevelExp = value;
    }
    get expRequiredFactor() {
        return this._expRequiredFactor;
    }
    set expRequiredFactor(value) {
        this._expRequiredFactor = value;
    }
    get tables() {
        return this._tables;
    }
    set tables(value) {
        this._tables = value;
    }
    canLevelUp(experience) {
        return experience >= this.nextLevelExp && this.level < Shop.MAX_LEVEL;
    }
    levelUp(experience) {
        if (this.canLevelUp(experience)) {
            this.level++;
            this.nextLevelExp += Math.round(this.nextLevelExp * this.expRequiredFactor);
            this.addTable();
            return experience - this.nextLevelExp;
        }
        return experience;
    }
    draw() {
        push();
        this.drawWalls();
        this.drawTables();
        pop();
    }
    drawWalls() {
        stroke(255);
        const startX = Math.round(WIDTH / 2 - SHOP_WALL_WIDTH / 2);
        const endX = Math.round(WIDTH / 2 + SHOP_WALL_WIDTH / 2);
        const endY = HEIGHT - SHOP_WALL_MARGIN_BOTTOM;
        const startY = endY - SHOP_WALL_HEIGHT;
        const endSmallX = startX + Shop.SMALL_WALL_WIDTH;
        const startSmallX = endX - Shop.SMALL_WALL_WIDTH;
        line(startX, startY, endSmallX, startY);
        line(startSmallX, startY, endX, startY);
        line(startX, startY, startX, endY);
        line(endX, startY, endX, endY);
        line(startX, endY, endX, endY);
    }
    drawTables() {
        for (const table of this.tables) {
            table.draw();
        }
    }
    addTable() {
        const tablePosition = Utils.getTablePosition(this.level);
        this.tables.push(new Table(TABLE_START_EXP_REQUIRED, TABLE_EXP_REQUIRED_FACTOR, TABLE_STARTING_SIZE, tablePosition[0], tablePosition[1], tablePosition[2], tablePosition[3]));
    }
}
Shop.MAX_LEVEL = 10;
Shop.SMALL_WALL_WIDTH = 350;
const WIDTH = 1080;
const HEIGHT = 720;
const SHOP_WALL_WIDTH = 800;
const SHOP_WALL_HEIGHT = 480;
const SHOP_WALL_MARGIN_BOTTOM = 50;
const SHOP_START_EXP_REQUIRED = 1000;
const SHOP_EXP_REQUIRED_FACTOR = 1.6;
const PERSON_MONEY_START = 1000;
const INVENTORY_CHANCES_RARITY_1 = 1;
const INVENTORY_CHANCES_RARITY_2 = 0.75;
const INVENTORY_CHANCES_RARITY_3 = 0.5;
const INVENTORY_CHANCES_RARITY_4 = 0.25;
const INVENTORY_CHANCES_RARITY_5 = 0.1;
const RPGCLASS_ADVENTURER_PERCENT = 0.01;
const RPGCLASS_WIZARD_PERCENT = 0.005;
const TABLE_START_EXP_REQUIRED = 250;
const TABLE_EXP_REQUIRED_FACTOR = 1.4;
const TABLE_STARTING_SIZE = 3;
let persons = [];
let time = 0;
let character;
let rpgClasses = [];
let shop;
let adventurer;
let wizard;
let items;
let totalHeight = 22;
function setup() {
    console.log('🚀 - Setup initialized - P5 is running');
    setupItems();
    setupShop();
    setupClasses();
    setupCharacter();
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    clear();
    translate(width / 2, height / 2);
    shop.draw();
    personsFunctions();
    drawUI();
}
function personsFunctions() {
    generatePersons();
    removePersons();
    drawPersons();
}
function generatePersons() {
    for (const rpgClass of rpgClasses) {
        if (rpgClass.generatePerson()) {
            persons.push(new Person(rpgClass, character.isClassUnlocked(rpgClass)));
        }
    }
}
function removePersons() {
    persons = persons.filter((person) => !person.removePerson());
}
function drawPersons() {
    for (const person of persons) {
        person.draw();
    }
}
function drawUI() { }
class Table {
    constructor(startLevelExp, expRequiredFactor, size, x, y, w, h) {
        this._items = [];
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
    static get TABLE_POSITIONS() {
        return [
            [
                Math.round(WIDTH / 2 - Table.SIZE_W / 2),
                Math.round(HEIGHT - Table.MARGIN - SHOP_WALL_MARGIN_BOTTOM - Table.SIZE_H),
                Table.SIZE_W,
                Table.SIZE_H,
            ],
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
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get level() {
        return this._level;
    }
    set level(level) {
        this._level = level;
    }
    get nextLevelExp() {
        return this._nextLevelExp;
    }
    set nextLevelExp(requiredExp) {
        this._nextLevelExp = requiredExp;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = [...items];
    }
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = size;
    }
    get expRequiredFactor() {
        return this._expRequiredFactor;
    }
    set expRequiredFactor(expRequiredFactor) {
        this._expRequiredFactor = expRequiredFactor;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get boxWidth() {
        return this._boxWidth;
    }
    set boxWidth(boxWidth) {
        this._boxWidth = boxWidth;
    }
    get boxHeight() {
        return this._boxHeight;
    }
    set boxHeight(boxHeight) {
        this._boxHeight = boxHeight;
    }
    get sizeLeft() {
        let sizeLeft = this.size;
        for (const item of this.items) {
            sizeLeft -= item.size;
        }
        return sizeLeft;
    }
    get sizeOccupied() {
        return this.size - this.sizeLeft;
    }
    canAddItem(item) {
        return item.size <= this.sizeLeft;
    }
    addItem(item) {
        if (this.items.every((_item) => _item.id !== item.id) && this.canAddItem(item)) {
            this.items.push(item);
        }
    }
    removeItem(item) {
        this.items.filter((_item) => _item.id !== item.id);
    }
    canLevelUp(experience) {
        return experience >= this.nextLevelExp && this.level < Table.MAX_LEVEL;
    }
    levelUp(experience) {
        if (this.canLevelUp(experience)) {
            this.level++;
            this.nextLevelExp += Math.round(this.nextLevelExp * this.expRequiredFactor);
            this.size++;
            return experience - this.nextLevelExp;
        }
        return experience;
    }
    draw() {
        push();
        noFill();
        stroke(255);
        rect(this.x, this.y, this.boxWidth, this.boxHeight);
        pop();
        push();
        fill(255);
        textAlign(CENTER, CENTER);
        text(str(this.sizeLeft), this.x, this.y, this.boxWidth, this.boxHeight);
        pop();
    }
}
Table.ID = 1;
Table.MAX_LEVEL = 7;
Table.SIZE_W = 128;
Table.SIZE_H = 48;
Table.TEXT_SIZE = 14;
Table.MARGIN = 50;
class Utils {
    static getTablePosition(level) {
        return Table.TABLE_POSITIONS[level - 1];
    }
    static processInput(text, keyCode, key) {
        if (keyCode === BACKSPACE) {
            if (text.length > 0) {
                text = text.substring(0, text.length - 1);
            }
        }
        else if (keyCode === DELETE) {
            text = '';
        }
        else if (keyCode !== SHIFT && keyCode !== CONTROL && keyCode !== ALT) {
            text = text + key;
        }
        return text;
    }
    static mouseOverCircle(mouseX, mouseY, x, y, diameter) {
        return dist(mouseX, mouseY, x, y) < diameter * 0.5;
    }
    static mouseOverRect(mouseX, mouseY, x, y, w, h) {
        return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
    }
    static isNullOrUndefined(obj) {
        return obj !== null && obj !== undefined;
    }
    static getRandom(list) {
        if (!Array.isArray(list) || !list.length) {
            return null;
        }
        const randomPos = Utils.getRandomPosition(list.length);
        return list[randomPos];
    }
    static getRandomPosition(size) {
        return Math.floor(random(0, size));
    }
    static randomSignum() {
        return Math.round(random(2) * 2 - 1);
    }
    static randomBoolean() {
        return random(1) >= 0.5;
    }
}
//# sourceMappingURL=../sketch/sketch/build.js.map