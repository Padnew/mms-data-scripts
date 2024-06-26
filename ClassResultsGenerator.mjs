import fs from "fs";
import randn from "@stdlib/random-base-improved-ziggurat";
import { parse } from "csv-parse/sync";

//Arguments from the command line
const args = process.argv.slice(2);
const cohortFile = args[0];
const classCode = args[1];
const desiredAverage = parseFloat(args[2]);
const desiredStdDeviation = parseFloat(args[3]);

function GenerateClassResults(
  cohortFile,
  classCode,
  average,
  standardDeviation
) {
  //Input validation and associated error messages
  if (cohortFile.slice(-4).toLowerCase() !== ".csv") {
    console.error(
      "Error: None CSV input\nEnsure any file chosen ends in '.csv'"
    );
    return;
  } else if (average > 100 || average < 0) {
    console.error(
      "Error: Average not in valid range\nEnsure average is within 0-100"
    );
    return;
  } else if (classCode.length !== 5) {
    console.error(
      "Error: Invalid class code\nEnsure class code follows the format 'LetterLetter+3DigitNumber' such as SE445"
    );
    return;
  } else if (standardDeviation < 0) {
    console.error(
      "Error: Standard deviation not in valid range\nEnsure standard deviation is greater than 0"
    );
    return;
  }
  //Cohort must exist in the cohorts folder
  const filePath = `GeneratedFiles/Cohorts/${cohortFile}`;
  const data = fs.readFileSync(filePath, "utf8");
  const cohortData = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  var fileHeader =
    "ClassCode,RegistrationNumber,Result,Student,DegreeLevel,CourseName,UniqueCode\n";
  var fileName = `ClassFile${classCode}${cohortFile.slice(-8, -4)}.csv`;

  var fileContents = fileHeader;
  // the result is ranged between 0-100 where randn() is a ziggurat number on the standard distribution
  //The ziggurat number is multiplied by the standardDeviation and the average is added to place it somewhere surrounding the mean
  cohortData.forEach((student) => {
    var result = Math.max(
      0,
      Math.min(Math.round(randn() * standardDeviation + average), 100)
    );
    //Create the unique code from various bits of their information
    var uniqueCode =
      student.CourseName.substring(0, 2).toUpperCase() +
      student.Student.substring(0, 2).toUpperCase() +
      student.RegistrationNumber.substring(5, 7).toUpperCase() +
      classCode.substring(2, 5).toUpperCase();
    fileContents += `${classCode},${student.RegistrationNumber},${result},${student.Student},${student.DegreeLevel},${student.CourseName},${uniqueCode}\n`;
  });
  //Write the file to to generated files
  fs.writeFileSync(`GeneratedFiles/${fileName}`, fileContents);
}

//If parameters are missing then give an example usage
if (args.length < 4) {
  console.log(
    "Missing params, format is: node ClassGenerator.mjs <CohortFile> <ClassCode> <Average> <StandardDeviation>\nExample: node ClassResultsGenerator.mjs CohortOf2022.csv CS426 70 15"
  );
} else {
  GenerateClassResults(
    cohortFile,
    classCode,
    desiredAverage,
    desiredStdDeviation
  );
}

export default GenerateClassResults;
