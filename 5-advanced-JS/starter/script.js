/*
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
*/

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
