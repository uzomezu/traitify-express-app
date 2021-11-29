import config from '../config.js';
export async function getStatus(assessment_id) {
    const options = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Basic ${config.secret_key + ":" + "x"}`
        }
    } 
    const res = await fetch(`${config.host_url}/v1/assessments/${assessment_id}`, options);
    const data = await res.json();

    console.log(data.status)

    return data.status;

}
export const getMyProfile = async () => {
    if (localStorage.authtoken) {
        const url = `${window.origin}/api/users/me`;
        const auth = `Bearer ${localStorage.authtoken}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : auth
            }
        }
        const res = await fetch(url, options);
        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else {
            alert("Error: in retreiving user profile");
            localStorage.clear();
            window.location.replace(`${window.origin}/login.html`)
        }
        
    } else {
        alert("Error: User is not authorized.");
        localStorage.clear();
        window.location.replace(`${window.origin}/login.html`);
    }
}
export const getAllAssessments = async (userId) => {
    
    if (localStorage.authtoken) {
        const urlTraitify = (assessment_id) => {return `${config.host_url}/v1/assessments/${assessment_id}?data=archetype,types,traits,recommendation`;}
        const traitifyAuth = `Basic ${config.secret_key + ":" + "x"}`
        const urlLocalAPI = `${window.origin}/api/users/${userId}/my-tests`;
        const localAuth = `Bearer ${localStorage.authtoken}`;
        
        const allAssessmentResults = [];
    
        const localOptions = {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : localAuth
            }
        }
        const traitifyOptions = {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : traitifyAuth
            }
        }

        const myTestsRes = await fetch(urlLocalAPI, localOptions);
        const myTestsData = await myTestsRes.json();

        for (const test of myTestsData) {
            // iterate through each test and grab results
            if (test.isComplete == true) {
                
                const traitifyRes = await fetch(urlTraitify(test.uuid), traitifyOptions);

                const data = await traitifyRes.json();

                allAssessmentResults.push(data);
            }
        }

        return allAssessmentResults;
    }
}
export const getCurrentAssessment = async () => {
    const options = {
        method: "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${localStorage.authtoken}`
        }
    };

    const res = await fetch(`${window.origin}/api/assessments/current-assessment`, options);

    const resStatusCode = res.status;

    const data = await res.json();

    return {
        status : resStatusCode,
        data : data
    };
}
export async function createNewAssessment() {
    const body = {
        "deck_id" : "big-five"
    }
    const options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Basic ${config.secret_key + ":" + "x"}`
        },
        body: JSON.stringify(body)
    }

    const res = await fetch(`${config.host_url}/v1/assessments`, options);
    const data = await res.json()

    // Log the assessment
    const auth = `Bearer ${localStorage.authtoken}`;
    const newOptions = {
         method: "POST",
         headers : {
             "Content-Type" : "application/json",
             "Accept" : "application/json",
             "Authorization" : auth
         },
         body : JSON.stringify({
             "id" : data.id
         })
     };
     const newAssessmentResponse = await fetch(`${window.origin}/api/assessments`, newOptions);
     const resStatus = newAssessmentResponse.status;
     const result = await newAssessmentResponse.json();
     
     return {
        status : resStatus,
        data : result
     };
    
}

export const completeAssessment = async (pk) => {
    const url = `${window.origin}/api/assessments/${pk}`;
    const auth = `Bearer ${localStorage.authtoken}`;
    const options = {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : auth
        }
    }
    const res = await fetch(url, options);
    const status = res.status;
    const data = await res.json();

    return {
        status: status,
        data: data
    };
}