import config from '../config.js';
export async function getStatus() {
    const options = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Basic ${config.secret_key + ":" + "x"}`
        }
    } 
    const res = await fetch(`${config.host_url}/v1/assessments/${config.assessment_id}`, options);
    const data = await res.json();

    console.log(data.status)

    return data.status;

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

    return data.id;
}