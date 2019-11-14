// BUDGET CONTROLLER
var budgetController = (function() {


})();

// UI CONTROLLER
var UIController = (function() {



})();

// APP CONTROLLER
var Controller = (function(bgtCtrl, UICtrl) {

var addItem = function() {


  // code

  console.log('just for testing');

};

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



})(budgetController, UIController);
