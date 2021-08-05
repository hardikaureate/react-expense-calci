import React, { useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;
const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
`;
const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: flex;
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;
const AddTransactionView = (props) => {
    const [amount, setAmount] = useState()
    const [desc, setDesc] = useState()
    const [type, setType] = useState("EXPENSE")
    const addTransaction = () => {
        if(amount) {props.addTransaction({amount:Number(amount), desc, type, id:Date.now()})}
        console.log(amount, desc, type)
        props.toggleAddTxn()
    }
    return (
        <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
            <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            <input type="text" placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            <RadioBox>
                <input type="radio" name="type" id="expence" value="Expense" checked={type === "EXPENSE"} onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="expense">Expense</label>
                <input type="radio" name="type" id="income" value="Income" checked={type === "INCOME"} onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="income">Income</label>
            </RadioBox>
            <AddTransaction onClick={addTransaction}>Add Transaction</AddTransaction>
        </AddTransactionContainer>
    )
}

const Overview = (props) => {
    const [isAddTxnVisible, toggleAddTxn] = useState(false)
    return (
        <Container>
            <BalanceBox >
                Balance: ${props.income - props.expense}
            <AddTransaction onClick={()=>toggleAddTxn(!isAddTxnVisible)}>
                {isAddTxnVisible ? "Cancel" : "Add"}
            </AddTransaction>
            </BalanceBox>
            {isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction}/>}
            <ExpenseContainer>
                <ExpenseBox isIncome={false}>
                    Expense <span>${props.expense}</span>
                </ExpenseBox>
                <ExpenseBox isIncome={true}>
                    Income <span>${props.income}</span>
                </ExpenseBox>
            </ExpenseContainer>
         </Container>
    )    
}

export default Overview
