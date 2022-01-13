import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import TradeDailyCandles from '../charts/TradeDailyCandles'
import { RSIChart } from '../charts/RSIChart'
import {DailyEMAChart} from '../charts/DailyEMAChart'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TradeEMAChart } from '../charts/TradeEMAChart'
import NavBar from './NavBar'


function processDate(tradeDate){
  let result = tradeDate.slice(0,10)

  return result
  


}



function DisplayTrade(){

  let { trade_id } = useParams()

    var trade_url = `http://localhost:5000/trades/${trade_id}.json`
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [coin, setCoin] = useState()
    const [tradeDate, setTradeDate] = useState()
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
        setTradeDate(processDate(response.data.created_at))
        // console.log(typeof (response.data.created_at))
        
        // setDailyCandle(response.data.)

      })

    }, [])

    
    if(coin !== undefined && tradeDate !== undefined){
      return(
        <>
        <NavBar />
         Display Trade here, coin is working
        <div>
          Date created: {tradeDate},Title: {title}, Coin: {coin}, Description:{description}
        </div>
        <TradeDailyCandles coin={coin} chartDate ={tradeDate}/>
        <div style={{height: "300px"}}>
        <TradeEMAChart coin={coin} tradeDate={tradeDate}/>

        </div>
        
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