import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from './NavBar';

function processDate(dateString){
  let newDate = dateString.slice(0, dateString.length - 1)

  return newDate
 
}

function addDataToTrade(key, formData, tradeData){
  console.log("add data to trade FORM DATA", formData)
  console.log("add data to trade TRADE DATA", tradeData)
  console.log("add data key", key)

    
    if(key === "status"){
      tradeData.trade.status = formData[key]
      return tradeData
    }
    if(key === 'tradeDate'){ //should be form data key
      console.log(formData[key])
      tradeData.trade.trade_date = formData[key]
      return tradeData
    }
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
    if(key === 'leverage'){
        tradeData.trade.exit_price = parseFloat(formData[key])
          return tradeData
    }
    if(key === 'margin'){
      tradeData.trade.margin = parseFloat(formData[key])
        return tradeData    
    }
    if(key === 'takeProfit'){
      tradeData.trade.take_profit = parseFloat(formData[key])
        return tradeData    
    }
    if(key === 'stopLoss'){
      tradeData.trade.stop_loss = parseFloat(formData[key])
        return tradeData    
    }
    if(key === 'buyReason'){
      tradeData.trade.buying_reason = formData[key]
        return tradeData   
    }
    if(key === 'sellReason'){
      tradeData.trade.selling_reason = formData[key]
        return tradeData    
    }

    
}

function deleteEmpty(tradeData){
  console.log("DELETE EMPTY INITIAL DATA", tradeData)
    for(const key of Object.keys(tradeData)){
        // console.log(key)
        if(tradeData[key] === ''){
          // console.log("this key is empty", key, tradeData[key])
            delete tradeData[key]
        }
    }
    return tradeData
    
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

  const [takeProfit, setTakeProfit] = useState()
  const [stopLoss, setStopLoss] = useState()
  const [leverage, setLeverage] = useState()
  const [margin, setMargin] = useState()

  const [buyReason, setBuyReason] = useState()
  const [sellReason, setSellReason] = useState()

  const [status, setStatus] = useState()
  
  const { register, handleSubmit, formState: { errors } } = useForm();




  const onSubmit = data => {

    // console.log(data)
    let tradeData = {
        trade: {
            trade_date: '',
            title: '',
            description: '',
            coin: '',
            entry_price: '',
            exit_price: '',

            leverage: '',
            margin: '',
            take_profit: '',
            stop_loss: '',

            buying_reason: '',
            selling_reason:'',
            status: '',


        }   
      }

    let entryPrice = parseFloat(data.entryPrice)
    let exitPrice = parseFloat(data.exitPrice)

    for(const key of Object.keys(data)){
      // console.log(key)
        if(data[key] !== ''){
            // console.log(key, data[key])
            addDataToTrade(key, data, tradeData)
        }
    }

    deleteEmpty(tradeData.trade)
    console.log("after deleting empty fields",tradeData)


    var url = `http://localhost:5000/trades/${trade_id}`

    var railsHeadersList = {
        // "Origin": "localhost:3000",
        "Content-Type":"application/json"
    }

    // axios({
    //   method: 'PATCH',
    //   url: url,
    //   data: tradeData,
    // }).then((response) =>{
    //   console.log(response)
    //   // response.data.id
    //   // return response.data.id
    //   navigate(`/display-trade/${response.data.id}`)
    // })
 
     
      
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
        // console.log("display response", response)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setCoin(response.data.coin)

        setTradeDate(processDate(response.data.trade_date))
    
        setEntryPrice(response.data.entry_price)
        setExitPrice(response.data.exit_price)

        setLeverage(response.data.leverage)
        setMargin(response.data.margin)

        setTakeProfit(response.data.take_profit)
        setStopLoss(response.data.stop_loss)

        setBuyReason(response.data.buying_reason)
        setSellReason(response.data.selling_reason)

        if(response.data.status)
          console.log("true", response.data.status)
        
        if(!response.data.status)
          console.log("false", response.data.status)

        setStatus(response.data.status)
        


      })

  }, [])

  console.log(status)



    return(
        <>
    <NavBar />
    Edit Trade
    <p>Edit Trade Information</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
  
      <label>Date:</label><br/>
      <input type="datetime-local" defaultValue={tradeDate} {...register("tradeDate")}  />
  
      <br/>

      <label>Title:</label><br/>
      <input defaultValue={title} {...register("title")} />
      <br/>

      <label>Ticker:</label><br/>
      <input defaultValue={coin} {...register("coin")} />

      <br/>
      

      
      <label>Entry Price:</label><br/>
      <input defaultValue={entryPrice} {...register("entryPrice")} />
      <br/>

      
      <label>Exit Price:</label><br/>
      <input defaultValue={exitPrice}{...register("exitPrice")} />
      <br/>

      <label>Leverage:</label><br/>
      <input defaultValue={leverage} {...register("leverage")} />
      <br/>

      <label>Margin:</label><br/>
      <input defaultValue={margin} {...register("margin")} />
      <br/>

      <label>Take Profit</label><br/>
      <input defaultValue={takeProfit} {...register("takeProfit")} />
      <br/>

      <label>Stop Loss</label><br/>
      <input defaultValue={stopLoss} {...register("stopLoss")} />
      <br/>

      <label>Reason for Buying:</label><br/>
      <textarea defaultValue={buyReason} {...register("buyReason")} />
      <br/>

      <label>Reason for Selling:</label><br/>
      <textarea defaultValue={sellReason} {...register("sellReason")} />
      <br/>

      <label>Description:</label><br/>
      <textarea defaultValue={description}{...register("description")} />
      <br/>

      
      <label>Status:</label><br/>
      <input type="checkbox" checked ={status} defaultValue={status}  {...register("status")} />
      <br/>

      
      
  
      <br/>
      
      <input type="submit" />
    </form>
    </>
    )
}