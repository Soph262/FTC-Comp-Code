// IDENTIFIERS_USED=arm_motorAsDcMotor,claw_servoAsServo,gamepad1,gamepad2,left_backAsDcMotor,left_frontAsDcMotor,right_backAsDcMotor,right_frontAsDcMotor

var myColor, forward2, strafe, turn, denominator;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  right_backAsDcMotor.setDirection("REVERSE");
  right_frontAsDcMotor.setDirection("REVERSE");
  left_backAsDcMotor.setDirection("REVERSE");
  left_frontAsDcMotor.setDirection("FORWARD");
  arm_motorAsDcMotor.setMode("RUN_WITHOUT_ENCODER");
  claw_servoAsServo.setDirection("FORWARD");
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    while (linearOpMode.opModeIsActive()) {
      forward2 = gamepad1.getLeftStickY();
      strafe = gamepad1.getLeftStickX();
      turn = gamepad1.getRightStickX();
      forward2 = gamepad1.getLeftStickY();
      denominator = Math.max.apply(null, [1, Math.abs(forward2) + Math.abs(strafe) + Math.abs(turn)]);
      denominator = Math.max.apply(null, [1, Math.abs(forward2) + Math.abs(strafe) + Math.abs(turn)]);
      if (gamepad1.getLeftBumper()) {
        forward2 = forward2 / 2;
        strafe = forward2 / 2;
        turn = forward2 / 2;
      }
      if (gamepad1.getRightBumper()) {
        forward2 = forward2 * 2;
        strafe = forward2 * 2;
        turn = forward2 * 2;
      }
      left_frontAsDcMotor.setDualPower((forward2 - (strafe + turn)) / denominator, right_frontAsDcMotor, (forward2 + strafe + turn) / denominator);
      left_backAsDcMotor.setDualPower((forward2 - (strafe + turn)) / denominator, right_backAsDcMotor, (forward2 - (strafe - turn)) / denominator);
      if (gamepad2.getA()) {
        claw_servoAsServo.setPosition(0);
      } else if (gamepad2.getB()) {
        claw_servoAsServo.setPosition(0.125);
      } else if (gamepad2.getA()) {
        claw_servoAsServo.setPosition(0);
      }
      if (gamepad2.getRightBumper()) {
        arm_motorAsDcMotor.setPower(1);
      } else if (gamepad2.getLeftBumper()) {
        arm_motorAsDcMotor.setPower(-1);
      } else {
        arm_motorAsDcMotor.setPower(0);
      }
      telemetry.update();
    }
  }
}

/**
 * Describe this function...
 */
function LEDs() {
  colorAccess.showColor(colorAccess.rgbToHue(255, 0, 0));
}
