
var jonas = {
  name: 'Jonas',
  yearOfBirth: 1989,
  job: 'engineer'
};
// function constructor (alwayas starts with capital letter (like Person))

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
  }
Person.prototype.lastName = 'Reddy';

var jonas = new Person('Jonas', 1989, 'engineer');
var divith = new Person('Divith', 2017, 'still student');
var soumya = new Person('Soumya', 1986, 'designer');
jonas.calculateAge();
divith.calculateAge();
soumya.calculateAge();

console.log(jonas.lastName);
console.log(divith.lastName);
console.log(soumya.lastName);

 // Object.create
var personProto = {
  calculateAge: function() {
    console.log(2019 - this.yearOfBirth);
  }
};

var james = Object.create(personProto);
james.name = 'James';
james.yearOfBirth = 1992;
james.job = 'designer';

var sarah = Object.create(personProto, {
  name: { value: 'Sarah'},
  yearOfBirth: { value: 1988},
  job: { value: 'engineer'}
});



// primitives
var a = 32;
var b = a;
a = 23;

console.log(a);
console.log(b);

// objects

var person1 = {
  name: 'Lilly',
  age: 20
};
var person2 = person1;
person1.age = 25;
console.log(person1.age);
console.log(person2.age);

// functions
var age = 28;
var person = {
  name: 'Tulasi',
  city: 'Oslo'
};

function mutate(a, b) {
  a = 27;
  b.city = 'Stockholm';
}

mutate(age, person);

console.log(age);
console.log(person.city);


// passing functions as arguemrnts


var years = [1990, 1989, 2017, 1962, 1970];

function arrCalc(years, fn) {
  var result = [];
  for (var i = 0; i < years.length; i++) {
    result.push(fn(years[i]));
  }

  return result;
}

function calculateAge(element) {
  return 2019 - element;
}

function isFullAge(element) {
  return element >= 18;
}

function maxHeartRate(element) {
  if (element >= 18 && element <= 81) {
    return Math.round(206.9 - (0.67 * element));
  } else {
    return -1;
  }
}
var ages = arrCalc(years, calculateAge);
console.log(ages);
var fullAge = arrCalc(ages, isFullAge);
//console.log(fullAge);
var rates = arrCalc(ages, maxHeartRate);
console.log(rates);

// functions returns functions


function interviewQuestion(job) {
  if (job === 'teacher') {
    return function(name) {
      console.log(name + ', What subject do you teach?');
    }
  } else if (job === 'designer') {
    return function(name) {
      console.log(name + ', Can you explain the differance between UI & UX?');
    }
  } else {
    return function(name) {
      console.log('Hello ' + name + ', What do you do?');
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('Bob');
designerQuestion('Tulasi');

interviewQuestion('painter')('Mark');
interviewQuestion('designer')('Sarah');

// Immediate invoked function expression (IIFE)

function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}

game();

(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);


(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(3);

// closures

function retirement(retirementAge) {
  var a = ' years left untill retirement';
  return function(yearOfBirth) {
    var age = 2019 - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

var retirementSweden = retirement(65);
var retirementIndia = retirement(60);
retirementSweden(1990);
retirement(60)(1990);
// one more example for closure
function interviewQuestion(job) {
  return function(name) {
    if (job === 'teacher') {
      console.log(name + ', What subject do you teach?');
  } else if (job === 'designer') {
      console.log(name + ', Can you explain the differance between UI & UX?');
    }else{
      console.log('Hello ' + name + ', What do you do?');
    }
  }
}
// var teacherQuestion = interviewQuestion('teacher');
// var designerQuestion = interviewQuestion('designer');

// teacherQuestion('Bob');
// designerQuestion('Tulasi');

interviewQuestion('painter')('Mark');
interviewQuestion('designer')('Sarah')

// bind, call and apply

var john = {
  name: 'John',
  age: 29,
  job: 'designer',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
  } else if (style === 'friendly') {
      console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
    }
  }
};

// john.presentation('friendly', 'morning');
var sony = {
  name: 'Sony',
  age: 32,
  job: 'teacher'
};
// call method
john.presentation.call(sony, 'formal', 'afternoon');

// apply method
john.presentation.apply(sony, ['formal', 'afternoon']);

// bind method
var johnFriendly = john.presentation.bind(john,'friendly');
johnFriendly('morning')

var sonyFormal = john.presentation.bind(sony, 'formal');
sonyFormal('afternoon');

// another example

var years = [1990, 1989, 2017, 1962, 1970];

function arrCalc(years, fn) {
  var result = [];
  for (var i = 0; i < years.length; i++) {
    result.push(fn(years[i]));
  }

  return result;
}

function calculateAge(element) {
  return 2019 - element;
}

function isFullAge(limit, element) {
  return element >= limit;
}

var ages = arrCalc(years, calculateAge);
console.log(ages);

var fullIndia = arrCalc(ages, isFullAge.bind(this, 21));
console.log(fullIndia);




