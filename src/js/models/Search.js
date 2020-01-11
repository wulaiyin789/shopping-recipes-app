import axios from 'axios';

class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}

export default Search;