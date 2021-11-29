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

export default InputControl;