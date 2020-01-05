import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {};

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
    //4. serach for recipes
    await state.search.getResults();

    //5. render results on UI
    searchView.renderResults(state.search.result);
  }

}

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  cntrlSearch();


});


