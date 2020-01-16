import axios from 'axios';

class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            // const res = await axios(`https://forkify-api.herokuapp.com/api/get?key=${key}&rId=${this.id}`);
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert(`Something went wrong :'(`);
        }
    }

    calculateTime() {
        // Assuming that we need 15 mins for each 3 ingredients
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }

    parsingIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIngredient;
            if(unitIndex > -1) {
                // There is a unit
                // E.g. 4 1/2 cups, arrCount is [4, 1/2]  ---> "4+1/2" ---> 4.5
                // E.g. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIngredient = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if(parseInt(arrIng[0], 10)) {
                // There is no unit, but 1st element is number
                objIngredient = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };

            } else if(unitIndex === -1) {
                // There is no unit and NO number in 1st number
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            
            return objIngredient;

        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {

        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients 
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        })

        this.servings = newServings;

    }
}

export default Recipe;