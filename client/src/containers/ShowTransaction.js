import React from 'react'
import axios from 'axios'
import './ShowTransaction.css'

class ShowTransaction extends React.Component {

    state ={
        obj: [],
        transactions: []
    }
    componentDidMount(){
        axios.get('http://localhost:5000/api/blockchain/showtransaction',{
            "headers":{
                "x-auth-token": localStorage.getItem("token")
            }
        })
        .then(res => {
            // console.log(res.data.ledger)
            this.setState({transactions: res.data.ledger.slice(1,)})
            console.log(this.state.transactions)
            let jsx = this.state.transactions.map((data,index) => {
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{data.data.sender}</td>
                        <td>{data.data.recipient}</td>
                        <td>{data.data.amount}</td>
                    </tr>

                )
            })
            this.setState({obj:jsx})
        })
        .catch(error => console.log(error))
    }
    render()
    {
        return(
            <div className="ShowTransaction">
                <h1>Show Transactions</h1>
                <table>
                    <tr>
                        <th>S.No</th>
                        <th>Sender</th>
                        <th>Reciever</th>
                        <th>Amount</th>
                    </tr>
                    {
                        this.state.obj
                    }
                </table>
                <div className="HomeLink">
                <a href="/">Home</a>

                </div>
            </div>
        )
    }
}

export default ShowTransaction