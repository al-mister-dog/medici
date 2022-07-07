//TODO
//credit expansion graph
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectParties,
} from "../../../../features/fundamentals/fundamentalsSlice";
import {
  selectAuxilliary,
  setReservePercentage,
} from "../../../../features/auxilliary/auxilliarySlice";
import { Box, Slider, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { IBank } from "../../../../features/fundamentals/program/types";

const ButtonAppBar: React.FunctionComponent<{ config?: any }> = ({
  config,
}) => {
  interface Obj {
    [index: string]: any;
  }
  interface Account {
    [index: string]: any;
  }
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);
  const { reservePercentage } = useAppSelector(selectAuxilliary);
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

    const totalCredit = totalAssetsAndLiabilities.amount;

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


  function handleChangeReserveRequirement(
    event: Event,
    newValue: number | number[]
  ) {
    dispatch(setReservePercentage({ percentage: newValue }));
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      {config.constraint && (
        <Box width={300}>
          <Typography>Reserve Requirement: %{reservePercentage}</Typography>
          <Slider
            defaultValue={25}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChangeReserveRequirement}
          />
        </Box>
      )}
      {config.credit && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography style={{ margin: 0, padding: 0 }}>
            Total System Credit: ${getTotalCredit()}
          </Typography>
          <LineChart
            width={450}
            height={150}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="credit" stroke="#8884d8" />
          </LineChart>
        </Box>
      )}
    </Box>
  );
};

export default ButtonAppBar;
