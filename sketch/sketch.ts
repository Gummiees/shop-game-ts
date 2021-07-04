const WIDTH: number = 1080;
const HEIGHT: number = 720;
const SHOP_WALL_WIDTH: number = 800;
const SHOP_WALL_HEIGHT: number = 480;
const SHOP_WALL_MARGIN_BOTTOM: number = 50;
const SHOP_START_EXP_REQUIRED: number = 1000;
const SHOP_EXP_REQUIRED_FACTOR: number = 1.6;
const PERSON_MONEY_START: number = 1000;
const INVENTORY_CHANCES_RARITY_1: number = 1;
const INVENTORY_CHANCES_RARITY_2: number = 0.75;
const INVENTORY_CHANCES_RARITY_3: number = 0.5;
const INVENTORY_CHANCES_RARITY_4: number = 0.25;
const INVENTORY_CHANCES_RARITY_5: number = 0.1;
const RPGCLASS_ADVENTURER_PERCENT: number = 0.01;
const RPGCLASS_WIZARD_PERCENT: number = 0.005;
const TABLE_START_EXP_REQUIRED: number = 250;
const TABLE_EXP_REQUIRED_FACTOR: number = 1.4;
const TABLE_STARTING_SIZE: number = 3;

/*
TODO: Add more items for the classes:
Rogue,
Knight,
Assasin,
Ranger,
Cleric,
Necromancer,
Summoner,
Lancer
*/

let persons: Person[] = [];
let time: number = 0;

// Create the character with the default rpg class (adventurer)
let character: Character;
let rpgClasses: RPGClass[] = [];
let shop: Shop;
let adventurer: RPGClass;
let wizard: RPGClass;
let items: Item[];
let totalHeight: number = 22;

function setup() {
  console.log('🚀 - Setup initialized - P5 is running');

  setupItems();
  setupShop();
  setupClasses();
  setupCharacter();

  createCanvas(windowWidth, windowHeight);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  translate(width / 2, height / 2);

  shop.draw();
  personsFunctions();
  // character.draw();
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

function drawUI() {}
