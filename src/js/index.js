// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global State of the app
 * - Search object
 * - Current recipe object
 * - Liked recipe
 */
const state = {

};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {

    // 1. Get the query from view
    const query = searchView.getInput(); //TODO
    // TESTING
    // const query = 'pizza';

    if(query) {
        
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);
        
        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render the results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert(`Something went wrong with the search :'(`);
            clearLoader();
        }

    }

};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
});

// TESTING
// window.addEventListener('load', (e) => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResultPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage); 
    }
});


/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
    // Get ID from the URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {

        // 1. Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // EXTRA: Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // 2. Create new recipe object
        state.recipe = new Recipe(id);
        // TESTING
        // window.r = state.recipe;

        try {
            // 3. Get the recipe data and parse ingredients
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients);
            state.recipe.parsingIngredients();
            // console.log(state.recipe);

            // 4. Calculate servings and time
            state.recipe.calculateTime();
            state.recipe.calculateServings();

            // 5. Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch(error) {
            alert('Error processing recipe!');
            console.log(error);
        }

    }
};

//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach((e) => window.addEventListener(e, controlRecipe));