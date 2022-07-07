import { fundamentals } from "./texts";

export interface Text {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export interface IntroStep {
  title: string;
  text: Text;
}

export interface Step {
  title: string;
  overdraft: boolean;
  credit: boolean;
  constraint: boolean;
  parties: string[];
  balanceSheetDisplay: string[];
  text: Text;
}

export interface Steps {
  [key:number] : IntroStep | Step
}

interface Module {
  name: "string",
  steps: Steps  
}

interface ModuleObject {
  [key: string]: Module
}
export const modules = {
  fundamentals: {
    name: "fundamentals",
    steps: {
      1: {
        title: "step1",
        text: fundamentals.step1,
      } as IntroStep,
      2: {
        title: "step2",
        overdraft: false,
        credit: false,
        constraint: false,
        parties: ["customer1", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step2,
      } as Step,
      3: {
        title: "step3",
        overdraft: false,
        credit: false,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step3,
      } as Step,
      4: {
        title: "step4",
        overdraft: true,
        credit: true,
        constraint: false,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step4,
      } as Step,
      5: {
        title: "step5",
        overdraft: true,
        credit: true,
        constraint: true,
        parties: ["customer1", "customer2", "bank1"],
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
        text: fundamentals.step5,
      } as Step,
    },
  },
  clearinghouse: {
    name: "clearinghouse",
    steps: {
      1: {
        overdraft: true,
        credit: true,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
      2: {
        system: "correspondent",
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: [
          "customerDeposits",
          "customerOverdrafts",
          "bankDeposits",
          "bankOverdrafts",
        ],
      },
      3: {
        system: "clearinghouse",
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: [
          "customerDeposits",
          "customerOverdrafts",
          "bankDeposits",
          "bankOverdrafts",
        ],
      },
      4: {
        overdraft: true,
        credit: true,
        constraint: true,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
    },
  },
};
