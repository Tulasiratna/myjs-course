import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
/*****************************************************
*************** SEARCH CONTROLLER ********************
*****************************************************/
const cntrlSearch = async () => {
  // get query from view
  const query = searchView.getInput();
  //console.log(query);

  if (query) {
    //2. new search object and add it to state
    state.search = new Search(query);

    //3. prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    //4. serach for recipes
    await state.search.getResults();

    //5. render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }

}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  cntrlSearch();

});

elements.searchResultPage.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();

    searchView.renderResults(state.search.result, goToPage);


  }
});


/***
Recipe controller
**/
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
