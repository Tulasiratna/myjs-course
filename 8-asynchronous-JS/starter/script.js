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
/*
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
*/
// if promise is resolved(.then) or rejected(.catch)
/********************************************************************
***************************** Promises ******************************
*********************************************************************/
/*
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
*/
/*
async function getRecipesAW() {
  const IDs = await getIDs;
  console.log(IDs);
  const recipe = await getRecipe(IDs[3]);
  console.log(recipe);
  const publisher = await getPublisher('Tulasi');
  console.log(publisher);

  return recipe;
}

//getRecipesAW();
getRecipesAW().then(resolve => {
  console.log(`${resolve} is always best ever dish`);
  });
*/
function getWeather(woeid) {
  fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
  .then(response => {
    //console.log(response);
    return response.json();
  })
  .then(data => {
    const today = data.consolidated_weather[3];
    console.log(`Today's Temperature in ${data.title} between ${today.min_temp} and ${today.max_temp}`);
  })
  .catch(error => {
    console.log(error);
  })
}
getWeather(44418);
getWeather(2487956);

async function getWeatherAW(woeid) {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    const data = await response.json();
    //console.log(data);

    const tomarrow = data.consolidated_weather[0];
    console.log(`Tomarrow's Temperature in ${data.title} between ${tomarrow.min_temp} and ${tomarrow.max_temp}`);
    return data;
  } catch(error) {
    alert(error);
  }
}
let dataLondon;
getWeatherAW(44418).then(data => {
  dataLondon = data;
  console.log(dataLondon);
});
let dataSanFransisco;
getWeatherAW(2487956).then(data => {
  dataSanFransisco = data;
  console.log(dataSanFransisco);
});
