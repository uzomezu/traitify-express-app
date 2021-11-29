import { registerUser } from "../modules/auth.controller.js";

const { useState, useEffect} = React;

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

const Register = (props) => {
    console.log("Hello World")
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(()=>{
        if (localStorage.authtoken){
            console.log("User is logged in!")
            window.location.replace(`${window.origin}`)
        }
    },[localStorage.authtoken])
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, username, password, confirmPassword)
        if (password == confirmPassword) {
            const result = await registerUser(email, username, password);
            console.log(result);
            if (result.id) {
                window.location.replace(`${window.origin}/login.html`)
            }
        } else {
            alert("Passwords must match!")
        }
    }
    return (
        <>
        <div className="register-login-form">
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <p>Please Enter information to register account</p>
            <hr/>
            <InputControl onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" name="email" id="email" label="Email" required={true}/>
            <InputControl onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" name="username" id="username" label="Username" required={true}/>
            <InputControl onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" name="password" id="password" label="Password" required={true}/>
            <InputControl onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder="Retype Password" name="confirm_password" id="confirm_password" label="Confirm Password" required={true}/>
            <hr/>
            <button type="submit" className="submitbtn">Register</button>
            </form>
        </div>
        </>
    );
}

class App extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Register/>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));