import React from "react";
import { useForm } from "react-hook-form";

export default function CoinForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
      console.log(data.coin);
      props.setCoin(data.coin)
  }



  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
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