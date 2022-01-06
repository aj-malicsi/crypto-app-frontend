import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'



export default function TradeForm(props) {
  let navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

      console.log(data.coin, data.title, data.description);

      let tradeData = {
          title: data.title,
          description: data.description,
          coin: data.coin
      }
      var url = "localhost:5000/trades"

      var headersList = {
          Origin: "localhost:3000"
      }

      axios.post(url, headersList, tradeData)

      .then((response) =>{
          console.log(response)
      })
      
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
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