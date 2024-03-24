import { faker } from "@faker-js/faker";
import fs from "fs";
import { randomInt } from "crypto";

function GenerateCohort(year) {
  if (year.length !== 4 || isNaN(parseInt(year, 10))) {
    console.error(
      "Error: Invalid or no year parameter\nExample: node CohortGenerator.mjs 1738"
    );
    return;
  }
  var fileName = `GeneratedFiles/Cohorts/CohortOf${year}.csv`;
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
    var regNumber = `${year}${randomInt(10000, 99999)}`;
    var student = `${faker.person.firstName()} ${faker.person.lastName()}`;
    var degreeLevel = degreeLevelEnum[randomInt(0, degreeLevelEnum.length)];
    var courseName = courseNameEnum[randomInt(0, courseNameEnum.length)];
    fileContents += `${regNumber},${student},${degreeLevel},${courseName}\n`;
  }

  console.log(`Generated ${studentCount} students for the cohort of ${year}.`);
  fs.writeFileSync(fileName, fileContents);
}

const args = process.argv.slice(2);

if (args.length === 0 || args[0].length != 4) {
  console.error(
    "Error: Paramater of year must be called\nExample: node CohortGenerator.mjs 1738"
  );
} else {
  const year = args[0];
  GenerateCohort(year);
}

export default GenerateCohort;
