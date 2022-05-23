
// type Rates = {
//   [index: string]: number;
// };
// type Quotes = {
//   [index: string]: boolean;
// };
// type Bill = {
//   id: string;
//   dueTo: string;
//   dueFrom: string;
//   city: string;
//   amount: number;
//   status: boolean;
// };
// export const exchangeRates: Rates = {
//   florence: 66,
//   lyons: 64,
// };

// export const certaintyQuotes: Quotes = {
//   florence: false,
//   lyons: true,
// };

// export const salviati = {
//   id: "salviati",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   reserves: 100,
//   goods: 10,
// };
// export const me = {
//   id: "me",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   reserves: 100,
//   goods: 10,
// };
// export const federigo = {
//   id: "federigo",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   reserves: 100,
//   goods: 10,
// };
// export const piero = {
//   id: "piero",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   reserves: 100,
//   goods: 10,
// };
// export const you = {
//   id: "you",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   exchangeUnit: 10,
//   coins: {
//     ecus: 500,
//     florins: 100,
//     marcs: 10,
//   },
//   reserves: 500,
// };
// export const tomasso = {
//   id: "tomasso",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   exchangeUnit: 10,
//   coins: {
//     ecus: 500,
//     florins: 100,
//     marcs: 10,
//   },
//   reserves: 500,
// };

// export function trade(importer: any, exporter: any, amount: any) {
//   const date = new Date().toISOString();
//   const bill = {
//     id: date,
//     dueTo: exporter.id,
//     dueFrom: importer.id,
//     city: importer.city,
//     amount: amount,
//     status: true,
//   };
//   importer.liabilities = [...importer.liabilities, bill];
//   importer.goods = amount;
//   exporter.assets = [...exporter.assets, bill];
// }

// export function drawBill(bearer: any, exchangeBank: any, presentedBill: any) {
//   if (presentedBill.dueTo === bearer.id) {
//     const bill = bearer.assets.find(
//       (b: { id: any }) => b.id === presentedBill.id
//     );
//     bearer.assets = exchangeBank.assets.filter(
//       (b: { id: any }) => b.id !== presentedBill.id
//     );
//     exchangeBank.assets = [...exchangeBank.assets, bill];
//     makeExchange(bearer, exchangeBank, bill);
//   }
// }

// export function makeExchange(bearer: any, exchangeBank: any, bill: any) {
//   const cityQuotesCertain = certaintyQuotes[exchangeBank.city];
//   if (cityQuotesCertain) {
//     exchangeBank.exchangeUnit -= bill.amount;
//     bearer.reserves += bill.amount * exchangeRates[exchangeBank.city];
//   } else {
//     exchangeBank.reserves -= bill.amount * exchangeRates[bill.city];
//     bearer.reserves += bill.amount * exchangeRates[bill.city];
//   }
// }

// export function remitBill(
//   presenter: {
//     id?: string;
//     city?: string;
//     assets: any;
//     liabilities?: never[];
//     exchangeUnit?: number;
//     coins?:
//       | { ecus: number; florins: number; marcs: number }
//       | { ecus: number; florins: number; marcs: number };
//     reserves?: number;
//   },
//   presentee: {
//     id?: string;
//     city?: string;
//     assets: any;
//     liabilities?: never[];
//     exchangeUnit?: number;
//     coins?:
//       | { ecus: number; florins: number; marcs: number }
//       | { ecus: number; florins: number; marcs: number };
//     reserves?: number;
//   },
//   presentedBill: Bill
// ) {
//   const bill = presenter.assets.find(
//     (b: { id: any }) => b.id === presentedBill.id
//   );
//   presenter.assets = presenter.assets.filter(
//     (b: { id: any }) => b.id !== presentedBill.id
//   );
//   presentee.assets = [...presentee.assets, bill];
// }

// export function presentBill(
//   exchangeBank: {
//     id?: string;
//     city: any;
//     assets: any;
//     liabilities?: never[];
//     exchangeUnit: any;
//     coins?:
//       | { ecus: number; florins: number; marcs: number }
//       | { ecus: number; florins: number; marcs: number };
//     reserves: any;
//   },
//   payee: {
//     id: any;
//     city?: string;
//     assets?: never[];
//     liabilities: any;
//     reserves: any;
//     goods?: number;
//   },
//   presentedBill: Bill
// ) {
//   const bill = exchangeBank.assets.find(
//     (b: { id: any }) => b.id === presentedBill.id
//   );
//   if (presentedBill.dueFrom === payee.id) {
//     exchangeBank.assets = exchangeBank.assets.filter(
//       (b: { id: any }) => b.id !== presentedBill.id
//     );
//     payee.liabilities = payee.liabilities.filter(
//       (b: { id: any }) => b.id !== presentedBill.id
//     );
//     const cityQuotesCertain = certaintyQuotes[exchangeBank.city];
//     if (cityQuotesCertain) {
//       exchangeBank.exchangeUnit += bill.amount;
//       payee.reserves -= bill.amount * exchangeRates[exchangeBank.city];
//     } else {
//       exchangeBank.reserves += bill.amount * exchangeRates[bill.city];
//       payee.reserves -= bill.amount * exchangeRates[bill.city];
//     }
//   }
// }







//THE SYSTEMATIC ENRICHMENT OF EXCHANGE BANKERS
// type Rates = {
//   [index: string]: number;
// };
// type Quotes = {
//   [index: string]: boolean;
// };
// type Currency = "ecus" | "marcs";
// type Currencies = {
//   [index: string]: Currency;
// };
// type Bill = {
//   id: string;
//   dueTo: string;
//   dueFrom: string;
//   city: string;
//   amount: number;
// };

// //
// export const certaintyQuotes: Quotes = {
//   florence: false,
//   lyons: true,
// };

// export const exchangeRates: Rates = {
//   florence: 65.5,
//   lyons: 64,
// };



// const currencies: Currencies = {
//   florence: "ecus",
//   lyons: "marcs",
// };

// export const salviati = {
//   id: "salviati",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     marcs: 1,
//   },
//   goods: 10,
// };
// export const me = {
//   id: "me",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//   },
//   goods: 10,
// };
// export const federigo = {
//   id: "federigo",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//   },
//   goods: 10,
// };
// export const piero = {
//   id: "piero",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     marcs: 1,
//   },
//   goods: 10,
// };
// export const you = {
//   id: "you",
//   city: "florence",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//     marcs: 10,
//   },
// };
// export const tomasso = {
//   id: "tomasso",
//   city: "lyons",
//   assets: [],
//   liabilities: [],
//   coins: {
//     ecus: 500,
//     marcs: 10,
//   },
// };

// ///LOGIC
// export function trade(importer: any, exporter: any, amount: any) {
//   const bill = {
//     id: new Date().toISOString(),
//     dueTo: exporter.id,
//     dueFrom: importer.id,
//     city: importer.city,
//     amount: amount,
//   };
//   importer.goods += amount;
//   exporter.goods -= amount;  
//   importer.liabilities = [...importer.liabilities, bill];
//   exporter.assets = [...exporter.assets, bill];
// }

// function exchangeBill(holder: any, recipient: any, presentedBill: any) {
//   const bill = holder.assets.find(
//     (b: { id: any }) => b.id === presentedBill.id
//   );
//   recipient.assets = [...recipient.assets, bill];
//   holder.assets = recipient.assets.filter(
//     (b: { id: any }) => b.id !== presentedBill.id
//   );
// }
// export function exchangeMoney(payee: any, drawee: any, bill: any) {
//   const unitOfAccount = bill.amount;
//   const localCurrency = bill.amount * exchangeRates[bill.city];
//   const cityQuotesCertain = certaintyQuotes[drawee.city];
//   if (cityQuotesCertain) {
//     drawee.coins[currencies[drawee.city]] -= unitOfAccount;
//     payee.coins[currencies[drawee.city]] += unitOfAccount;
//   } else {
//     drawee.coins[currencies[drawee.city]] -= localCurrency;
//     payee.coins[currencies[drawee.city]] += localCurrency;
//   }
// }

// export function drawBill(payee: any, drawee: any, presentedBill: any) {
//   if (presentedBill.dueFrom !== drawee.id) {
//     exchangeBill(payee, drawee, presentedBill);
//   }
//   exchangeMoney(payee, drawee, presentedBill);
// }

// export function remitBill(presenter: any, presentee: any, presentedBill: Bill) {
//   const bill = presenter.assets.find(
//     (b: { id: any }) => b.id === presentedBill.id
//   );
//   presenter.assets = presenter.assets.filter(
//     (b: { id: any }) => b.id !== presentedBill.id
//   );
//   presentee.assets = [...presentee.assets, bill];
// }




//THE SYSTEMATIC ENRICHMENT OF EXCHANGE BANKERS
type Rates = {
  [index: string]: number;
};
type Quotes = {
  [index: string]: boolean;
};
type Currency = "ecus" | "marcs";
type Currencies = {
  [index: string]: Currency;
};
type Bill = {
  id: string;
  dueTo: string;
  dueFrom: string;
  city: string;
  amount: number;
  status: boolean;
};

//
export const certaintyQuotes: Quotes = {
  florence: false,
  lyons: true,
};

export const exchangeRates: Rates = {
  florence: 65.5,
  lyons: 64,
};

const currencies: Currencies = {
  florence: "ecus",
  lyons: "marcs",
};

export const salviati = {
  id: "salviati",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
};
export const me = {
  id: "me",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
};
export const federigo = {
  id: "federigo",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
  },
  goods: 10,
};
export const piero = {
  id: "piero",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    marcs: 1,
  },
  goods: 10,
};
export const you = {
  id: "you",
  city: "florence",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
};
export const tomasso = {
  id: "tomasso",
  city: "lyons",
  assets: [],
  liabilities: [],
  coins: {
    ecus: 500,
    marcs: 10,
  },
};

///LOGIC
export function trade(importer: any, exporter: any, amount: any) {
  const bill = {
    id: new Date().toISOString(),
    dueTo: exporter.id,
    dueFrom: importer.id,
    city: importer.city,
    amount: amount,
    paid: false,
  };

  importer.goods += amount;
  exporter.goods -= amount;
  importer.liabilities = [...importer.liabilities, bill];
  exporter.assets = [...exporter.assets, bill];
}

function replaceBill(partyConcerned: any, category: string, bill: any) {
  partyConcerned[category] = partyConcerned[category].filter(
    (b: { id: any }) => b.id !== bill.id
  );
  partyConcerned[category] = [...partyConcerned[category], bill];
}

function finaliseBill(holder: any, recipient: any, bill: any) {
  const recipientCopy = { ...bill };
  const holderCopy = { ...bill };
  recipientCopy.paid = true;
  holderCopy.paid = true;
  replaceBill(holder, "assets", holderCopy);
  replaceBill(recipient, "liabilities", recipientCopy);
}

function exchangeBill(holder: any, recipient: any, presentedBill: any) {
  const bill = holder.assets.find(
    (b: { id: any }) => b.id === presentedBill.id
  );
  const recipientCopy = { ...bill };
  const holderCopy = { ...bill };
  holderCopy.paid = true;
  recipient.assets = [...recipient.assets, recipientCopy];
  replaceBill(holder, "assets", holderCopy);
}

export function exchangeMoney(payee: any, drawee: any, bill: any) {
  const unitOfAccount = bill.amount;
  const localCurrency = bill.amount * exchangeRates[bill.city];
  const cityQuotesCertain = certaintyQuotes[drawee.city];
  if (cityQuotesCertain) {
    drawee.coins[currencies[drawee.city]] -= unitOfAccount;
    payee.coins[currencies[drawee.city]] += unitOfAccount;
  } else {
    drawee.coins[currencies[drawee.city]] -= localCurrency;
    payee.coins[currencies[drawee.city]] += localCurrency;
  }
}

export function drawBill(payee: any, drawee: any, bill: any) {
  drawee.id === bill.dueFrom
    ? finaliseBill(payee, drawee, bill)
    : exchangeBill(payee, drawee, bill);
  exchangeMoney(payee, drawee, bill);
}

export function remitBill(presenter: any, presentee: any, bill: Bill) {
  presenter.assets = presenter.assets.filter(
    (b: { id: any }) => b.id !== bill.id
  );
  presentee.assets = [...presentee.assets, bill];
}