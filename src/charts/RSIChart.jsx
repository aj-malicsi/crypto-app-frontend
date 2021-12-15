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
import {useEffect, useState} from 'react'


var dateArr = []
var rsiArr = []



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
      text: 'RSI',
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
      label: 'RSI',
      // data: [1,2,3,4,5,100],
      data: rsiArr,
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

export function RSIChart() {

    const [rsiArr, setRsiArr] = useState([])
    const [dateArr, setDateArr] = useState([])
    var tempDateArr = []
    var tempRsiArr = []
 

    useEffect( () =>{
        const key = 'KB26K4SV9OF3UUKK'
        var coin = "BTC"
        var fiat = "USD"
        var interval = "daily"
        var series_type = "close"
        var time_period =7
        var url = `https://www.alphavantage.co/query?function=RSI&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=${series_type}&apikey=${key}`;

        var rsiArr = []
        var dateArr = []
        var headersList = {
            'User-Agent': 'request'
        }
    
        axios.get(url, {headers: headersList,
            
        }).then((response) =>{
            var info = response.data["Technical Analysis: RSI"]
            console.log(info)
         
            for(const key of Object.keys(info)){
                tempDateArr.unshift(key)
                data.labels.unshift(key)
            for(const rsiKey of Object.keys(info[key])){    
                data.datasets[0]['data'].unshift(info[key][rsiKey])
                tempRsiArr.unshift(info[key][rsiKey])
            
            }
                }
                // console.log(tempHistArr)
                setRsiArr(tempRsiArr)
                setDateArr(tempDateArr)
            
            }
            
        )
  
    },[])


     
  if(data.datasets[0]['data'].length > 1){
      // console.log(data.labels)
      // console.log("history array length =>",rsiArr.length)
      // console.log("data array length =>",data.datasets[0]['data'].length)

      return <Line options={options} data={data} />;
  }
  else
      return(<p>rsi line chart loading</p>)
}
