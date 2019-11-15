// BUDGET CONTROLLER
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

 var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // allExpenses = [];
  // allIncomes = [];
  // totalExpenses = 0;


  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
    var newItem, ID;
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 0;
      }
      if(type === 'exp') {
       newItem = new Expense(ID, des, val);
      } else {
        newItem = new Income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function() {
      console.log(data);
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
var Controller = (function(bdgtCtrl, UICtrl) {

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
  var input, newItem;
  // get the input field data
 input = UICtrl.getInput();
  //console.log(input);

  //add the item to the budget controller
  newItem = bdgtCtrl.addItem(input.type, input.description, input.value);
  //console.log(newItem);


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
