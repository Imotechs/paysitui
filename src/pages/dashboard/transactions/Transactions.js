import React ,{useContext, useState,useEffect}from "react";
import './Transactions.css'
import { userProfileContext } from "../../../components/userprofilecontext/UserContext";
import nameToLogo from "../../../vitals";
import { formatDistanceToNow } from 'date-fns';
import Chat from "../../../components/chat/Chat";

function Transactions(props) {
    const [search, setSearch] = useState('');
    const [transactionsList, setTransactionsList] = useState([]);
    const[txnArray,setTxnArray] = useState([])
    //const[loading,setLoading] = useState(false)
    const { user} = useContext(userProfileContext);
    ///console.log(user.transactions)
    const DateTimeComponent = ({ datetime }) => {
        const formattedDate = formatDistanceToNow(new Date(datetime), { addSuffix: true });
        return <span>{formattedDate}</span>;
    };

    const CurrencyFormatted = ({ amount }) => {
        const formatedcurrency = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
        return formatedcurrency;
    };

    useEffect(() => {
        const txnArrayList = Array.isArray(user.transactions)
        ? user.transactions
    .flatMap((transactionArray) => transactionArray)
    .sort((a, b) => new Date(b.date_added) - new Date(a.date_added)) // Sort by date_added in descending order
  : [];  
   
  const transactionsArray =txnArrayList.slice(0,10)
  const sortedTransactions = transactionsArray.sort((a, b) => new Date(b.date_added) - new Date(a.date_added)).slice(0, 19);
        setTransactionsList(sortedTransactions);
        setTxnArray(txnArrayList)
    }, [user.transactions]);

function handleSearchChange(e) {
    const searchQuery = e.target.value.toLowerCase();
    setSearch(searchQuery);
     const filteredTransactionsList = user.transactions
            .flatMap((transactionArray) => transactionArray)
            .filter(transaction => {
                return (
                    transaction.service.toLowerCase().includes(searchQuery) ||
                    transaction.txn_id.toLowerCase().includes(searchQuery)
                );
            });
        setTransactionsList(filteredTransactionsList);
}

const TransactionComponent = ({ transaction }) => (
  <tr key={transaction.id}>
    <td className="imgtd"><img src={nameToLogo(transaction.service)} alt="service_logo"/></td>
    <td>{transaction.item}</td>
    <td>{transaction.number}</td>
    <td>{transaction.qty}</td>
    <td><CurrencyFormatted amount={transaction.cost}/></td>
    <td><DateTimeComponent datetime={transaction.date_added}/></td>
    <td>{transaction.txn_id}</td>
    {transaction.completed && 
    <td ><button className="bg-success border-block" style={{'padding':'3px','color':'white','borderRadius':'8px'}}>completed</button></td>
    }
     {transaction.refunded && 
    <td><button className="bg-danger border-block " style={{'padding':'3px','color':'white', 'borderRadius':'8px'}}>Refunded</button></td>
            }
             {transaction.pending && 
    <td><button className="bg-warning border-block" style={{'padding':'3px','color':'white', 'borderRadius':'8px', width:'48px'}}>pending</button></td>
            }
  </tr>
);

const normalizeServiceName = (serviceName) => {
    // You can add more variations as needed
    let lst =['airtel','mtn','glo','9mobile']
  
    for(let i=0;i<lst.length;i++){
        //console.log(serviceName.toLowerCase().slice(0,3))
        if (lst[i].includes(serviceName.toLowerCase().slice(0,3))){
            return lst[i]
        }
    }
 
    return serviceName

};

const normalizedTransactions = txnArray.flatMap(transactionArray => transactionArray)
    .map(transaction => ({
        ...transaction,
        service: normalizeServiceName(transaction.service)
    }));
    return (
        <div className="container justify-content-center">
            <div className="row">

            {txnArray&&
            <div className="col-md-6 txns">
                <div className="px-3 my-2 clearfix">
                        <div className="card">
        
                                    <Chat transactions ={normalizedTransactions}/>
                        </div>
                </div>
            </div>}
            <div className="col-md-6 txns ">
            <div className="txntable">
                <div className="tile"></div>
                    <h2 className="tile-title"><i className="fa fa-briefcase"></i> Recent Transactions</h2>
                    <form action="" method="get" autoComplete="off">
                        <div className="form-group">
                            <div className="txnssearch">
                                <input type="text" name="search_query" id="search" className="form-control"
                                    placeholder="Search transactions..." value={search} onChange={handleSearchChange}>
                                </input>
                                <span className="input">
                                    {/* Add search button or icon if needed */}
                                </span>
                            </div>
                        </div>
                    </form>
                    <table style={{ 'padding': '0px' }} id="table-data" className="tablebody">
                        <thead className="bg-dark text-light">
                            {/* Table headers */}
                        </thead>
                        <tbody className="tablebd">
                            {transactionsList.map((transaction) => (
                                <TransactionComponent key={transaction.id} transaction={transaction} />
                            ))}
                        </tbody>
                    </table>
            </div>
            </div>
            </div>
        </div>
    );
}


export default Transactions