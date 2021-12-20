import { useState } from 'react'
import './App.css';
// import { EMAChart } from './charts/EMAChart';
import { MACDHistogram } from './charts/MACDHistogram';
import { MACDLineChart } from './charts/MACDLineChart';
import { RSIChart } from './charts/RSIChart';
import DisplayCoin from './display/DisplayCoin';
import CoinForm from './forms/CoinForm';
import CandlestickExample from './sample_charts/CandlestickSample';



function App() {
  const [coin, setCoin] = useState('')
  
  console.log("app coin state =>", coin)
  return (
    <>
    <CoinForm 
    coin = {coin}
    setCoin = {setCoin}
    DisplayCoin = {DisplayCoin}
    />
  
   




    </>
  );
}

export default App;
