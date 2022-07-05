import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectParties, transfer, deposit } from "../../features/clearinghouse/clearinghouseSlice";
export default function Index() {
  const {customer1, customer2, bank1, bank2, clearinghouse} = useAppSelector(selectParties)
  const dispatch = useAppDispatch()
  return(
    <>
    <button onClick={()=>dispatch(deposit({p1:customer1, p2:bank1, amt:200}))}>Deposit C1</button>
    <button onClick={()=>dispatch(deposit({p1:customer2, p2:bank2, amt:200}))}>Deposit C2</button>
    <button onClick={() => dispatch(transfer({p1: customer1, p2: customer2, amt: 100}))}>Transfer</button>
    <div style={{background: "white", margin: "10px"}}>Asset Deposits: {JSON.stringify(customer1.assets.customerDeposits[0])}</div>
    <div style={{background: "white", margin: "10px"}}>Asset Deposits: {JSON.stringify(customer2.assets.customerDeposits[0])}</div>
    <div style={{background: "white", margin: "10px"}}>Liability Deposits: {JSON.stringify(bank1.liabilities.customerDeposits[0])}</div>
    <div style={{background: "white", margin: "10px"}}>Liability Deposits: {JSON.stringify(bank2.liabilities.customerDeposits[0])}</div>
    <div style={{background: "white", margin: "10px"}}>{JSON.stringify(clearinghouse)}</div>
    </>
  )
}