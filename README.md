# Package Sorter

A JavaScript function for sorting packages in Thoughtful's robotic automation factory based on their dimensions and mass.

## Overview

The `sort()` function dispatches packages to the correct stack according to their volume and mass, helping robotic arms handle packages appropriately.

## Function Signature

```javascript
sort(width, height, length, mass)
```

### Parameters
- `width` (number): Package width in centimeters
- `height` (number): Package height in centimeters  
- `length` (number): Package length in centimeters
- `mass` (number): Package mass in kilograms

### Returns
- `string`: Stack name where the package should be dispatched

## Sorting Rules

### Package Classification
- **Bulky**: Volume ≥ 1,000,000 cm³ OR any dimension ≥ 150 cm
- **Heavy**: Mass ≥ 20 kg

### Stack Assignment
- **STANDARD**: Packages that are neither bulky nor heavy
- **SPECIAL**: Packages that are either bulky OR heavy (but not both)
- **REJECTED**: Packages that are both bulky AND heavy

## Usage

```javascript
const sort = require('./package-sorter');

// Standard package
console.log(sort(10, 10, 10, 5)); // "STANDARD"

// Bulky package (large dimension)
console.log(sort(200, 10, 10, 5)); // "SPECIAL"

// Bulky package (large volume)
console.log(sort(100, 100, 100, 5)); // "SPECIAL"

// Heavy package
console.log(sort(10, 10, 10, 25)); // "SPECIAL"

// Both bulky and heavy
console.log(sort(200, 10, 10, 25)); // "REJECTED"
```

## Running the Code

```bash
node package-sorter.js
```

This will run the included test cases and display the results.
