// const end = () => {
//   setTimeout(() => {
//     console.log('learning Ajax');
//   }, 2000);
// }

// const first = () => {
//   console.log('hey!!!!');
//   end();
//   console.log("I'm here");
// }

// first();
//end();


function getRecipe() {
  setTimeout (() => {
    const recipeID = [123, 234, 345, 456, 567];
    console.log(recipeID);
    setTimeout (id => {
      const recipe = {
        title: 'Kylling Kebab',
        publisher: 'Tulasi'
      };
      console.log(`${id}: ${recipe.title}`);
      setTimeout (publisher => {
        const recipe2 = {
          title: 'Ice-cream',
          publisher: 'Tulasi'
        };
        //console.log(recipe);
        console.log(recipe2);

      }, 1000, recipe.publisher);
    }, 1000, recipeID[1]);
  }, 2000);
}
getRecipe();
