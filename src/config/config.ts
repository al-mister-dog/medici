export const modules = {
  fundamentals: {
    name: "fundamentals",
    steps: {
      step1: {
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
      step2: {
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
      step3: {
        overdraft: true,
        credit: true,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
      step4: {
        overdraft: true,
        credit: true,
        constraint: true,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
    },
  },
  clearinghouse: {
    name: "clearinghouse",
    steps: {
      step1: {
        overdraft: true,
        credit: true,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
      step2: {
        system: "correspondent",
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts", "bankDeposits", "bankOverdrafts"],
      },
      step3: {
        system: "clearinghouse",
        overdraft: false,
        credit: false,
        constraint: false,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts", "bankDeposits", "bankOverdrafts"]
      },
      step4: {
        overdraft: true,
        credit: true,
        constraint: true,
        balanceSheetDisplay: ["customerDeposits", "customerOverdrafts"],
      },
    },
  }
};
