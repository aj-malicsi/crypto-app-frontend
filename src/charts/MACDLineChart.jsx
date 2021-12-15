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


var macdArr = []
var signalArr = []
var dateArr = []




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
      data: macdArr,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Signal',
      data: signalArr,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function MACDLineChart() {
     
  const [macdArr, setMacdArr] = useState([])
  const [dateArr, setDateArr] = useState([])
  var tempDateArr = []
  var tempMacdArr = []
  var tempSignalArr = []

  // console.log(data.datasets[0]['data'].length)

  useEffect( () =>{
      const key = 'KB26K4SV9OF3UUKK'
      var coin = "BTC"
      var fiat = "USD"
      var interval = "daily"
      var time_period =7
      var url = `https://www.alphavantage.co/query?function=MACD&symbol=${coin}${fiat}&interval=${interval}&series_type=open&apikey=${key}`;
      var headersList = {
          'User-Agent': 'request'
      }
  
      axios.get(url, {headers: headersList,
          
      }).then((response) =>{
          var info = response.data["Technical Analysis: MACD"]
          console.log(info)
       
          for(const key of Object.keys(info)){
              tempDateArr.unshift(key)
              data.labels.unshift(key)
          for(const macdKey of Object.keys(info[key])){
              if(macdKey === 'MACD'){
                  data.datasets[0]['data'].unshift(info[key][macdKey])
                  tempMacdArr.unshift(info[key][macdKey])
              }
              if(macdKey === 'MACD_Signal'){
                data.datasets[1]['data'].unshift(info[key][macdKey])
                tempSignalArr.unshift(info[key][macdKey])
              }
          
          }
              }
              // console.log(tempHistArr)
              setMacdArr(tempMacdArr)
              setDateArr(tempDateArr)
          
          
      
  
          }
          
      )

  },[])
  // histArr.push(1)
  // console.log(histArr)
  console.log(data)
 
  if(data.datasets[0]['data'].length > 1){
      // console.log(data.labels)
      // console.log("history array length =>",macdArr.length)
      // console.log("data array length =>",data.datasets[0]['data'].length)

      return <Line options={options} data={data} />;
  }
  else
      return(<p>macd line chart loading</p>)
}
