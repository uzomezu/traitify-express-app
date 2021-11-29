import { logOutUser } from "../modules/auth.controller.js";
const { useState, useEffect } = React;


const NavBar = (props) => {
    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("Logging User Out...");
        const data = await logOutUser()
    }
    return(
        <div className="nav">
        <div>
            <a href="/"><i class="fas fa-home"></i></a>   
        </div>

        <div id="login_register">
           {localStorage.authtoken ? 
           <>
            <a href="/profile.html">Profile</a> 
            <a href="" onClick={handleLogout}>Logout</a> 
           </> : 
           <>
           <a href="/login.html">Login</a>
           <a href="/register.html">Register</a>
           </>
               
           }
        </div>
    </div>
    )
}
ReactDOM.render(<NavBar/>, document.getElementById("navbar"));