import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import TradeDailyCandles from '../charts/TradeDailyCandles'
import { RSIChart } from '../charts/RSIChart'
import {DailyEMAChart} from '../charts/DailyEMAChart'
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { TradeEMAChart } from '../charts/TradeEMAChart'
import NavBar from './NavBar'





function DisplayTrade(){

  let { trade_id } = useParams()

    var trade_url = `http://localhost:5000/trades/${trade_id}.json`
    const [id, setId] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [coin, setCoin] = useState()
    const [tradeDate, setTradeDate] = useState()
    const [displayDate, setDisplayDate] = useState()
    const [entryPrice, setEntryPrice] = useState()
    const [exitPrice, setExitPrice] = useState()
    // axios.get(trade_url)
    
    
    // .then((response) =>{
    //     console.log(response)
    // })

    var headersList = {
        // "Origin": "localhost:3000",
        "Content-Type":"application/json"
    }

    useEffect(() =>{
      axios({
        method: 'GET',
        url: trade_url,
        headers: headersList,
      }).then((response) =>{
        // console.log("display response", response)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setCoin(response.data.coin)
    
        let convertDate = new Date(response.data.trade_date)
        setDisplayDate(convertDate.toString())
        setTradeDate(response.data.trade_date)
        setEntryPrice(response.data.entry_price)
        setExitPrice(response.data.exit_price)
        setId(response.data.id)
  

      

      })

    }, [])

    
    if(coin !== undefined && tradeDate !== undefined){
      console.log(tradeDate)
      return(
        <>
        <NavBar />
        <div>
          Date created: {displayDate} <br/>
          Title: {title} <br/>
          Coin: {coin} <br/>
          Description:{description} <br/>
          <br/>
          Entry Price: {entryPrice} <br/>
          Exit Price: {exitPrice} <br/>
          Take Profit:<br/>
          Stop Loss:<br/>
          <br/>
          Leverage:<br/>
          Margin:<br/>
          <br/>
          Reason for buying: <br/>
          Reason for Selling: <br/>


        </div>
        {/* <TradeDailyCandles coin={coin} chartDate ={tradeDate}/>

        <div style={{height: "300px"}}>
        <TradeEMAChart coin={coin} tradeDate={tradeDate}/>

        </div> */}
        <Link to={`/edit-trade/${id}`}>Edit</Link>
        
        </>
      )
      


    }

    else
      return(
          <>
          LOADING...

          </>
      )
   
        

}


export default DisplayTrade;