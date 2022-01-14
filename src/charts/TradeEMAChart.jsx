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

var ema7Arr = []
var ema25Arr = []
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
  maintainAspectRatio: false,
  elements:{
    point:{
      radius: 2
    }
  },
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
      label: '7 EMA',
      data: ema7Arr,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '25 EMA',
      data: ema25Arr,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function TradeEMAChart(props) {

// console.log("interval EMA =>",props.interval)
// console.log(props.tradeDate)


     
   const [ema7Arr, setEma7Arr] = useState([])
   const [ema25Arr, setEma25Arr] = useState([])
   const [dateArr, setDateArr] = useState([])
   const [interval, setInterval] = useState("daily")
   const [chartDate, setChartDate] = useState(props.tradeDate)
   var tempDateArr = []
   var tempEmaArr = []

 
    useEffect( () =>{
    
    console.log("use effect interval =>", interval)
     
    const key = 'KB26K4SV9OF3UUKK'
    var coin = props.coin
    var fiat = "USD"
    // var interval = props.interval
    var time_period =7
    var url = `https://www.alphavantage.co/query?function=EMA&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=close&apikey=${key}`;

  
    var headersList = {
        'User-Agent': 'request'
    }

    // console.log(props.tradeDate)
    console.log(chartDate)

    // var dummy = "2021-12-12"

    // var tempDate = new Date(props.tradeDate)
    var tempDate = new Date(chartDate)
    // var tempDate = new Date(dummy)

    console.log(tempDate)

    axios.get(url, {headers: headersList,
        
    }).then((response) =>{
        var info = response.data["Technical Analysis: EMA"]
        // console.log("EMA 7 DATA", response.data)

        for(const key of Object.keys(info)){
            
          if(tempDateArr.length < 100){
            let date = new Date(key)
            // console.log(date)
            if(date.getFullYear() === tempDate.getFullYear() && date.getMonth() === tempDate.getMonth() && date.getDate() === tempDate.getDate()){
                tempDateArr.unshift(key)
                data.labels.unshift(key)
                for(const emaKey of Object.keys(info[key])){ 
                    if(tempEmaArr.length < 100){
                      data.datasets[0]['data'].unshift(info[key][emaKey])
                      tempEmaArr.unshift(info[key][emaKey])
          
                    }  
                  }
                console.log("found it", date, tempDate)
            }

            if(date < tempDate){
                tempDateArr.unshift(key)
                data.labels.unshift(key)
                for(const emaKey of Object.keys(info[key])){ 
                    if(tempEmaArr.length < 100){
                      data.datasets[0]['data'].unshift(info[key][emaKey])
                      tempEmaArr.unshift(info[key][emaKey])
                    }  
                  }
            }
          }

        
      }
      setEma7Arr(tempEmaArr)
      setDateArr(tempDateArr)
    })

    // console.log(data.datasets[0]['data'])

    // console.log(ema7Arr.length, ema25Arr.length)
 

    var tempEma25Arr = []

    //25 ema
    var url = `https://www.alphavantage.co/query?function=EMA&symbol=${coin}${fiat}&interval=${interval}&time_period=25&series_type=open&apikey=${key}`;
    
    axios.get(url, {headers: headersList,
      
      }).then((response) =>{
          var info = response.data["Technical Analysis: EMA"]
          // console.log("EMA 25 DATA", response.data)
  
          for(const key of Object.keys(info)){
  
            for(const emaKey of Object.keys(info[key])){ 
              if(tempEma25Arr.length < 100){
                data.datasets[1]['data'].unshift(info[key][emaKey])
                tempEma25Arr.unshift(info[key][emaKey])
                // console.log(tempEma25Arr.length)
    
              }  
            }
        }
        setEma25Arr(tempEma25Arr)
        // console.log(tempEma25Arr)
        // console.log(data.datasets[1]['data'])
      })

      console.log(tempEma25Arr)

      // console.log(ema7Arr.length, ema25Arr.length)
      // console.log(data.datasets[0]['data'])
      // console.log(data)
  
    },[interval])



     
  if(data.datasets[0]['data'].length > 1){
    // console.log(data)
      // console.log(data.labels)
      // console.log("data array length =>",data.datasets[0]['data'].length)

      return <Line options={options} data={data} />;
  }
  else
      return(<p>ema line chart loading</p>)
}
