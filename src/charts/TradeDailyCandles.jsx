/* App.js */
import CanvasJSReact from '../canvasjs.react.js';
import axios from 'axios'


var React = require('react');
var Component = React.Component;
// var CanvasJSReact = require('../canvasjs.react.js');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class DailyCandles extends Component {
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
			for(const key of Object.keys(info)){
				
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
				// console.log("key",key,"date", date)

				limit+=1
				if(limit < 100){
					dataPoints.push({
						x: date,
						y: ohlc
					})

				}
					
				
			}
			console.log("data points axios",dataPoints)
			chart.render();

		})


	} //componentdidmount end

	// componentDidUpdate(){
	// 	// var chart = this.chart;
	// 	this.chart.render()
	// }
}
// module.exports = CandlestickExample;       

export default DailyCandles