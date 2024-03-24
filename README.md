# mms-data-scripts

This repository contains two Node.js scripts designed to generate CSV files for the Mark-Management-System project.

## Scripts

- `CohortGenerator.mjs`: Generates a cohort of students for a given year
- `ClassResultsGenerator.mjs`: Generates class results for a specified cohort provided by the latter script

## Prerequisites

Node must be installed on your machine to run the scripts

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/padnew/mms-data-scripts.git
cd mms-data-scripts
```

## Usage
# Generating a Cohort
To generate a cohort for a specific year, run the following command:

```node CohortGenerator.mjs <Year>```
Example:

```node CohortGenerator.mjs 2022```

# Generating Class Results
To generate class results for a specific cohort file, class code, average, and standard deviation, use:

```node ClassResultsGenerator.mjs <CohortFile> <ClassCode> <Average> <StandardDeviation>```
Example:

```node ClassResultsGenerator.mjs CohortOf2022.csv CS426 70 15```