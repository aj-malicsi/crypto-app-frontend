import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import DailyCandles from '../charts/DailyCandles'
import { RSIChart } from '../charts/RSIChart'
import {DailyEMAChart} from '../charts/DailyEMAChart'
import { useForm } from "react-hook-form";
import NavBar from './NavBar'




function DisplayCoin(props){

    const [coinInfo, setCoinInfo] = useState()
    const [interval, setInterval] = useState("daily")



    useEffect( () =>{
        
        const key = 'KB26K4SV9OF3UUKK'
        var coin = props.coin
        var fiat = "USD"
        var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${coin}&to_currency=${fiat}&apikey=${key}`;

        var headersList = {
            'User-Agent': 'request'

        }

        axios.get(url, {headers: headersList,
        
        }).then((response) =>{
            var info = response.data
            // console.log(response)

            if (info.Note === undefined){
                // console.log(info["Realtime Currency Exchange Rate"]["1. From_Currency Code"])
                setCoinInfo(info)
            }
                    
            }
        )


    }, [])

    console.log("interval display =>", interval)


    if(coinInfo !== undefined && coinInfo.Note === undefined ){
        var exchange_rate = parseFloat(coinInfo["Realtime Currency Exchange Rate"]["5. Exchange Rate"])

        return(
            <>
            <NavBar />
            <div>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["2. From_Currency Name"]}</p>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}</p>
            <p>${exchange_rate.toFixed(2)}</p>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}</p> 
            <p>{coinInfo["Realtime Currency Exchange Rate"]["7. Time Zone"]}</p> 

            </div>
           
           
            
            <button onClick={() => setInterval("5min")}>5m</button>
            <button onClick={() => setInterval("15min")}>15m</button>
            <button onClick={() => setInterval("30min")}>30m</button>
            <button onClick={() => setInterval("60min")}>1h</button>
            <button onClick={() => setInterval("daily")}>Daily</button>
            
            
            
            
            <DailyCandles coin={props.coin}/>
            <div style={{height: "300px"}}>
                <RSIChart coin={props.coin}/>
            </div>
            <div style={{height: "300px"}}>
                <DailyEMAChart coin={props.coin} interval={interval}/>
            </div>

            
            

        
            </>
        ) 

    }
        
    else {
        return(
            <>
            <p>
                loading coin info...
            </p>
           
            </>
        )

    }
        

}


export default DisplayCoin;