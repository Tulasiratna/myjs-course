import Search from './models/Search';
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
  console.log(query);

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


