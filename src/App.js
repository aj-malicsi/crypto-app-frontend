import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
// import { EMAChart } from './charts/EMAChart';
import { MACDHistogram } from './charts/MACDHistogram';
import { MACDLineChart } from './charts/MACDLineChart';
import { RSIChart } from './charts/RSIChart';
import DisplayCoin from './display/DisplayCoin';
import DisplayTrade from './display/DisplayTrade';
import TradeEdit from './display/TradeEdit';
import TradesList from './display/TradesList';
import CoinForm from './forms/CoinForm';
import CandlestickExample from './sample_charts/CandlestickSample';
import TradeForm from './trades/TradeForm';



function App() {
  const [coin, setCoin] = useState('')
  
  console.log("app coin state =>", coin)
  return (
  <Routes>
    <Route path="/" 
    element={
    <CoinForm 
      coin={coin}
      setCoin = {setCoin}
      />
    } 
    />

    <Route path="/display-coin"
    element={
      <DisplayCoin 
      coin={coin}
      setCoin = {setCoin}
      />
    }/>

    <Route path="/new-trade"
    element={<TradeForm/>}
    />

    <Route path="/display-trade/:trade_id"
    element={<DisplayTrade/>}
    />
    <Route path="/edit-trade/:trade_id"
    element={<TradeEdit/>}
    />

    <Route path="/my-trades" 
    element={<TradesList />}
    />

  </Routes>
    
   
    
  
   




   
  );
}

export default App;
