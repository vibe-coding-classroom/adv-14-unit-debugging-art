#ifndef HARD_LOGIC_H
#define HARD_LOGIC_H

/**
 * @file hard_logic.h
 * @brief Core hardware protection valves and safety definitions.
 * 
 * This file defines the safety thresholds and protection logic for the system.
 * Students are expected to implement defensive checks here.
 */

// Safety Thresholds
#define MAX_MOTOR_SPEED 255
#define MIN_MOTOR_SPEED 0
#define SAFE_VOLTAGE_THRESHOLD 3.3
#define CRITICAL_TEMP_THRESHOLD 75.0

// Error Codes
#define ERR_NONE 0
#define ERR_OVERFLOW 1
#define ERR_INVALID_INPUT 2
#define ERR_PROTOCOL_MISMATCH 3

/**
 * @brief Clamp a value within the hardware safety range.
 */
inline int clamp_safety(int val) {
    if (val > MAX_MOTOR_SPEED) return MAX_MOTOR_SPEED;
    if (val < MIN_MOTOR_SPEED) return MIN_MOTOR_SPEED;
    return val;
}

#endif // HARD_LOGIC_H
