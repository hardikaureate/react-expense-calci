import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Overview from './Overview';
import Transaction from './Transaction';

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  align-items: center;
  height: 100vh;
  width: 360px;
  padding-top: 30px;
  font-family: Montserrat;
`;



const Home = (props) => {
    const [transaction, setTransaction] = useState([])
    const [expense, setExpense] = useState([0])
    const [income, setIncome] = useState([0])

    
    const calculateBalance = () =>{
      let exp = 0
      let inc  = 0
      transaction.map((payload) => {
        payload.type==="EXPENSE" 
          ? (exp=exp+payload.amount) 
          : (inc=inc+payload.amount)
      })
      setExpense(exp)
      setIncome(inc)
    }

    useEffect(() => calculateBalance(), [transaction])

    const addTransaction = (payload) =>{
        const transactionArray = [...transaction]
        transactionArray.push(payload)
        setTransaction(transactionArray)
    }
    return <Container>
            <Overview addTransaction={addTransaction} expense={expense} income={income}/> 
            <Transaction transaction={transaction}/>
         </Container>    
}

export default Home
