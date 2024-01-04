import { IoMdFootball } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Navbar = (props)=>{

    function handleClick(e)
    {
        if(e.target.id == "1")
        {
            props.Set(0)
        }else{
            props.Set(1);
        }
    }
    return(
        <nav>
            <main className="logo">
                <img src={require("../assets/icon.png")}/>
            </main>
            <div className="nav-links">
                <GiHamburgerMenu onClick={handleClick} id="1" className="links"/>
                <BsPeopleFill onClick={handleClick} id="2" className="links"/>
            </div>
        </nav>
    )
};


export default Navbar;