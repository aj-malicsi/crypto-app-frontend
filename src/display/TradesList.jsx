import axios from 'axios'
import { useEffect } from 'react'
import { useState} from 'react'
import { Link } from "react-router-dom"



export default function TradesList(props){
  
    const [trades, setTrades] = useState([])

    
    useEffect(() =>{
        var url = "http://localhost:5000/trades"
        var headersList = {
            "Content-Type":"application/json"
        }
        axios({
            method: 'GET',
            url: url,
            headers: headersList,
          }).then((response) =>{
            console.log("display response", response)
            setTrades(response.data)
         
    
          })


    }, [])

    console.log(trades)

   

    return(
        <>
        trades list
        {
        trades.map(trade => 
        <Link to={`/display-trade/${trade.id}`}> {trade.title} </Link>
        
        ) 
        
        }
        </>
    )

}