import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from './NavBar';


function processDate(tradeDate){
    let result = tradeDate.slice(0,10)
  
    return result
  }

function dataCheck(key, formData, tradeData){
    if(key === 'title'){
        tradeData.trade.title = formData[key]
        return tradeData
    }
    if(key === 'description'){
        tradeData.trade.description = formData[key]
        return tradeData
    }
    if(key === 'coin'){
        tradeData.trade.coin = formData[key]
        return tradeData
    }
    if(key === 'entry_price'){
        tradeData.trade.entry_price = parseFloat(formData[key])
        return tradeData
    }
    if(key === 'exit_price'){
        tradeData.trade.exit_price = parseFloat(formData[key])
        return tradeData
    }
}

function tradeCheck(tradeData){
    for(const key of Object.keys(tradeData)){
        // console.log(key)
        if(tradeData[key] === ''){
            delete tradeData[key]
        }
    }
    return tradeData
    // console.log(tradeData)

}

export default function TradeEdit(props){
  let { trade_id } = useParams()
  let navigate = useNavigate()

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [coin, setCoin] = useState()
  const [tradeDate, setTradeDate] = useState()
  const [entryPrice, setEntryPrice] = useState()
  const [exitPrice, setExitPrice] = useState()
  
  const { register, handleSubmit, formState: { errors } } = useForm();




  const onSubmit = data => {

    console.log(data)
    let tradeData = {
        trade: {
            title: '',
            description: '',
            coin: '',
            entry_price: '',
            exit_price: ''
        }   
      }

    let entryPrice = parseFloat(data.entryPrice)
    let exitPrice = parseFloat(data.exitPrice)

    for(const key of Object.keys(data)){
        if(data[key] !== ''){
            // console.log(key, data[key])
            dataCheck(key, data, tradeData)
            
        }
        
    }

    // console.log(tradeData)
    tradeCheck(tradeData.trade)
    console.log(tradeData)


    // console.log(tradeData)
    // console.log(typeof (tradeData.trade.daily_candles))
    var url = `http://localhost:5000/trades/${trade_id}`

    var railsHeadersList = {
        // "Origin": "localhost:3000",
        "Content-Type":"application/json"
    }

    axios({
      method: 'PATCH',
      url: url,
      data: tradeData,
    }).then((response) =>{
      console.log(response)
      // response.data.id
      // return response.data.id
      navigate(`/display-trade/${response.data.id}`)
    })
 
     
      
  }


  useEffect( () => {
    var trade_url = `http://localhost:5000/trades/${trade_id}.json`
    var headersList = {
        "Content-Type":"application/json"
    }
    axios({
        method: 'GET',
        url: trade_url,
        headers: headersList,
      }).then((response) =>{
        console.log("display response", response)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setCoin(response.data.coin)
        setTradeDate(processDate(response.data.created_at))
        setEntryPrice(response.data.entry_price)
        setExitPrice(response.data.exit_price)

      })

  }, [])


    return(
        <>
    <NavBar />
    Edit Trade
    <p>Create a new Trade Entry:</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
  
      <input defaultValue={title} {...register("title")} />
      <br/>

      <input defaultValue={coin} {...register("coin")} />
      <br/>

      <input defaultValue={description} {...register("description")} />
      <br/>

      <input defaultValue={entryPrice} {...register("entry_price")} />
      <br/>

      <input defaultValue={exitPrice} {...register("exit_price")} />
      <br/>
      
      
      <input type="submit" />
    </form>
    </>
    )
}