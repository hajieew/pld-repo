class Character {
  constructor(name, health, power) {
    this._name = name;
    this._health = health;
    this._power = power;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== "string") throw new TypeError("Name must be string");
    this._name = value;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    if (typeof value !== "number") throw new TypeError("Health must be number");
    this._health = value;
  }

  get power() {
    return this._power;
  }

  set power(value) {
    if (typeof value !== "number") throw new TypeError("Power must be number");
    this._power = value;
  }

  describe() {
    return this.name + " | HP: " + this.health + " | Power: " + this.power;
  }

  static battle(first, second) {
    let firstAttack = 0;
    let secondAttack = 0;

    if (first instanceof Warrior) {
      firstAttack = first.attack();
    } else if (first instanceof Mage) {
      firstAttack = first.castSpell();
    }

    if (second instanceof Warrior) {
      secondAttack = second.attack();
    } else if (second instanceof Mage) {
      secondAttack = second.castSpell();
    }

    if (firstAttack > secondAttack) {
      return "Winner: " + first.name;
    } else if (secondAttack > firstAttack) {
      return "Winner: " + second.name;
    } else {
      return "Draw";
    }
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.health;
    }
    return this.describe();
  }
}

class Warrior extends Character {
  constructor(name, health, power) {
    super(name, health, power);
    this._shield = 0;
  }

  set shield(value) {
    if (typeof value !== "number") throw new TypeError("Shield must be number");
    this._shield = value;
  }

  get shield() {
    return this._shield;
  }

  attack() {
    return this.power + this.shield / 2;
  }
}

class Mage extends Character {
  constructor(name, health, power) {
    super(name, health, power);
    this._mana = 0;
  }

  set mana(value) {
    if (typeof value !== "number") throw new TypeError("Mana must be number");
    this._mana = value;
  }

  get mana() {
    return this._mana;
  }

  castSpell() {
    if (this.mana > 0) {
      return this.power * 2;
    }
    return 0;
  }
}

// Test
const g = new Mage("Gandalf", 80, 40);
g.mana = 10;

const a = new Warrior("Aragorn", 100, 30);
a.shield = 20;

console.log(Character.battle(g, a));
console.log(`${a}`);
console.log(+g);
