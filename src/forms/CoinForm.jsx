import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NavBar from "../display/NavBar";



export default function CoinForm(props) {
  let navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
      console.log(data.coin);
      props.setCoin(data.coin)
      navigate("/display-coin")
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
    <NavBar />
    <p>Search for a coin:</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="Ticker here(e.g. BTC, ETH)" {...register("coin")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      
      <input type="submit" />
    </form>
    </>
  );
}