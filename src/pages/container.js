
import { useState , useEffect } from "react";
import "../CSS/navbar.css";
import "../CSS/container.css";

import Navbar from "../partials/navbar";
import TeamDetails from "./team_details";
import Overview from "./overview";

const Container = ()=>{
    const [page,setPage] = useState(0);
    const [overviewData,setOverviewData] = useState([]);
    const [roster,setRoster] = useState([]);
    const [alert,setAlert] = useState({display: true , heading: "No player data found" , message: "Please importer your roster first"});
    const [starters,setStarters] = useState([]);
    const [countries,setCountry] = useState([])
    const [positions,setPosition] = useState([])

    useEffect(()=>{
        let start = [];
        let country = [];
        let position = [];
        overviewData.forEach((item)=>{
            if(item.Starter == 'Yes')
                start.push(item);
            
            if(!country.includes(item.Nationality))
            {   
                country.push(item.Nationality)
            }

            if(!position.includes(item.Position))
            {   
                position.push(item.Position)
            }
        });

        console.log("Rendered");
        console.log("Number of Starters are ",start.length);
        console.log(start)

        setCountry(country);
        setPosition(position)

        if(start.length == 11)
        {
            setAlert({display:false});
        }

        if(start.length == 0)
        {
            let message = {
                display: true , 
                heading: "No player data found" , 
                message: "Please importer your roster first"
            }
            setAlert(message);
        }

        if(start.length < 11 && start.length != 0)
        {
            let message = {
                display: true,
                heading: "Not enough starters",
                message: "Your team does'nt have enough starters for one or more of the position in the 4-3-3 formation"
            }
            setAlert(message);
        }

        if(start.length > 11)
        {
            let message = {
                display: true,
                heading: "There are too many starters",
                message: "Your team has too many starters for one or more of the position in the 4-3-3 formation"
            }
            setAlert(message);
        }

    },[overviewData]);
    return(
        <div className="body">
            <Navbar Set={setPage}/>
            {
                page === 0 ? <TeamDetails Country={countries} Position={positions} RosterFun={setRoster} Roster={roster} Overview={setOverviewData}/> : <Overview Alert={alert} Overview={overviewData}/>
            }
        </div>
    )
}

export default Container;