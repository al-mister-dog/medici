//graphs
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
};
