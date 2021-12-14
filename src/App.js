// import { useState } from 'react'
import './App.css';
import { EMAChart } from './charts/EMAChart';
import { MACDHistogram } from './charts/MACDHistogram';
import { MACDLineChart } from './charts/MACDLineChart';
import DisplayCoin from './display/DisplayCoin';
import { LineChart } from './sample_charts/LineChart';


function App() {
  
  return (
    <>
    <DisplayCoin
    
    />

    <MACDHistogram />



    </>
  );
}

export default App;
