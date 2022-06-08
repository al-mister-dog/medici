import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from "@mui/material";

import Introduction from "./steps/1-introduction"
import BillsExchange from "./steps/2-bills";
import RemitBills from "./steps/3-remit";
import RechangeOne from "./steps/4-rechange1";
import RechangeTwo from "./steps/5-rechange2";
import Playground from "./steps/6-playground";

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Introduction />;
    case 1:
      return <BillsExchange />;
    case 2:
      return <RemitBills />;
    case 3:
      return <RechangeOne />;
    case 4:
      return <RechangeTwo />;
    case 5:
      return <Playground />;
    default:
      return "Unknown step";
  }
}
const steps = [
  "Introduction",
  "Bills of Exchange",
  "Remitting Bills",
  "Rechange Part 1",
  "Rechange Part 2",
  "Playground",
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        background: "white",
        marginTop: "50px",
        paddingTop: "20px",
      }}
    >
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ width: "90%", margin: "auto" }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <>{getStepContent(activeStep)}</>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, width: "90%", margin: "auto", paddingBottom: "10px" }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
