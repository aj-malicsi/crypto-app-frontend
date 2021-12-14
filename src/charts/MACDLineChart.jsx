import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import axios from 'axios'


const key = 'KB26K4SV9OF3UUKK'
var coin = "BTC"
var fiat = "USD"
var interval = "daily"
var time_period =7
var url = `https://www.alphavantage.co/query?function=MACD&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=open&apikey=${key}`;

var macdArr = []
var signalArr = []
var histArr = []
var dateArr = []
var headersList = {
    'User-Agent': 'request'
}

axios.get(url, {headers: headersList,
    
}).then((response) =>{
    var info = response.data["Technical Analysis: MACD"]
    console.log(info['2019-04-23']['MACD'])

    if (info.Note === undefined){
        
        for(const key of Object.keys(info)){
          dateArr.unshift(key)
          for(const macdKey of Object.keys(info[key])){
              if(macdKey === 'MACD'){
                  macdArr.unshift(info[key][macdKey])
              }
              if(macdKey === 'MACD_Signal'){
                  signalArr.unshift(info[key][macdKey])
              }
              if(macdKey === 'MACD_Hist'){
                histArr.unshift(info[key][macdKey])
            }
            //   console.log(macd) 
            // MACDArr.unshift(info[key][emaKey])
          }
        }
    }
    console.log(macdArr)   


    }
    
)



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: true,
      text: 'MACD',
    },
    label:{
      display: false
    }
  },
};

const labels = dateArr






export const data = {
  labels,
  datasets: [
    {
      label: 'MACD',
    //   data: [1,2,3,4,5,100],
    //   data: labels.map(() => [...macdArr]),
      data: macdArr,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Signal',
    //   data: labels.map(() => [...signalArr]),
        data: signalArr,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function MACDLineChart() {
     
  return <Line options={options} data={data} />;
}
