export const registerUser = async (email, username, password) => {
    const body = {
        email : email,
        username : username,
        password : password
    }
    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(body)
    }
    const res = await fetch("http://localhost:5000/api/users/register", options);
    const data = await res.json();

    if (data.message) {
        alert(data.message)
    } else {
        return data
    }
}

export const loginUser = async (identifier, password) => {
    const body = {
        identifier : identifier,
        password : password
    }
    const options = {
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(body)
    }

    const res = await fetch(`${window.origin}/api/users/login`, options);
    const data = await res.json();

    if (data.data.authtoken) {
        localStorage.setItem("authtoken", data.data.authtoken);
        window.location.replace(`${window.origin}/`)
        return data;
    } else {
        alert(data.message)
    }
}

export const logOutUser = async () => {
    if (localStorage.authtoken) {
        const auth = `Bearer ${localStorage.authtoken}`;
        const options = {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : auth
            }
        }
        const res = await fetch(`${window.origin}/api/users/logout`, options);
        

        if (res.status !== 204) {
            const data = await res.json();
            alert(data.message);
        } else {
            localStorage.removeItem("authtoken");
            window.location.replace(`${window.origin}/login.html`)
        }
    } else {
        null
    }
}