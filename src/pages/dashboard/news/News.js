import React from "react";
import './News.css'
const News =(props)=>{
    return(
        <div className="container news">
        <div className="alert alert-info ">
        <div className="mt-0 mb-2">
            <span className="text-danger">NEW!!!</span> 
            {/* {props.news.title}Reduced prices when you buy Data Pins in numbers */}
            {props.news.title}
        </div>
        <div className="mb-0">
                <div>
                   {props.news.body}
                </div>
        </div>
        </div>
        {/* links to details of news
        <div className="mb-3 clearfix">
            <a href="/" className="btn btn-primary pull-left">Print</a>
            <a href="/" className="btn btn-primary pull-right">See more</a>
        </div> */}
</div>

    )
}

export default News