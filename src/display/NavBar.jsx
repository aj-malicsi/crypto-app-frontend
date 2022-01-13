import { Link } from "react-router-dom"


export default function NavBar(props){

    return(
        <>
        <nav>
        <Link to="/new-trade">Create </Link>
        <Link to="/my-trades">My Trades</Link>
        <Link to="/">Search</Link>

        </nav>
       

        </>
    )


}