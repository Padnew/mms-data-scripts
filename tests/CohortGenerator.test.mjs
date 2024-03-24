import GenerateCohort from "../CohortGenerator.mjs";

describe("Tests validity of CohortGenerator.mjs", () => {
  test("Generates between 100->150 students", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const testYear = "1769";

    GenerateCohort(testYear);

    const logs = consoleSpy.mock.calls[0][0];
    const match = /Generated (\d+) students/.exec(logs);
    const generatedStudentCount = parseInt(match[1], 10);

    expect(generatedStudentCount).toBeGreaterThanOrEqual(100);
    expect(generatedStudentCount).toBeLessThanOrEqual(150);
  });

  test("Doesn't run if an invalid year is given", () => {
    const consoleSpy = jest.spyOn(console, "error");
    const testYear = "12345";

    GenerateCohort(testYear);

    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Invalid or no year parameter\nExample: node CohortGenerator.mjs 1738"
    );
  });

  test("Doesn't run if a string is given as parameter", () => {
    const consoleSpy = jest.spyOn(console, "error");
    const testYear = "test";

    GenerateCohort(testYear);

    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Invalid or no year parameter\nExample: node CohortGenerator.mjs 1738"
    );
  });

  test("Doesn't run if no parameter is given", () => {
    const consoleSpy = jest.spyOn(console, "error");
    const testYear = "";

    GenerateCohort(testYear);

    const logs = consoleSpy.mock.calls[0][0];

    expect(logs).toBe(
      "Error: Invalid or no year parameter\nExample: node CohortGenerator.mjs 1738"
    );
  });
});
