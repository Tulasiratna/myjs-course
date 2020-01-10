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

    try {
      //4. serach for recipes
    await state.search.getResults();

    //5. render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);

    } catch(error) {
      alert('something wrong with the search...');
      clearLoader();
    }

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


/*****************************************************
*************** RECIPE CONTROLLER ********************
*****************************************************/
/******* just for testing ****************************************
      const r = new Recipe(46956);
      r.getRecipe();
      console.log(r);
**********************************/

const cntrlRecipe = async () => {
  // get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // prepare UI for changes

    // create new recipe object
    state.recipe = new Recipe(id);

    try {

      // get recipe data
    await state.recipe.getRecipe();
    // calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    //render recipe
    console.log(state.recipe);

    } catch(error) {
      alert('Error processing recipe!!!!!!!');
    }

  }

};

//window.addEventListener('hashchange', cntrlRecipe);
//window.addEventListener('load', cntrlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, cntrlRecipe));

