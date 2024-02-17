import React ,{useContext}from "react";
import './Transactions.css'
import glo from '../../../assets/images/glo_logo.png'
import { userProfileContext } from "../../../components/userprofilecontext/UserContext";
import nameToLogo from "../../../vitals";
import { formatDistanceToNow } from 'date-fns';

const Transactions =(props)=>{
    function handleChange(){
        return;
    }
    const {user, loading } = useContext(userProfileContext);


const DateTimeComponent = ({ datetime }) => {
      const formattedDate = formatDistanceToNow(new Date(datetime), { addSuffix: true });
      
      return <span>{formattedDate}</span>;
    };
const CurrencyFormatted = ({amount})=>{
    const formatedcurrency = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(amount);
return formatedcurrency
}

const transactionsArray = Array.isArray(user.transactions)
  ? user.transactions
    .flatMap((transactionArray) => transactionArray)
    .sort((a, b) => new Date(b.date_added) - new Date(a.date_added)) // Sort by date_added in descending order
    .slice(0, 10) // Get the first 10 transactions
  : [];

const TransactionComponent = ({ transaction }) => (
  <tr key={transaction.id}>
    <td><img src={nameToLogo(transaction.service)}/></td>
    <td>{transaction.item}</td>
    <td>{transaction.number}</td>
    <td>{transaction.qty}</td>
    <td><CurrencyFormatted amount={transaction.cost}/></td>
    <td><DateTimeComponent datetime={transaction.date_added}/></td>
    {transaction.completed && 
    <td ><button className="bg-success " style={{'padding':'3px','color':'white','borderRadius':'8px'}}>completed</button></td>
    }
     {transaction.refunded && 
    <td><button className="bg-danger " style={{'padding':'3px','color':'white', 'borderRadius':'8px'}}>Refunded</button></td>
            }
  </tr>
);

    return(


<div className="container justify-content-center ">
    <div className="col-md-6 txns">
        <div className="tile">

            <h2 className="tile-title"><i className="fa fa-briefcase"></i> Recent Transactions</h2>
          
            <form action="" method="get" autoComplete="off">
                <div className="form-group">
                    <div className="txnssearch">
                        <input type="text" name="search_query" id="search" className="form-control"
                        placeholder="Search transactions..." value="" onChange={handleChange}>
                       
                    </input>
                    <span className="input" >
                            {/* <button type="submit" className=" btn-success" style={{'padding':'3px','color':'white', 'borderRadius':'8px', 'marginLeft':'-3px'}}>
                                <i className="fa fa-search fa-fw"></i> search
                            </button> */}
                        </span>
                       
                    </div>
                </div>
            </form>
            <table style={{'padding':'0px'}} id="table-data" className="tablebody ">
                <thead className="bg-dark text-light">
                    {/* <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Network</th>
                        <th>Data Size</th>
                        <th>Status</th>
                        <th>Used By</th>
                        <th>From API</th>
                    </tr> */}
                </thead>
                <tbody  className="tablebd">
                {transactionsArray.map((transaction) => (
                    <TransactionComponent key={transaction.id} transaction={transaction} />
                    ))}
                </tbody>
                </table>
            <div className="px-3 my-2 clearfix">
            </div>
            </div>
        </div>
    </div>

    )
}

export default Transactions