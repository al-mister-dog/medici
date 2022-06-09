import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Introduction from "./steps/1-introduction";
import BillsExchange from "./steps/2-bills";
import RemitBills from "./steps/3-remit";
import RechangeOne from "./steps/4-rechange1";
import RechangeTwo from "./steps/5-rechange2";
import Playground from "./steps/6-playground";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

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

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        borderRadius: "15px",
        background: "white",
        marginTop: "50px",
        padding: "20px 5px",
      }}
    >
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <Box>{getStepContent(activeStep)}</Box>
      
    </Box>
  );
}
