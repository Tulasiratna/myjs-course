import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }


  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`)
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;

    } catch(error) {
      console.log(error);
      alert('something went wrong :(');
    }
  }

  calcTime() {
    // assuming app 15 min for each 3 ingredients
    const numOfIngredients = this.ingredients.length;
    const periods = Math.ceil(numOfIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];


    const newIngredients = this.ingredients.map(el => {

      //1. uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      //2. remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


      //3. parse ingredients into count, unit and ingredient
      const ingArr = ingredient.split(' ');
      const unitIndex = ingArr.findIndex(el2 => unitsShort.includes(el2));

      let objIng;

      if (unitIndex > -1) {
        // There is a unit
        //ex: 2 1/2 cups arrCount is [2, 1/2] -------> eval("2+12") --> 2.5 cup
        // ex: 3 cups arrCount is [3]
        const arrCount = ingArr.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(ingArr[0].replace('-', '+'));
        } else {
          count = eval(ingArr.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: ingArr[unitIndex],
          ingredient: ingArr.slice(unitIndex + 1).join(' ')
        };

      } else if (parseInt(ingArr[0], 10)) {
        // There is no unit, but there is a number
        objIng = {
          count: parseInt(ingArr[0], 10),
          unit: '',
          ingredient: ingArr.slice(1).join(' ')
        }
      }else if (unitIndex === -1) {
        // There is not unit and no number in first position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }


      return objIng;

    });
    this.ingredients = newIngredients;
  }
}

