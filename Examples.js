var bob = {name : 'Bob', age : 42, gender : 'male'};
var alice = {name : 'Alice', age : 28, gender : 'female'};
var franck = {name : 'Franck', age : 17, gender : 'male'};
var michel = {name : 'Michel', age : 23, gender : 'male'};
var emma = {name : 'Emma', age : 23, gender : 'female'};

var barley = {name : "Barley", owner : alice};
var boots = {name : "Boots", owner : franck};
var whiskers = {name : "Whiskers", owner : franck};
var daisy = {name : "Daisy", owner : michel};
var dumbo = {name : "Dumbo", owner : {name : "Henry", age : 54, gender : 'male'}};

var people = [bob, alice, franck, michel, emma];
var pets = [barley, boots, whiskers, daisy, dumbo];

var males = people.filter(person => person.gender == 'male');
/*
[{ name: "Bob", age: 42, gender: "male" },
 { name: "Franck", age: 17, gender: "male" },
 { name: "Michel", age: 23, gender: "male" }]
*/

var females = people.filter(person => person.gender == 'female');
/*
[{ name: "Alice", age: 28, gender: "female" },
 { name: "Emma", age: 23, gender: "female" }]
*/

var couples = males.crossJoin(females, (male, female) => ({maleName : male.name, femaleName : female.name}));
/*
[{ maleName: "Bob", femaleName: "Alice" },
 { maleName: "Bob", femaleName: "Emma" },
 { maleName: "Franck", femaleName: "Alice" },
 { maleName: "Franck", femaleName: "Emma" },
 { maleName: "Michel", femaleName: "Alice" },
 { maleName: "Michel", femaleName: "Emma" }]
*/

var peoplePets = people.innerJoin(pets,
	person => person,
	pet => pet.owner,
	(person, pet) => ({ownerName : person.name, petName : pet.name}));
/*
[{ ownerName: "Alice", petName: "Barley" },
 { ownerName: "Franck", petName: "Boots" },
 { ownerName: "Franck", petName: "Whiskers" },
 { ownerName: "Michel", petName: "Daisy" }]
*/

var peoplePetsLeft = people.leftJoin(pets,
	person => person,
	pet => pet.owner,
	(person, pet) => ({ownerName : person.name, petName : pet.name}));
/*
[{ ownerName: "Bob", petName: undefined },
 { ownerName: "Alice", petName: "Barley" },
 { ownerName: "Franck", petName: "Boots" },
 { ownerName: "Franck", petName: "Whiskers" },
 { ownerName: "Michel", petName: "Daisy" },
 { ownerName: "Emma", petName: undefined }]
*/
	
var peoplePetsRight = people.rightJoin(pets,
	person => person,
	pet => pet.owner,
	(person, pet) => ({ownerName : person.name, petName : pet.name}));
/*
[{ ownerName: "Alice", petName: "Barley" },
 { ownerName: "Franck", petName: "Boots" },
 { ownerName: "Franck", petName: "Whiskers" },
 { ownerName: "Michel", petName: "Daisy" },
 { ownerName: undefined, petName: "Dumbo" }]
*/

var peopleByAge = people.groupBy(person => person.age, 
	person => person.name,
	(age, names) => ({age : age, names : names, count : names.length}));
/*
[{ age: "17", names: [ "Franck" ], count: 1 },
 { age: "23", names: [ "Michel", "Emma" ], count: 2 },
 { age: "28", names: [ "Alice" ], count: 1 },
 { age: "42", names: [ "Bob" ], count: 1 }]
*/

var younger = people.min(person => person.age); // { name: "Franck", age: 17, gender: "male" }
var older = people.max(person => person.age); // { name: "Bob", age: 42, gender: "male" }
var averageAge = people.average(person => person.age); // 26.6

var zip = [1, 2, 3, 4].zip(["one", "two", "three"], (a, b) => a + ' ' + b); // [ "1 one", "2 two", "3 three" ]

var range = Array.range(2, 6); // [ 2, 3, 4, 5 ]

var combinations = [...'abc'].combinations(3).map(a => a.join('')); // [ "abc", "acb", "bac", "bca", "cab", "cba" ]