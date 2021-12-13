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
import {useEffect} from 'react'


const key = 'KB26K4SV9OF3UUKK'
var coin = "BTC"
var fiat = "USD"
var interval = "daily"
var time_period =90
var url = `https://www.alphavantage.co/query?function=EMA&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=open&apikey=${key}`;

var emaArr = []
var dateArr = []
var headersList = {
    'User-Agent': 'request'
}

axios.get(url, {headers: headersList,
    
}).then((response) =>{
    var info = response.data["Technical Analysis: EMA"]
    // console.log(response.data)

    if (info.Note === undefined){
        
        for(const key of Object.keys(info)){
          dateArr.unshift(key)
          for(const emaKey of Object.keys(info[key])){ 
            emaArr.unshift(info[key][emaKey])
          }
        }
    }
    console.log(emaArr)   
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
      text: 'EMA',
    },
    label:{
      display: false
    }
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels = dateArr






export const data = {
  labels,
  datasets: [
    {
      label: 'EMA',
      // data: [1,2,3,4,5,100],
      data: emaArr,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

export function EMAChart() {
     
  return <Line options={options} data={data} />;
}
