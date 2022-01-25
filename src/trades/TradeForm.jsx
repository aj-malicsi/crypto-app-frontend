import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import NavBar from "../display/NavBar";



export default function TradeForm(props) {
  let navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = data => {
    console.log(data)

    let tradeData = {
        trade: {
          title: data.title,
          description: data.description,
          coin: data.coin,
          entry_price: parseFloat(data.entryPrice),
          exit_price: parseFloat(data.exitPrice),
          trade_date: data.tradeDate,

          leverage: parseFloat(data.leverage),
          margin: parseFloat(data.margin),

          take_profit: parseFloat(data.takeProfit),
          stop_loss: parseFloat(data.stopLoss),

          buying_reason: data.buyReason,
          selling_reason: data.sellReason,
          status: data.status,



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
      // navigate(`/display-trade/${response.data.id}`)
    })
 
     
      
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <NavBar />
    <p className="text-red-300">Create a new Trade Entry: </p>
    
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>Date:</label><br/>
      <input type="datetime-local" {...register("tradeDate", {required: true})}  />
      {errors.tradeDate && <span>This field is required</span>}
      <br/>

      <label>Title:</label><br/>
      <input defaultValue="Title" {...register("title")} />
      <br/>

      <label>Ticker:</label><br/>
      <input defaultValue="BTC" {...register("coin", {required: true})} />
      {errors.coin && <span>This field is required</span>}
      <br/>
      

      
      <label>Entry Price:</label><br/>
      <input defaultValue="0" {...register("entryPrice")} />
      <br/>

      
      <label>Exit Price:</label><br/>
      <input defaultValue="0" {...register("exitPrice")} />
      <br/>

      <label>Leverage:</label><br/>
      <input defaultValue="2" {...register("leverage")} />
      <br/>

      <label>Margin:</label><br/>
      <input defaultValue="100" {...register("margin")} />
      <br/>

      <label>Take Profit</label><br/>
      <input defaultValue="0" {...register("takeProfit")} />
      <br/>

      <label>Stop Loss</label><br/>
      <input defaultValue="0" {...register("stopLoss")} />
      <br/>

      <label>Reason for Buying:</label><br/>
      <textarea defaultValue="0" {...register("buyReason")} />
      <br/>

      <label>Reason for Selling:</label><br/>
      <textarea defaultValue="" {...register("sellReason")} />
      <br/>

      <label>Description:</label><br/>
      <textarea defaultValue="Description" {...register("description")} />
      <br/>

      <label>Status:</label><br/>
      <input type="checkbox" {...register("status")} />
      <br/>

      
      
  
      <br/>
      
      <input type="submit" />
    </form>
    </>
  );
}