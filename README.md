# Package Sorter

A TypeScript application for sorting packages in Thoughtful's robotic automation factory based on their dimensions and mass.

## Overview

The `sort()` function dispatches packages to the correct stack according to their volume and mass, helping robotic arms handle packages appropriately. Built with TypeScript for enhanced type safety and robust error handling.

## Function Signature

```typescript
sort(width: number, height: number, length: number, mass: number): StackType
```

### Parameters
- `width` (number): Package width in centimeters (must be > 0)
- `height` (number): Package height in centimeters (must be > 0)
- `length` (number): Package length in centimeters (must be > 0)
- `mass` (number): Package mass in kilograms (must be ≥ 0)

### Returns
- `StackType`: One of `'STANDARD'`, `'SPECIAL'`, or `'REJECTED'`

### Throws
- `Error`: When input parameters are invalid (negative, zero dimensions, NaN, or non-numeric)

## Sorting Rules

### Package Classification
- **Bulky**: Volume ≥ 1,000,000 cm³ OR any dimension ≥ 150 cm
- **Heavy**: Mass ≥ 20 kg

### Stack Assignment
- **STANDARD**: Packages that are neither bulky nor heavy
- **SPECIAL**: Packages that are either bulky OR heavy (but not both)
- **REJECTED**: Packages that are both bulky AND heavy

## Installation

```bash
npm install
```

## Usage

### TypeScript
```typescript
import sort, { StackType } from './package-sorter';

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

// Error handling
try {
    sort(-10, 20, 30, 5); // Throws error for negative dimension
} catch (error) {
    console.error(error.message);
}
```

### JavaScript (after compilation)
```javascript
const sort = require('./dist/package-sorter').default;
```

## Development

### Build the project
```bash
npm run build
```

### Run TypeScript directly
```bash
npm run dev
```

### Run compiled JavaScript
```bash
npm start
```

### Run tests
```bash
npm test           # Run TypeScript tests directly
npm run test:build # Build and run compiled tests
npm run test:all   # Run both TypeScript and compiled tests
```

## Type Definitions

```typescript
type StackType = 'STANDARD' | 'SPECIAL' | 'REJECTED';

interface PackageDimensions {
    width: number;
    height: number;
    length: number;
    mass: number;
}
```
