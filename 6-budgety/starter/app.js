// BUDGET CONTROLLER
var budgetController = (function() {

  var expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

 var income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // allExpenses = [];
  // allIncomes = [];
  // totalExpenses = 0;


  var data = {
    allItems = {
      exp: [],
      inc: []
    },
    total = {
      exp: 0,
      inc: 0
    }
  };

})();

// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };


  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };



})();

// APP CONTROLLER
var Controller = (function(bgtCtrl, UICtrl) {

  var setEventListeners = function() {
    var DOM = UICtrl.getDOMstrings;

    var key = document.querySelector('.add__btn');
    key.addEventListener('click', addItem);
    //console.log('Key was clicked');

    document.addEventListener('keypress', function(event) {
    //console.log(event);
      if (event.keyCode === 13 || event.which === 13) {
      //console.log('ENTER key was pressed');
      addItem();
    }
  });

  };

  var DOM = UICtrl.getDOMstrings;


var addItem = function() {

  // get the input field data
  var input = UICtrl.getInput();
  console.log(input);

  //add the item to the budget controller

  // add the item to the UI

  // budget calculation

  //display budget on the UI



  //console.log('just for testing');

};
  /*******setEventListeners***************/
  /*******setEventListeners***************/


     //  var key = document.querySelector('.add__btn');
     //  key.addEventListener('click', addItem);
     //    //console.log('Key was clicked');

     //  document.addEventListener('keypress', function(event) {
     //    //console.log(event);
     //    if (event.keyCode === 13 || event.which === 13) {
     //      //console.log('ENTER key was pressed');
     //      addItem();
     //    }
     // });
  return {
    init: function() {
      setEventListeners();
    }
  };


})(budgetController, UIController);

Controller.init();
