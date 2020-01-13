// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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

    if(query) {
        
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);
        
        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render the results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

    }

};

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
});

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
const r = new Recipe();