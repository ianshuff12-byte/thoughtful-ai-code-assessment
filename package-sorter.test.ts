import sort, { StackType } from './package-sorter';

// Test helper function
function runTest(description: string, testFn: () => void): void {
    try {
        testFn();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.log(`❌ ${description}`);
        console.log(`   Error: ${error instanceof Error ? error.message : String(error)}`);
    }
}

function assertEqual(actual: any, expected: any, message?: string): void {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}${message ? ` - ${message}` : ''}`);
    }
}

function assertThrows(fn: () => void, expectedError?: string): void {
    try {
        fn();
        throw new Error('Expected function to throw an error, but it did not');
    } catch (error) {
        if (expectedError && error instanceof Error && !error.message.includes(expectedError)) {
            throw new Error(`Expected error containing "${expectedError}", but got "${error.message}"`);
        }
    }
}

console.log('🧪 Running Package Sorter Tests\n');

// STANDARD package tests
console.log('📦 STANDARD Package Tests:');
runTest('Small light package should be STANDARD', () => {
    assertEqual(sort(10, 10, 10, 5), 'STANDARD');
});

runTest('Medium package under all thresholds should be STANDARD', () => {
    assertEqual(sort(50, 50, 50, 10), 'STANDARD');
});

runTest('Just under all thresholds should be STANDARD', () => {
    assertEqual(sort(149, 10, 10, 19.99), 'STANDARD');
});

// SPECIAL package tests - Bulky
console.log('\n📦 SPECIAL Package Tests (Bulky):');
runTest('Package with width >= 150cm should be SPECIAL', () => {
    assertEqual(sort(150, 10, 10, 5), 'SPECIAL');
});

runTest('Package with height >= 150cm should be SPECIAL', () => {
    assertEqual(sort(10, 150, 10, 5), 'SPECIAL');
});

runTest('Package with length >= 150cm should be SPECIAL', () => {
    assertEqual(sort(10, 10, 150, 5), 'SPECIAL');
});

runTest('Package with volume >= 1,000,000 cm³ should be SPECIAL', () => {
    assertEqual(sort(100, 100, 100, 5), 'SPECIAL');
});

runTest('Package just over volume threshold should be SPECIAL', () => {
    assertEqual(sort(100, 100, 100.1, 5), 'SPECIAL');
});

// SPECIAL package tests - Heavy
console.log('\n📦 SPECIAL Package Tests (Heavy):');
runTest('Package with mass >= 20kg should be SPECIAL', () => {
    assertEqual(sort(10, 10, 10, 20), 'SPECIAL');
});

runTest('Package with mass > 20kg should be SPECIAL', () => {
    assertEqual(sort(10, 10, 10, 25), 'SPECIAL');
});

// REJECTED package tests
console.log('\n📦 REJECTED Package Tests:');
runTest('Package that is both bulky (dimension) and heavy should be REJECTED', () => {
    assertEqual(sort(200, 10, 10, 25), 'REJECTED');
});

runTest('Package that is both bulky (volume) and heavy should be REJECTED', () => {
    assertEqual(sort(100, 100, 100, 20), 'REJECTED');
});

runTest('Package with multiple large dimensions and heavy should be REJECTED', () => {
    assertEqual(sort(150, 150, 10, 30), 'REJECTED');
});

// Boundary tests
console.log('\n🎯 Boundary Tests:');
runTest('Exact dimension threshold (150cm) should be SPECIAL', () => {
    assertEqual(sort(150, 10, 10, 5), 'SPECIAL');
});

runTest('Exact mass threshold (20kg) should be SPECIAL', () => {
    assertEqual(sort(10, 10, 10, 20), 'SPECIAL');
});

runTest('Exact volume threshold (1,000,000 cm³) should be SPECIAL', () => {
    assertEqual(sort(100, 100, 100, 5), 'SPECIAL');
});

runTest('Just under dimension threshold should be STANDARD', () => {
    assertEqual(sort(149.99, 10, 10, 5), 'STANDARD');
});

runTest('Just under mass threshold should be STANDARD', () => {
    assertEqual(sort(10, 10, 10, 19.99), 'STANDARD');
});

// Edge case tests - Valid inputs
console.log('\n⚡ Edge Case Tests (Valid):');
runTest('Very small package should be STANDARD', () => {
    assertEqual(sort(0.1, 0.1, 0.1, 0.1), 'STANDARD');
});

runTest('Zero mass should be STANDARD', () => {
    assertEqual(sort(10, 10, 10, 0), 'STANDARD');
});

runTest('Large numbers should work correctly', () => {
    assertEqual(sort(1000, 1000, 1000, 1000), 'REJECTED');
});

runTest('Decimal dimensions should work correctly', () => {
    assertEqual(sort(149.5, 10.5, 10.5, 19.5), 'STANDARD');
});

// Error handling tests
console.log('\n🚨 Error Handling Tests:');
runTest('Negative width should throw error', () => {
    assertThrows(() => sort(-10, 20, 30, 5), 'non-negative');
});

runTest('Negative height should throw error', () => {
    assertThrows(() => sort(10, -20, 30, 5), 'non-negative');
});

runTest('Negative length should throw error', () => {
    assertThrows(() => sort(10, 20, -30, 5), 'non-negative');
});

runTest('Negative mass should throw error', () => {
    assertThrows(() => sort(10, 20, 30, -5), 'non-negative');
});

runTest('Zero width should throw error', () => {
    assertThrows(() => sort(0, 20, 30, 5), 'greater than zero');
});

runTest('Zero height should throw error', () => {
    assertThrows(() => sort(10, 0, 30, 5), 'greater than zero');
});

runTest('Zero length should throw error', () => {
    assertThrows(() => sort(10, 20, 0, 5), 'greater than zero');
});

runTest('NaN width should throw error', () => {
    assertThrows(() => sort(NaN, 20, 30, 5), 'NaN');
});

runTest('String input should throw error', () => {
    assertThrows(() => sort('10' as any, 20, 30, 5), 'must be numbers');
});

runTest('Undefined input should throw error', () => {
    assertThrows(() => sort(undefined as any, 20, 30, 5), 'must be numbers');
});

runTest('Null input should throw error', () => {
    assertThrows(() => sort(null as any, 20, 30, 5), 'must be numbers');
});

// Performance test
console.log('\n⚡ Performance Test:');
runTest('Function should handle many calls efficiently', () => {
    const start = Date.now();
    for (let i = 0; i < 10000; i++) {
        sort(Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 50);
    }
    const duration = Date.now() - start;
    if (duration > 1000) {
        throw new Error(`Performance test took ${duration}ms, expected < 1000ms`);
    }
});

console.log('\n🎉 All tests completed!');
