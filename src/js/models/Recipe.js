import axios from 'axios';

class Recipe {
    constructor(query) {
        this.query = query;
        // this.id = id;
    }

    async getRecipe() {
        try {
            // const res = await axios(`https://forkify-api.herokuapp.com/api/get?key=${key}&rId=${this.id}`);
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        } catch(error) {
            console.log(error);
        }
    }
}

export default Recipe;