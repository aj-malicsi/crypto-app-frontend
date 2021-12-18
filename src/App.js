// import { useState } from 'react'
import './App.css';
import { EMAChart } from './charts/EMAChart';
import { MACDHistogram } from './charts/MACDHistogram';
import { MACDLineChart } from './charts/MACDLineChart';
import { RSIChart } from './charts/RSIChart';
import DisplayCoin from './display/DisplayCoin';
import CandlestickExample from './sample_charts/CandlestickSample';



function App() {
  
  return (
    <>
    <DisplayCoin
    
    />
    <CandlestickExample />
   




    </>
  );
}

export default App;
