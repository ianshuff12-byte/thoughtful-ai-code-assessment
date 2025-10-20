// Type definitions
type StackType = 'STANDARD' | 'SPECIAL' | 'REJECTED';

interface PackageDimensions {
    width: number;
    height: number;
    length: number;
    mass: number;
}

interface ValidationResult {
    isValid: boolean;
    error?: string;
}

// Constants
const VOLUME_THRESHOLD = 1_000_000; // cm³
const DIMENSION_THRESHOLD = 150; // cm
const MASS_THRESHOLD = 20; // kg

/**
 * Validates package input parameters
 */
function validatePackage(width: number, height: number, length: number, mass: number): ValidationResult {
    // Check if all parameters are numbers
    if (typeof width !== 'number' || typeof height !== 'number' || 
        typeof length !== 'number' || typeof mass !== 'number') {
        return { isValid: false, error: 'All parameters must be numbers' };
    }

    // Check for NaN values
    if (isNaN(width) || isNaN(height) || isNaN(length) || isNaN(mass)) {
        return { isValid: false, error: 'Parameters cannot be NaN' };
    }

    // Check for negative values
    if (width < 0 || height < 0 || length < 0 || mass < 0) {
        return { isValid: false, error: 'Dimensions and mass must be non-negative' };
    }

    // Check for zero dimensions (mass can be zero)
    if (width === 0 || height === 0 || length === 0) {
        return { isValid: false, error: 'Dimensions must be greater than zero' };
    }

    return { isValid: true };
}

/**
 * Determines if a package is bulky based on volume or dimensions
 */
function isBulky(width: number, height: number, length: number): boolean {
    const volume = width * height * length;
    return volume >= VOLUME_THRESHOLD || 
           width >= DIMENSION_THRESHOLD || 
           height >= DIMENSION_THRESHOLD || 
           length >= DIMENSION_THRESHOLD;
}

/**
 * Determines if a package is heavy based on mass
 */
function isHeavy(mass: number): boolean {
    return mass >= MASS_THRESHOLD;
}

/**
 * Sorts packages into appropriate stacks based on their dimensions and mass
 * @param width - Package width in centimeters
 * @param height - Package height in centimeters
 * @param length - Package length in centimeters
 * @param mass - Package mass in kilograms
 * @returns Stack name where the package should be dispatched
 * @throws Error if input parameters are invalid
 */
function sort(width: number, height: number, length: number, mass: number): StackType {
    // Validate input parameters
    const validation = validatePackage(width, height, length, mass);
    if (!validation.isValid) {
        throw new Error(`Invalid package parameters: ${validation.error}`);
    }

    const packageIsBulky = isBulky(width, height, length);
    const packageIsHeavy = isHeavy(mass);

    // Determine stack based on criteria
    if (packageIsBulky && packageIsHeavy) {
        return 'REJECTED';
    } else if (packageIsBulky || packageIsHeavy) {
        return 'SPECIAL';
    } else {
        return 'STANDARD';
    }
}

// Example usage and test cases
if (require.main === module) {
    console.log('Testing TypeScript package sorter:');
    
    try {
        console.log('Small light package (10x10x10, 5kg):', sort(10, 10, 10, 5)); // STANDARD
        console.log('Large package (200x10x10, 5kg):', sort(200, 10, 10, 5)); // SPECIAL (bulky by dimension)
        console.log('High volume package (100x100x100, 5kg):', sort(100, 100, 100, 5)); // SPECIAL (bulky by volume)
        console.log('Heavy package (10x10x10, 25kg):', sort(10, 10, 10, 25)); // SPECIAL (heavy)
        console.log('Large and heavy package (200x10x10, 25kg):', sort(200, 10, 10, 25)); // REJECTED
        
        // Edge case tests
        console.log('\nEdge case tests:');
        console.log('Boundary bulky (150x10x10, 5kg):', sort(150, 10, 10, 5)); // SPECIAL
        console.log('Boundary heavy (10x10x10, 20kg):', sort(10, 10, 10, 20)); // SPECIAL
        console.log('Exact volume threshold (100x100x100, 5kg):', sort(100, 100, 100, 5)); // SPECIAL
        
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
    
    // Test error cases
    console.log('\nTesting error cases:');
    try {
        sort(-10, 20, 30, 5);
    } catch (error) {
        console.log('Negative dimension error:', error instanceof Error ? error.message : String(error));
    }
    
    try {
        sort(0, 20, 30, 5);
    } catch (error) {
        console.log('Zero dimension error:', error instanceof Error ? error.message : String(error));
    }
}

export default sort;
export { StackType, PackageDimensions, sort };
