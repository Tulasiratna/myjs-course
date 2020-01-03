// Global app controller
import string from './models/Search';
// 3 ways to import views
//1. import { add, multiply, ID} from './views/searchView';
//2. import { add as a, multiply as m, ID} from './views/searchView';
//3rd way//
import * as searchView from './views/searchView';
// 1. console.log(`using import functions!!!!! ${add(ID, 4)} and ${multiply(2, 4)}. ${string}`);
// 2. console.log(`using import functions!!!!! ${a(ID, 4)} and ${m(2, 4)}. ${string}`);
console.log(`using import functions!!!!! ${searchView.add(searchView.ID, 4)} and ${searchView.multiply(2, 4)}. ${string}`);

