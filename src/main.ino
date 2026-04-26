#include "hard_logic.h"

/* 
 * CRIME SCENE FORENSICS LAB
 * There are 3 major bugs hidden in this file:
 * 1. Integer Overflow in the accumulator.
 * 2. Variable Scope Pollution (global vs local).
 * 3. Invisible Protocol Inconsistency (JSON key mismatch).
 */

int system_status = ERR_NONE;
int global_count = 0; // Bug 2: Potential pollution

void setup() {
  Serial.begin(115200);
  Serial.println("System Initialized. Awaiting commands...");
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    processCommand(input);
  }
}

void processCommand(String json) {
  // Bug 3: Protocol Inconsistency
  // Expected key in web app: "targetSpeed"
  // Implemented here: "target_speed"
  if (json.indexOf("target_speed") != -1) {
    int speed = extractValue(json, "target_speed");
    executeMovement(speed);
  }
}

void executeMovement(int speed) {
  // Bug 1: Integer Overflow
  // If speed is high and added to a small buffer, it might wrap.
  int8_t internal_buffer = 0; 
  internal_buffer += speed; // Potential overflow if speed > 127
  
  Serial.print("Executing move at speed: ");
  Serial.println(internal_buffer);
}

int extractValue(String json, String key) {
  // Dummy extraction logic
  return json.substring(json.indexOf(":") + 1).toInt();
}

void updateTelemetry() {
  // Bug 2: Scope Pollution
  int global_count = 100; // This shadows the global variable
  Serial.print("Telemetry Count: ");
  Serial.println(global_count);
}
