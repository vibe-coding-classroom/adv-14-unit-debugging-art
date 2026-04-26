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
 * A HARDENED version of the system's input processing.
 * This implementation is resilient to all malicious inputs.
 */
function simulateSystem(input) {
    // 1. Initial Type & Content Check
    if (input === null || input === undefined) {
        console.warn("  [DEFENSE] Null input blocked. Falling back to safe 0.");
        return "Motor set to 0";
    }

    // 2. Sanitize Strings (Prevent Injection/Special Char issues)
    if (typeof input === 'string') {
        if (input.includes(';') || /[{}\[\]|<>\?]/.test(input)) {
            console.warn(`  [DEFENSE] Illegal characters detected in '${input}'. Command ignored.`);
            return "Motor set to 0";
        }
    }

    // 3. Convert to Number safely
    let val = Number(input);

    // 4. Handle NaN
    if (isNaN(val)) {
        console.warn(`  [DEFENSE] Input '${input}' is not a valid number. Falling back to 0.`);
        return "Motor set to 0";
    }

    // 5. Boundary Clamping (Defensive Design)
    const MAX_SPEED = 255;
    const MIN_SPEED = 0;
    
    if (val > MAX_SPEED) {
        console.warn(`  [DEFENSE] Value ${val} exceeds MAX. Clamping to ${MAX_SPEED}.`);
        val = MAX_SPEED;
    } else if (val < MIN_SPEED) {
        console.warn(`  [DEFENSE] Value ${val} below MIN. Clamping to ${MIN_SPEED}.`);
        val = MIN_SPEED;
    }

    return `Motor set to ${val}`;
}

runStressTest();
