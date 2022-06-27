import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectParties,
  createNewCustomer,
} from "../../../features/clearinghouse/clearinghouseSlice";
import { Button } from "@mui/material";
export default function SandBox() {
  const parties = useAppSelector(selectParties);
  const dispatch = useAppDispatch();
  return (
    <>
      {JSON.stringify(parties)}
      <Button onClick={() => dispatch(createNewCustomer())}>
        Create Customer
      </Button>
    </>
  );
}