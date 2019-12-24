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

/*
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
*/
/***************************************************
************** Functions **************************
***************************************************/

const getIDs = new Promise ((resolve, reject) => {
  setTimeout (() => {
    resolve([123, 234, 345, 456, 567]);
  }, 1500);

});

const getRecipe = recipeID => {
  return new Promise ((resolve, reject) => {
    setTimeout(ID => {
      const recipe = {
          title: 'Kylling Kebab',
          publisher: 'Tulasi'
        };
        resolve(`${ID}: ${recipe.title}`);
    }, 1500, recipeID)
  });
};

const getPublisher = publisher => {
  return new Promise ((resolve, reject) => {
    setTimeout(pub => {
      const recipe2 = {
            title: 'Ice-cream',
            publisher: 'Tulasi'
          };
          resolve(`${pub}: ${recipe2.title}`);

      }, 1000, publisher);
  });
};
// if promise is resolved(.then) or rejected(.catch)
/********************************************************************
***************************** Promises ******************************
*********************************************************************/
getIDs
.then(IDs => {
  console.log(IDs); // then for resolve
  return getRecipe(IDs[3]);
})
.then(recipe => {
  console.log(recipe);
  return getPublisher('Tulasi');
})
.then(recipe2 => {
  console.log(recipe2);
})
.catch(error => {
  console.log('Error Found!!!!'); // catch for reject
})
