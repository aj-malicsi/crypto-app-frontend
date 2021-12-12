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
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4,5,100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function EMAChart() {
    //api call
    useEffect( () =>{
        
    const key = 'KB26K4SV9OF3UUKK'
    var coin = "BTC"
    var fiat = "USD"
    var interval = "daily"
    var time_period =7
    var url = `https://www.alphavantage.co/query?function=EMA&symbol=${coin}${fiat}&interval=${interval}&time_period=${time_period}&series_type=open&apikey=${key}`;

    var headersList = {
        'User-Agent': 'request'
        
    }

    axios.get(url, {headers: headersList,
    
    }).then((response) =>{
        var info = response.data
        // console.log(response.data)

        if (info.Note === undefined){
            console.log(info["Technical Analysis: EMA"]["2019-03-24"]["EMA"])
            // var keys = info.keys(info["Technical Analysis: EMA"])
        }
                
        }
    )


}, [])
    
  return <Line options={options} data={data} />;
}
