import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import DailyCandles from '../charts/DailyCandles'
import { RSIChart } from '../charts/RSIChart'
import {DailyEMAChart} from '../charts/DailyEMAChart'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";





function DisplayTrade(){

  let { trade_id } = useParams()

    var trade_url = `http://localhost:5000/trades/${trade_id}.json`
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [coin, setCoin] = useState()
    const [dailyCandle, setDailyCandle] = useState()
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
        // setDailyCandle(response.data.)

      })

    }, [])

    

    return(
        <>
        Display Trade here
       <div>
         Title: {title}, Coin: {coin}, Description:{description}
       </div>
       <DailyCandles coin={coin}/>

        </>
    )
   
        

}


export default DisplayTrade;