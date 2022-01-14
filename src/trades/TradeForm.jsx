import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import NavBar from "../display/NavBar";



export default function TradeForm(props) {
  let navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = data => {

    // console.log(data.coin, data.title, data.description);
    // console.log(typeof(data.entryPrice))

    // console.log(typeof(convertToFloat(data.entryPrice)))

    let entryPrice = parseFloat(data.entryPrice)
    let exitPrice = parseFloat(data.exitPrice)
    // console.log(typeof entryPrice, entryPrice)


    let tradeData = {
        trade: {
          title: data.title,
          description: data.description,
          coin: data.coin,
          entry_price: entryPrice,
          exit_price: exitPrice,

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
      <br/>

      <input defaultValue="Entry Price" {...register("entryPrice")} />
      <br/>

      <input defaultValue="Exit Price" {...register("exitPrice")} />
      <br/>
      
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