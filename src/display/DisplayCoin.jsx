import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'



function DisplayCoin(props){

    const [coinInfo, setCoinInfo] = useState()



    useEffect( () =>{
        
        const key = 'KB26K4SV9OF3UUKK'
        var coin = "BTC"
        var fiat = "USD"
        var url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${coin}&to_currency=${fiat}&apikey=${key}`;

        var headersList = {
            'User-Agent': 'request'
            
        }

        // axios.get(url, {headers: headersList,
        
        // }).then((response) =>{
        //     var info = response.data
        //     console.log(response)

        //     if (info.Note === undefined){
        //         // console.log(info["Realtime Currency Exchange Rate"]["1. From_Currency Code"])
        //         setCoinInfo(info)
        //     }
                    
        //     }
        // )


    }, [])


    if(coinInfo !== undefined && coinInfo.Note === undefined ){
        var exchange_rate = parseFloat(coinInfo["Realtime Currency Exchange Rate"]["5. Exchange Rate"])

        return(
            <div>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["2. From_Currency Name"]}</p>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}</p>
            <p>${exchange_rate.toFixed(2)}</p>
            <p>{coinInfo["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}</p> 
            <p>{coinInfo["Realtime Currency Exchange Rate"]["7. Time Zone"]}</p> 

            </div>
        ) 

    }
        
    else {
        return(
            <>
            <p>
                coin info here
            </p>
           
            </>
        )

    }
        

}


export default DisplayCoin;