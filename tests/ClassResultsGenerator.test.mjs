import GenerateClassResults, {
  loadCohortData,
} from "../ClassResultsGenerator.mjs";
import fs from "fs";
import { parse } from "csv-parse/sync";

describe("Tests validity of ClassResultsGenerator.mjs", () => {
  const cohortFile = "../../tests/TestFiles/CohortOfTest.csv";
  const classCode = "TC101";
  const desiredAverage = 70;
  const desiredStdDeviation = 10;
  GenerateClassResults(
    cohortFile,
    classCode,
    desiredAverage,
    desiredStdDeviation
  );
  const filePath = `GeneratedFiles/ClassFileTC101Test.csv`;
  const data = fs.readFileSync(filePath, "utf8");
  const cohortData = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });
  const results = cohortData.map((student) => Number(student.Result));
  const average =
    results.reduce((sum, current) => sum + current, 0) / results.length;

  test("Average of students is same as desired average", () => {
    expect(Math.abs(average - desiredAverage) / 100).toBeLessThanOrEqual(0.05);
  });

  test("Standard deviation of results is same as desired", () => {
    const standardDeviation = Math.sqrt(
      results
        .reduce((acc, val) => acc.concat((val - average) ** 2), [])
        .reduce((acc, val) => acc + val, 0) /
        (results.length - 1)
    );
    expect(
      Math.abs(standardDeviation - desiredStdDeviation) / 100
    ).toBeLessThanOrEqual(0.05);
  });

  test("Doesn't run if none CSV is chosen", () => {
    const consoleSpy = jest.spyOn(console, "error");

    GenerateClassResults("Test.txt", "CS234", 100, 10);
    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: None CSV input\nEnsure any file chosen ends in '.csv'"
    );
    jest.restoreAllMocks();
  });

  test("Doesn't run if average is less than 0", () => {
    const consoleSpy = jest.spyOn(console, "error");

    GenerateClassResults("test.csv", "CS234", -100, 10);
    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Average not in valid range\nEnsure average is within 0-100"
    );
    jest.restoreAllMocks();
  });

  test("Doesn't run if average is greater than 100", () => {
    const consoleSpy = jest.spyOn(console, "error");

    GenerateClassResults("test.csv", "CS234", 101, 10);
    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Average not in valid range\nEnsure average is within 0-100"
    );
    jest.restoreAllMocks();
  });

  test("Only accepts valid class code", () => {
    const consoleSpy = jest.spyOn(console, "error");

    GenerateClassResults("test.csv", "CS1234", 70, 10);
    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Invalid class code\nEnsure class code follows the format 'LetterLetter+3DigitNumber' such as SE445"
    );
    jest.restoreAllMocks();
  });

  test("Doesn't accept invalid standard deviation", () => {
    const consoleSpy = jest.spyOn(console, "error");

    GenerateClassResults("test.csv", "CS234", 70, -10);
    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Standard deviation not in valid range\nEnsure standard deviation is greater than 0"
    );
    jest.restoreAllMocks();
  });
});
