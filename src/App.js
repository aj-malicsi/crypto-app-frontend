// import { useState } from 'react'
import './App.css';
import { EMAChart } from './charts/EMAChart';
import { MACDHistogram } from './charts/MACDHistogram';
import { MACDLineChart } from './charts/MACDLineChart';
import DisplayCoin from './display/DisplayCoin';



function App() {
  
  return (
    <>
    <DisplayCoin
    
    />
    <MACDLineChart />
    
    <MACDHistogram />



    </>
  );
}

export default App;
