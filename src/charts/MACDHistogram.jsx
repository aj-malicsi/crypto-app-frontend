import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import axios from 'axios'
import {useEffect, useState} from 'react'


// const key = 'KB26K4SV9OF3UUKK'
// var coin = "BTC"
// var fiat = "USD"
// var interval = "daily"
// var time_period =7
// var url = `https://www.alphavantage.co/query?function=MACD&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=open&apikey=${key}`;


var histArr = []
var dateArr = []
var headersList = {
    'User-Agent': 'request'
}

// axios.get(url, {headers: headersList,
    
// }).then((response) =>{
//     var info = response.data["Technical Analysis: MACD"]

//     if (info.Note === undefined){
//         for(const key of Object.keys(info)){
//           dateArr.unshift(key)
//           for(const macdKey of Object.keys(info[key])){
//               if(macdKey === 'MACD_Hist'){
//                 histArr.unshift(info[key][macdKey])
//             }
       
//           }
//         }
//     }
 

//     }
    
// )

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = dateArr

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: histArr,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function MACDHistogram() {

    const [histArr, setHistArr] = useState([])
    const [dateArr, setDateArr] = useState([])
    var tempDateArr = []
    var tempHistArr = []

    // console.log(data.datasets[0]['data'].length)

    useEffect( () =>{
        const key = 'KB26K4SV9OF3UUKK'
        var coin = "BTC"
        var fiat = "USD"
        var interval = "daily"
        var time_period =7
        var series_type = "close"
        var url = `https://www.alphavantage.co/query?function=MACD&symbol=${coin}${fiat}&interval=${interval}&series_type=${series_type}&apikey=${key}`;
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
                if(macdKey === 'MACD_Hist'){
                    data.datasets[0]['data'].unshift(info[key][macdKey])
                    tempHistArr.unshift(info[key][macdKey])
                }
            
            }
                }
                // console.log(tempHistArr)
                setHistArr(tempHistArr)
                setDateArr(tempDateArr)
            
            
        
    
            }
            
        )

    },[])
    // histArr.push(1)
    // console.log(histArr)
   
    if(data.datasets[0]['data'].length > 1){
        // console.log(data.labels)
        console.log("history array length =>",histArr.length)
        console.log("data array length =>",data.datasets[0]['data'].length)
        // console.log(dateArr.length)
        return <Bar options={options} data={data} />;
    }
    else
        return(<p>macd histogram</p>)

  
}
