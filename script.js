let display = document.getElementById('result');
let currentExpression = '0'; // Initialize with default value

// Function to append numbers and decimal points
function appendValue(value) {
    // Prevent multiple decimals in a number
    let lastChar = currentExpression[currentExpression.length - 1];

    if (currentExpression === '0' && value !== '.') {
        currentExpression = value; // Reset to the first valid number
    } else if (lastChar === '.' && value === '.') {
        return; // Prevent multiple dots
    } else {
        currentExpression += value; // Append number or decimal point
    }

    display.value = currentExpression;
}

// Function to append operators (+, -, *, /)
function appendOperator(operator) {
    let lastChar = currentExpression[currentExpression.length - 1];

    // Prevent starting with an operator, or having two operators in a row
    if (currentExpression === '0' || ['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }

    currentExpression += operator;
    display.value = currentExpression;
}

// Function to delete the last character
function deleteLast() {
    if (currentExpression.length > 1) {
        currentExpression = currentExpression.slice(0, -1); // Remove the last character
    } else {
        currentExpression = '0'; // Reset to '0' when everything is deleted
    }
    display.value = currentExpression;
}

// Function to reset the calculator
function resetCalculator() {
    currentExpression = '0'; // Reset to default value
    display.value = '0';
}

// Function to calculate the result when '=' is pressed
function calculateResult() {
    let lastChar = currentExpression[currentExpression.length - 1];

    // Prevent calculation if expression ends with an operator
    if (['+', '-', '*', '/'].includes(lastChar)) {
        alert('Invalid input. Expression cannot end with an operator.');
        return;
    }

    try {
        // Replace x with * for valid JavaScript evaluation
        let sanitizedExpression = currentExpression.replace(/x/g, '*');
        let result = eval(sanitizedExpression); // Evaluate the expression
        currentExpression = result.toString(); // Update expression with result
        display.value = result; // Display the result
    } catch (error) {
        alert('Invalid calculation.');
    }
}
