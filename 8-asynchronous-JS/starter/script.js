const end = () => {
  setTimeout(() => {
    console.log('learning Ajax');
  }, 2000);
}

const first = () => {
  console.log('hey!!!!');
  end();
  console.log("I'm here");
}

first();
//end();
