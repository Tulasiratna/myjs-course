var jonas = {
  name: 'Jonas',
  yearOfBirth: 1989,
  job: 'engineer'
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  this.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
  }
}

var jonas = new Person('Jonas', 1989, 'engineer');

jonas.calculateAge();

var divith = new Person('Divith', 2017, 'still student');
var soumya = new Person('Soumya', 1986, 'designer');
//divith.calculateAge();
