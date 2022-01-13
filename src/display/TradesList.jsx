import axios from 'axios'


export default function TradesList(props){

    var url = "http://localhost:5000/trades"
    var headersList = {
        "Content-Type":"application/json"
    }
    axios({
        method: 'GET',
        url: url,
        headers: headersList,
      }).then((response) =>{
        console.log("display response", response)

      })
      
    return(
        <>
        trades list
        </>
    )

}