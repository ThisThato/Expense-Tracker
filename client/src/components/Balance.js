import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
  //Get transactions from mockdata(Context class)
  const { transactions } = useContext(GlobalContext);

  //Calculations
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>R{total}</h1>
    </div>
  );
};
