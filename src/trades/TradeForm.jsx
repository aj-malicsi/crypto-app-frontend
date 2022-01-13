import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import NavBar from "../display/NavBar";

var fiat = "USD"
var key = "KB26K4SV9OF3UUKK"
var apiHeadersList = {
  'User-Agent': 'request',
}


function dailyCandleUpdate(tradeData){
    // console.log("daily candle function", tradeData)
    var coin = tradeData.trade.coin
    var cryptoUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin}&market=${fiat}&apikey=${key}`
    

    axios.get(cryptoUrl, {headers: apiHeadersList,
    }).then((response) =>{
    // console.log("api response",response.data)
    tradeData.trade.daily_candles = response.data  
    return tradeData;  
    })

}

function rsiUpdate(tradeData){
    var coin = tradeData.trade.coin
    var interval = "daily"
    var time_period =7
    var url = `https://www.alphavantage.co/query?function=RSI&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=close&apikey=${key}`;


    axios.get(url, {headers: apiHeadersList,
        
    }).then((response) =>{
      // console.log("api response",response.data)
      tradeData.trade.rsi_data = response.data  
      return tradeData; 
    })

}

function emaUpdate(tradeData){
  var coin = tradeData.trade.coin
  var interval = "daily"
  var time_period =7
  var url = `https://www.alphavantage.co/query?function=EMA&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=close&apikey=${key}`;

  axios.get(url, {headers: apiHeadersList,
      
  }).then((response) =>{
      tradeData.trade.ema_data = response.data
      return tradeData; 
  })

}


  



export default function TradeForm(props) {
  let navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = data => {

    // console.log(data.coin, data.title, data.description);
    let tradeData = {
        trade: {
          title: data.title,
          description: data.description,
          coin: data.coin,
          // daily_candles: {},
          // rsi_data: {},
          // ema_data: {},
          //rsi
          //ema
        }   
      }

    console.log(tradeData)
    // console.log(typeof (tradeData.trade.daily_candles))
    var url = "http://localhost:5000/trades"

    var railsHeadersList = {
        // "Origin": "localhost:3000",
        "Content-Type":"application/json"
    }

    axios({
      method: 'POST',
      url: url,
      data: tradeData,
    }).then((response) =>{
      console.log(response)
      // response.data.id
      // return response.data.id
      navigate(`/display-trade/${response.data.id}`)
    })
 
     
      
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <NavBar />
    <p>Create a new Trade Entry:</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
  
      <input defaultValue="Title" {...register("title")} />
      <br/>

      <input defaultValue="Ticker here(e.g. BTC, ETH)" {...register("coin")} />
      <br/>

      <input defaultValue="Description" {...register("description")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <br/>
      
      <input type="submit" />
    </form>
    </>
  );
}