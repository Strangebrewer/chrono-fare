class Food {
  constructor(model) {
    if (!model || typeof model !== 'function')
      throw new Error('A valid model must be given to use this class');

    this.FoodModel = model;
  }

  async newFood() {

  }
}

module.exports = Food;