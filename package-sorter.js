function sort(width, height, length, mass) {
    // Calculate volume
    const volume = width * height * length;
    
    // Check if package is bulky
    const isBulky = volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;
    
    // Check if package is heavy
    const isHeavy = mass >= 20;
    
    // Determine stack based on criteria
    if (isBulky && isHeavy) {
        return "REJECTED";
    } else if (isBulky || isHeavy) {
        return "SPECIAL";
    } else {
        return "STANDARD";
    }
}

// Example usage and test cases
console.log("Testing package sorter:");
console.log("Small light package (10x10x10, 5kg):", sort(10, 10, 10, 5)); // STANDARD
console.log("Large package (200x10x10, 5kg):", sort(200, 10, 10, 5)); // SPECIAL (bulky by dimension)
console.log("High volume package (100x100x100, 5kg):", sort(100, 100, 100, 5)); // SPECIAL (bulky by volume)
console.log("Heavy package (10x10x10, 25kg):", sort(10, 10, 10, 25)); // SPECIAL (heavy)
console.log("Large and heavy package (200x10x10, 25kg):", sort(200, 10, 10, 25)); // REJECTED

module.exports = sort;
