"use strict";

const fs = require("fs");

// npm init
// npm install

const generateArrayFromCSV = function () {
  let summaryArray = fs.readFileSync("summaries/Thierry_Henry.txt", "utf-8"); // read file and convert from CSV to string

  summaryArray = summaryArray.split("\n"); // split strings at the spaces and convert into arrays

  for (let i = 0; i < summaryArray.length; i++) {
    summaryArray[i] = summaryArray[i].replace(/\t/g, " "); // this removes all the random /t characters within the strings
  }

  summaryArray = summaryArray.filter(Boolean); // this filters out any empty strings, as empty strings are falsy

  return summaryArray;
};

let summaryArray = generateArrayFromCSV();

console.log(summaryArray);

/////////////////////////////////////////////

let personalInfo = [];

const generatePersonalInfo = function (summaryArray) {
  while (summaryArray[0] !== "Youth career") {
    let infoItem = summaryArray.splice(0, 1).toString();
    personalInfo.push(infoItem);
  }
};

generatePersonalInfo(summaryArray); // this removes all the club information

console.log(personalInfo);

/////////////////////////////////////////////////////

const removeSpaces = function (summaryArray) {
  while (summaryArray[summaryArray.length - 1][0].match(/\d/g) === null) {
    summaryArray.pop();
  }
};

removeSpaces(summaryArray); // TODO continue writing functions from this point
// this remove the Senior club appearances and Honours, as the first string of these array    items don't contain a number
// removes the last element in the array

/////////////////////////////////////////////////////////

let youthPeriod = [];
let seniorPeriod = [];
let nationalPeriod = [];
let managementPeriod = [];

if (summaryArray[0] === "Youth career") {
  while (summaryArray[0] !== "Senior career*") {
    // filter the first section (youth career) into separate array
    let item = summaryArray.shift();
    youthPeriod.push(item);
  }
}

///////////////////////////

if (
  summaryArray[0] === "Senior career*" &&
  (summaryArray.includes("National team‡") ||
    summaryArray.includes("National team"))
) {
  while (summaryArray[0][0] !== "N") {
    let item = summaryArray.shift(); // filter the second section (senior career) into separate array
    seniorPeriod.push(item);
  }
} else {
  seniorPeriod = summaryArray;
}

///////////////

if (summaryArray[0][0] === "N" && summaryArray.includes("Teams managed")) {
  while (summaryArray[0][0] !== "T") {
    // filter the national career into separate array if they have a management career as well
    let item = summaryArray.shift();
    nationalPeriod.push(item);
  }
  managementPeriod = summaryArray; // if they have a management career, the remainder of the summary array will become the management career
} else if (
  summaryArray.includes("National team‡") ||
  summaryArray.includes("National team")
) {
  // make sure non-national and manager types don't get remainder assigned
  nationalPeriod = summaryArray; // if they have a national career and no management career, then the remainder of the summary array will be their national career
}

console.log(summaryArray);
console.log(youthPeriod);
console.log(seniorPeriod);
console.log(nationalPeriod);
console.log(managementPeriod);

///////////////////////////////////// Youth Career ///////////////////////////////////////////////////////////

let youthYears = [];
let youthClubs = [];

youthPeriod.shift(); // removes "youth" string, which is first item in array
for (let i = 0; i < youthPeriod.length; i++) {
  let splitArray = youthPeriod[i].split(" "); // splits youthPeriod array into groups of strings
  let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
  youthYears.push(dateItem); // pushes date to its own array
  let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
  youthClubs.push(rejoinClubs); // pushes clubs onto youthClubs array
}

console.log(youthClubs); // TODO // could do, could use regular expression to remove [] and 123 characters from robbie savage youth clubs
console.log(youthYears);
console.log(youthPeriod);

//   //////////////////////////////////// Senior Career ///////////////////////////////////////////////////////////

let seniorYears = [];
let seniorClubs = [];
let seniorApps = [];
let seniorGoals = [];

if (seniorPeriod[seniorPeriod.length - 1][0].match(/\d/g) === null) {
  // removes "Total numApps numGoals" from end of array if applicable
  seniorPeriod.pop();
}

seniorPeriod.splice(0, 2); // removes "Senior career*" and "Years Team Apps (Gls)" from list

for (let i = 0; i < seniorPeriod.length; i++) {
  let splitArray = seniorPeriod[i].split(" ");
  let dateItem = splitArray.shift();
  seniorYears.push(dateItem);
  let goalsItem = splitArray.pop();
  seniorGoals.push(goalsItem);
  let appsItem = splitArray.pop();
  seniorApps.push(appsItem);
  let rejoinClubs = splitArray.join(" ");
  seniorClubs.push(rejoinClubs);
}

console.log(seniorYears);
console.log(seniorClubs);
console.log(seniorApps);
console.log(seniorGoals);

console.log(seniorPeriod);

//   //////////////////////////////////// International Career ///////////////////////////////////////////////////////////

// Truthy/falsy check. If national period .length is empty (evaluates to zero), it will evaluate to false.
// if true, national length has items in it, so the if code block will execute.

let nationalYears = [];
let nationalGroups = [];
let nationalApps = [];
let nationalGoals = [];

if (Boolean(nationalPeriod.length)) {
  nationalPeriod.splice(0, 1); // this removes first item in array called "national team" so that just data is present

  for (let i = 0; i < nationalPeriod.length; i++) {
    let splitArray = nationalPeriod[i].split(" ");
    let dateItem = splitArray.shift();
    nationalYears.push(dateItem);
    let goalsItem = splitArray.pop();
    nationalGoals.push(goalsItem);
    let appsItem = splitArray.pop();
    nationalApps.push(appsItem);
    let rejoinGroups = splitArray.join(" ");
    nationalGroups.push(rejoinGroups);
  }
}

console.log(nationalYears);
console.log(nationalGroups);
console.log(nationalApps);
console.log(nationalGoals);

//   //////////////////////////////////// Managerial Career ///////////////////////////////////////////////////////////

let managementYears = [];
let managementClubs = [];

if (Boolean(managementPeriod.length)) {
  managementPeriod.shift(); // this removes first item in array called "national team" so that just data is present

  for (let i = 0; i < managementPeriod.length; i++) {
    let splitArray = managementPeriod[i].split(" "); // splits managementPeriod array into groups of strings
    let dateItem = splitArray.shift(); // removes the first string (date) from the group of strings
    managementYears.push(dateItem); // pushes date to its own array
    let rejoinClubs = splitArray.join(" "); // re-join the split array to make them strings again
    managementClubs.push(rejoinClubs); // pushes clubs onto managementClubs array
  }
}

console.log(managementClubs);
console.log(managementYears);
console.log(managementPeriod);

// ///////////////////////////////////////////// generate html //////////////////////////////////////////////////

// // youthTable = "<table><thead><tr><th> Years </th> <th> Youth Clubs</th></tr></thead><tbody>";

// // for (let i = 0; i < youthYears.length; i++) {
// //     youthTable += "<tr><td>"  + youthYears[i] + "</td><td>" + youthClubs[i] + '</td></tr>';
// // }

// // youthTable += "</tbody></table>";

// // // Display data in HTML table

// // youthTableHTML.innerHTML = youthTable;
