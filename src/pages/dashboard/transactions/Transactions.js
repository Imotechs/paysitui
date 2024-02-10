import React from "react";
import './Transactions.css'
import glo from '../../../assets/images/glo_logo.png'
const Transactions =(props)=>{
    function handleChange(){
        return;
    }
    return(


<div className="container justify-content-center ">
    <div className="col-md-6 txns">
        <div className="tile">

            <h2 className="tile-title"><i className="fa fa-briefcase"></i> Recent Transactions</h2>
            {/* <div className="alert alert-info">
                <div className="">
                    To load data, Dial: <i>*425*0635*PIN#</i>
                </div>
                <div className="mt-1">
                    eg. <strong><i>*425*0635*00332277#</i></strong>
                </div>
            </div> */}
            <form action="" method="get" autocomplete="off">
                <div className="form-group">
                    <div className="txnssearch">
                        <input type="text" name="search_query" id="search" className="form-control"
                        placeholder="Search..." value="" onChange={handleChange}>
                       
                    </input>
                    <span className="input" >
                            <button type="submit" className=" btn-success" style={{'padding':'3px','color':'white', 'borderRadius':'8px', 'marginLeft':'-3px'}}>
                                <i className="fa fa-search fa-fw"></i> search
                            </button>
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
                    <tr>
                <td><img src={props.logo}  /></td>
                <td style={{'padding':'0px'}}>Deposit to wallet</td>
                <td style={{'padding':'0px'}}>--</td>
                <td style={{'padding':'0px'}}>₦2500</td>
                <td style={{'padding':'0px'}}>09016608852</td>
                <td style={{'padding':'0px'}}>07/02/204</td>
                <td ><button className="bg-success " style={{'padding':'3px','color':'white','borderRadius':'8px'}}>completed</button></td>
                </tr>
                <tr>
                <td ><img src={glo}  /></td>
                <td style={{'padding':'0px'}}>Data Subscription</td>
                <td style={{'padding':'0px'}}>2GB</td>
                <td style={{'padding':'0px'}}>₦250</td>
                <td style={{'padding':'0px'}}>09016608852</td>
                <td style={{'padding':'0px'}}>07/02/204</td>
                <td><button className="bg-danger " style={{'padding':'3px','color':'white', 'borderRadius':'8px'}}>Refunded</button></td>
                </tr>
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