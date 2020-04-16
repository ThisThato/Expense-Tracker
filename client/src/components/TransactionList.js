import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { transaction, Transaction } from "./Transaction";

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  //gets all the transactions
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};
