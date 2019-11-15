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
    // create an ID
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 0;
      }

      // create newItem based on 'income' or 'expense'
      if(type === 'exp') {
       newItem = new Expense(ID, des, val);
      } else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      // push it into database
      data.allItems[type].push(newItem);

      // return newItem
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
    inputBtn: '.add__btn',
    inputIncome: '.income__list',
    inputExpenses: '.expenses__list'

  };


  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },


  addListItem: function(obj, type) {



    var html, newHtml, element;
      //create HTML string with placeholder
    if(type === 'inc') {

      element = DOMstrings.inputIncome;

      html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

    } else if(type === 'exp') {

      element = DOMstrings.inputExpenses;

      html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }

      // replace ph with correct obj

    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', obj.value);

    // insert HTML into the DOM

    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);



  },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };



})();

//APP controller
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


var addItem = function() {
  var input, newItem;
  // get the input field data
 input = UICtrl.getInput();
  //console.log(input);

  //add the item to the budget controller
  newItem = bdgtCtrl.addItem(input.type, input.description, input.value);
  //console.log(newItem);


  // add the item to the UI
  UICtrl.addListItem(newItem, input.type);

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
