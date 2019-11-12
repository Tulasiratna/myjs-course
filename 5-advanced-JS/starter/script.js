var jonas = {
  name: 'Jonas',
  yearOfBirth: 1989,
  job: 'engineer'
};

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

