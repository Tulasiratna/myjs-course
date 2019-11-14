var budgetController = (function() {
  var x = 10;
  var add = function(a) {
    return x+a;
  }
  return {
    publicTest: function(b) {
      return add(b);
    }
  }
})();


var UIController = (function() {



})();


var Controller = (function(bgtCtrl, UICtrl) {

  var c = bgtCtrl.publicTest(5);
  return {
    anotherPublic: function() {
      console.log(c);
    }
  }


})(budgetController, UIController);
