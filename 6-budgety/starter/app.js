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

  var calculateTotal = function(type) {
    sum = 0;
    data.allItems[type].forEach(function(current) {
      sum += current.value;
    })
    data.total[type] = sum;
  };


  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
    var newItem, ID;
    // create an ID
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 1;
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
    calculateBudget: function() {
    // calculate total income and total expenses
      calculateTotal('inc');
      calculateTotal('exp');
    // calculate budget: total income - tol expense
    data.budget = data.total.inc - data.total.exp;

    // calulate percentage
    data.percentage = Math.round((data.total.exp/data.total.inc) * 100);

    },

    getBudget: function() {
      return {
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        budget: data.budget,
        percentage: data.percentage
      };
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
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

  clearFields: function() {

    var fields, fieldsArr;

    fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

    fieldsArr = Array.prototype.slice.call(fields);
    fieldsArr.forEach(function(current, index, array) {
      current.value = "";

    });
    fieldsArr[0].focus();

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

var updateBudget = function() {

  // calculate budget
  bdgtCtrl.calculateBudget();

  // return budget
  var budget = budgetCtrl.getBudget();
  console.log(budget);

  //display budget on the UI

};


var addItem = function() {
  var input, newItem;
  //1. get the input field data
  input = UICtrl.getInput();
  if (input.description !== "" && !isNaN(input.value) && iput.value > 0) {
  //2.add the item to the budget controller
    newItem = bdgtCtrl.addItem(input.type, input.description, input.value);

    // 3.add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4.clear fields
    UICtrl.clearFields();

   //5.calculate and update budget
    updateBudget();

  }

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
