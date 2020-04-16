import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
//Initial State - Mock data (To be replaced)
const initialState = {
  transactions: [
    { id: 1, text: "Flowers", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: -100 }
  ],
  error: null,
  loading: true
};

//Create Context - Takes in data
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions");
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR"
      });
    }
  }//getTransactions

  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }//deleteTransaction

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  }//addTransaction

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        deleteTransaction,
        getTransactions,
        addTransaction
      }}
    >
      {" "}
      {children}{" "}
    </GlobalContext.Provider>
  );
};
