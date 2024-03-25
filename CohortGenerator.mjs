import { faker } from "@faker-js/faker";
import fs from "fs";
import { randomInt } from "crypto";

function GenerateCohort(year) {
  //If the year is invalid or not a number then throw an example usage
  if (year.length !== 4 || isNaN(parseInt(year, 10))) {
    console.error(
      "Error: Invalid or no year parameter\nExample: node CohortGenerator.mjs 1738"
    );
    return;
  }
  //Generate the file name
  var fileName = `GeneratedFiles/Cohorts/CohortOf${year}.csv`;
  //Hard coded degree levels and course names
  var degreeLevelEnum = ["BSc", "MSc", "PhD"];
  var courseNameEnum = [
    "Software Engineering",
    "Computer Science",
    "Electrical Engineering",
    "Mathematics",
    "Data Analytics",
    "Computer and Electronic Systems",
  ];

  var fileHeader = "RegistrationNumber,Student,DegreeLevel,CourseName\n";
  var fileContents = fileHeader;
  var studentCount = randomInt(100, 150);
  for (let i = 0; i < studentCount; i++) {
    //Reg numbers are 9 digit numbers startin with the year supplied from the parameters
    var regNumber = `${year}${randomInt(10000, 99999)}`;
    //Faker is utilised here to generate those random names
    var student = `${faker.person.firstName()} ${faker.person.lastName()}`;
    //Degree levels and course names are randomly chosen
    var degreeLevel = degreeLevelEnum[randomInt(0, degreeLevelEnum.length)];
    var courseName = courseNameEnum[randomInt(0, courseNameEnum.length)];
    fileContents += `${regNumber},${student},${degreeLevel},${courseName}\n`;
  }
  //Verification that it worked
  console.log(`Generated ${studentCount} students for the cohort of ${year}.`);
  fs.writeFileSync(fileName, fileContents);
}

const args = process.argv.slice(2);
//More input validation on the arguements
if (args.length === 0 || args[0].length != 4) {
  console.error(
    "Error: Paramater of year must be called\nExample: node CohortGenerator.mjs 1738"
  );
} else {
  const year = args[0];
  GenerateCohort(year);
}

export default GenerateCohort;
