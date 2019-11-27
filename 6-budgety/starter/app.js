// BUDGET CONTROLLER
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if(totalIncome > 0) {
    this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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

    deleteItem: function(type, id) {
      var ids, index;
      // id = 4;
      //data.allItems[type][id];
      // ids = [1,2,3,4,5,6];
      // index = 3;

      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function() {
    // calculate total income and total expenses
      calculateTotal('inc');
      calculateTotal('exp');
    // calculate budget: total income - tol expense
      data.budget = data.total.inc - data.total.exp;

    // calulate percentage
      if(data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      }
    },

    calculatePercentage: function() {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.total.inc);
      });

    },

    getBudget: function() {
      return {
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        budget: data.budget,
        percentage: data.percentage
      };
    },

    getPercentages: function() {
      var allPercentages = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });
      return allPercentages;
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
    inputExpenses: '.expenses__list',
    budgetField: '.budget__value',
    incomeField: '.budget__income--value',
    expensesField: '.budget__expenses--value',
    percentageField: '.budget__expenses--percentage',
    container: '.container',
    expensePercentage: '.item__percentage',
    date: '.budget__title--month'
  };

  var nodeListForEach = function(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };

  var formatNumber = function(num, type) {
        var numSplit, intiger, decimal, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        intiger = numSplit[0];
        if (intiger.length > 3) {
            intiger = intiger.substr(0, intiger.length - 3) + ',' + intiger.substr(intiger.length - 3, 3); //input 23510, output 23,510
        }

        decimal = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + intiger + '.' + decimal;

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

      html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

    } else if(type === 'exp') {

      element = DOMstrings.inputExpenses;

      html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }

      // replace ph with correct obj

    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

    // insert HTML into the DOM

    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);



  },

  deleteListItem: function(selectorID) {
    var el;
    el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);

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

  displayBudget: function(obj) {
    var type;
    obj.budget > 0 ? type = 'inc' : type = 'exp' ;

    document.querySelector(DOMstrings.budgetField).textContent = formatNumber(obj.budget,type);
    document.querySelector(DOMstrings.incomeField).textContent = formatNumber(obj.totalInc, 'inc');
    document.querySelector(DOMstrings.expensesField).textContent = formatNumber(obj.totalExp, 'exp');

    if(obj.percentage > 0) {
    document.querySelector(DOMstrings.percentageField).textContent = obj.percentage + '%';
    }else {
    document.querySelector(DOMstrings.percentageField).textContent = '---';
    }


  },

  displayPercentages: function(percentages) {
    var fields = document.querySelectorAll(DOMstrings.expensePercentage);

    nodeListForEach(fields, function(current, index) {

      if (percentages[index] > 0) {
        current.textContent = percentages[index] + '%';
      } else {
        current.textContent = '---';
      }
    });
  },

  displayDate: function() {

    var now, months, month, year;
    now = new Date();

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = now.getMonth();

    year = now.getFullYear();
    document.querySelector(DOMstrings.date).textContent = months[month] + ' ' + year;
  },

  changeType: function() {
    var labels = document.querySelectorAll(
      DOMstrings.inputType + ',' +
      DOMstrings.inputDescription + ',' +
      DOMstrings.inputValue
      )
      nodeListForEach(labels, function(cur) {
        cur.classList.toggle('red-focus');
      });

    document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

  },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();

//APP controller
var Controller = (function(bdgtCtrl, UICtrl) {

  var setEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    //console.log('Key was clicked');

    document.addEventListener('keypress', function(event) {
    //console.log(event);
      if (event.keyCode === 13 || event.which === 13) {
      //console.log('ENTER key was pressed');
      ctrlAddItem();
    }
  });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);


  };

var updateBudget = function() {

  // calculate budget
  bdgtCtrl.calculateBudget();

  // return budget
  var budget = bdgtCtrl.getBudget();
  //console.log(budget);

  //display budget on the UI
  UICtrl.displayBudget(budget);

};

var updatePercentages = function() {
  // calculate percentages
  bdgtCtrl.calculatePercentage();

  // read percentages from budget controller
  var percentages = bdgtCtrl.getPercentages();

  // update new percentages in the UI
  UICtrl.displayPercentages(percentages);
};


var ctrlAddItem = function() {
  var input, newItem;
  //1. get the input field data
  input = UICtrl.getInput();
  if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
  //2.add the item to the budget controller
    newItem = bdgtCtrl.addItem(input.type, input.description, input.value);

    // 3.add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    // 4.clear fields
    UICtrl.clearFields();

   //5.calculate and update budget
    updateBudget();

    //6. calculate & update percentages
    updatePercentages();

  }

};

var ctrlDeleteItem = function(event) {
  var itemID, splitID, type, ID;
  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

  if(itemID) {
    splitID = itemID.split("-");
    type = splitID[0]; // inc or exp
    ID = parseInt(splitID[1]);


    // delete the item from the data structure
    bdgtCtrl.deleteItem(type, ID);


    // delete the item from the UI
    UICtrl.deleteListItem(itemID);

    // update & show the budget
    updateBudget();

    //6. calculate & update percentages
    updatePercentages();
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
      UICtrl.displayDate();
      UICtrl.displayBudget({
        totalInc: 0,
        totalExp: 0,
        budget: 0,
        percentage: -1
      });
      setEventListeners();
    }
  };


})(budgetController, UIController);

Controller.init();
