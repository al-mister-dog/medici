//TODO
//credit expansion graph
import { useAppSelector } from "../../../../app/hooks";
import { selectParties } from "../../../../features/fundamentals/correspondentSlice";
import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import { IBank } from "../../../../features/fundamentals/program/types";
export default function ButtonAppBar() {
  interface Obj {
    [index: string]: any;
  }
  interface Account {
    [index: string]: any;
  }

  const parties = useAppSelector(selectParties);

  function getTotalCredit() {
    let partiesArray: IBank[] = [];

    for (const key in parties) {
      partiesArray = [...partiesArray, parties[key]];
    }

    const allBanks = partiesArray.filter((party) => party.id.includes("bank"));

    let bankAssetsAndLiabilities: Obj[] = [];

    allBanks.forEach((bank) => {
      for (const key in bank) {
        if (key === "liabilities" || key === "assets") {
          for (const k in bank[key]) {
            bankAssetsAndLiabilities = [
              ...bankAssetsAndLiabilities,
              ...bank[key][k],
            ];
          }
        }
      }
    });

    const totalAssetsAndLiabilities = bankAssetsAndLiabilities.reduce(
      (a: Account, c: Account) => {
        return { amount: a.amount + c.amount };
      },
      { amount: 0 }
    );

    const totalCredit = totalAssetsAndLiabilities.amount

    return totalCredit;
  }

  const [data, setData] = useState([
    {
      name: "",
      credit: 0,
    },
  ]);

  useEffect(() => {
    const totalCredit = getTotalCredit();
    setData([...data, { name: "", credit: totalCredit }]);
  }, [parties]);
  
  return (
    <Box>
      <LineChart
        width={450}
        height={150}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="credit" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
}
