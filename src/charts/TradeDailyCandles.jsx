/* App.js */
import CanvasJSReact from '../canvasjs.react.js';
import axios from 'axios'


var React = require('react');
var Component = React.Component;
// var CanvasJSReact = require('../canvasjs.react.js');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class TradeDailyCandles extends Component {
	render() {
		const options = {
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: ""
			},
			axisX: {
				valueFormatString: "YYYY MM DD H m s"
			},
			axisY: {
				title: "Price",
				prefix: "$",
				spacing: 50
			},
			data: [{
				type: "candlestick",
				name: "Price",
				color: "green",
				showInLegend: true,
				yValueFormatString: "$#####.##",
				xValueType: "dateTime",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	componentDidMount(){
		var chart = this.chart;
        console.log(this.props.coin)
        

		var coin = this.props.coin
		var fiat = "USD"
		var key = "KB26K4SV9OF3UUKK"
		var cryptoUrl = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin}&market=${fiat}&apikey=${key}`
		var headersList = {
            'User-Agent': 'request'  
        }
		let currentDate = this.props.chartDate
	

		if(dataPoints.length < 1){
			axios.get(cryptoUrl, {headers: headersList,
        
			}).then((response) =>{
				// console.log("api response",response.data)
				return response.data;
						
				}
			).then(function (data){
				console.log(data)
				var info = data['Time Series (Digital Currency Daily)']
				// console.log(info)
				let limit = 0;
				// let currentDate = "2021-12-12"
				// let currentDate = this.props.tradeDate
				let tradeDate = new Date(currentDate)
				for(const key of Object.keys(info)){
					// console.log(key)
					// dataPoints.push({y: key})
					// console.log(info[key])
					// console.log(key)
	
					let ohlc = []
					ohlc.push(parseFloat(info[key]['1a. open (USD)']), 
					parseFloat(info[key]['2a. high (USD)']), 
					parseFloat(info[key]['3a. low (USD)']), 
					parseFloat(info[key]['4a. close (USD)'])
					)
					// console.log(ohlc)
					let date = new Date(key)
				
	
					if(limit < 100){					
						// console.log(limit, date)
						if(date.getFullYear() === tradeDate.getFullYear() && date.getMonth() === tradeDate.getMonth() && date.getDate() === tradeDate.getDate()){
							console.log(limit, date)
							// limit = limit + 99
	
							dataPoints.push({
								x: date,
								y: ohlc
							})
						}
	
						if(date <= tradeDate){
							limit+=1
							dataPoints.push({
								x: date,
								y: ohlc
							})
						}		
					}
						
				}
				console.log("data points axios",dataPoints)
				chart.render();
	
			})

		}
        


	} //componentdidmount end

	// componentDidUpdate(){
	// 	// var chart = this.chart;
	// 	this.chart.render()
	// }
}
    

export default TradeDailyCandles