/**
 * MALICIOUS STRESS TEST
 * This script injects "poison" inputs into the system to test its defensive capabilities.
 * A resilient system should never crash or reach an undefined state.
 */

const fs = require('fs');

const testPayloads = [
    { name: "Null Input", data: null },
    { name: "NaN Input", data: NaN },
    { name: "Extreme Overflow", data: 999999999 },
    { name: "Negative Underflow", data: -1 },
    { name: "Illegal String", data: "DROP TABLE users;" },
    { name: "Empty String", data: "" },
    { name: "Special Characters", data: "{}[]|\\<>?" }
];

function runStressTest() {
    console.log("🚀 Starting Malicious Stress Test...\n");
    let passed = 0;

    testPayloads.forEach(payload => {
        console.log(`[TEST] ${payload.name}: Sending ${payload.data}`);
        
        try {
            // Simulate the system's processing logic
            const result = simulateSystem(payload.data);
            console.log(`[RESULT] Success: ${result}`);
            passed++;
        } catch (error) {
            console.error(`[RESULT] CRITICAL FAILURE: ${error.message || error}`);
        }
    });

    console.log(`\n✅ Test Summary: ${passed}/${testPayloads.length} payloads handled safely.`);

    if (passed < testPayloads.length) {
        console.error("❌ Auto-grading Failed: System is not resilient to all malicious inputs.");
        process.exit(1);
    } else {
        console.log("🌟 Auto-grading Passed: Defensive hardening confirmed.");
        process.exit(0);
    }
}

/**
 * A simplified version of the system's input processing
 * This implementation is intentionally VULNERABLE.
 * It will "crash" or produce illegal states when given malicious input.
 */
function simulateSystem(input) {
    // CRITICAL BUG: No type checking
    // If input is not a number, it might cause logic errors elsewhere.
    
    if (typeof input === 'string' && input.includes(';')) {
        throw new Error("SQL Injection detected in motor controller!");
    }

    if (input === null || input === undefined) {
        throw new Error("Null pointer exception in hardware abstraction layer!");
    }

    if (isNaN(input) && typeof input === 'number') {
        throw new Error("NaN propagation in PID calculation!");
    }

    // Direct usage - dangerous!
    let val = Number(input);
    
    if (val > 255 || val < 0) {
        throw new Error("Hardware damage! Motor PWM out of range: " + val);
    }

    return `Motor set to ${val}`;
}

runStressTest();
