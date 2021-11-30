import { loginUser } from "../modules/auth.controller.js";
const { useState, useEffect } = React;
const InputControl = (props) => {
    return (
        <>
        <label htmlFor={props.name}>
            {props.label}
        </label>
        <input 
            type={props.type} 
            placeholder={props.placeholder} 
            name={props.name} 
            id={props.id} 
            required={props.required}
            onChange={props.onChange}
            value={props.value}/>
        </>
    );
}

function Login(props){
    const [indentifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const result = await loginUser(indentifier, password);
        console.log(result);
    }
    useEffect(()=>{
        if (localStorage.authtoken){
            console.log("User is logged in!")
            window.location.replace(`${window.origin}`)
        }
    },[localStorage.authtoken])
    return (
        <div className="register-login-form">
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p>Please Enter identifier (email or username) and password</p>
            <hr/>
            <InputControl onChange={(e)=>{setIdentifier(e.target.value)}} type="text" placeholder="Email or Password" name="identifier" id="identifiier" label="Email or Password" required={true}/>
            <InputControl onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" name="password" id="password" label="Password" required={true}/>
            <hr/>
            <button type="submit" className="submitbtn">Login</button>
            </form>
            </div>
    );

}

ReactDOM.render(<Login/>, document.getElementById("app"));