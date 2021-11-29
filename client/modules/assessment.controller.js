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