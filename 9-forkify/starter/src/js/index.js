import Search from './models/Search';

const state = {};

const cntrlSearch = async () => {
  // get query from view
  const query = 'pizza';

  if (query) {
    //2. new search object and add it to state
    state.search = new Search(query);

    //3. prepare UI for results

    //4. serach for recipes
    await state.search.getResults();

    //5. render results on UI
    console.log(state.search.result);
  }

}

document.querySelector('.search').addEventListener('submit', event => {
  event.preventDefault();
  cntrlSearch();


});


