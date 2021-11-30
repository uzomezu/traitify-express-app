import config from "../config.js";
import {getStatus, createNewAssessment, getCurrentAssessment, completeAssessment, getMyProfile, getMyTests} from '../modules/assessment.controller.js'
(async ()=>{
    window.onload = async function(e){
        var assessment_id;
        if (localStorage.authtoken) {
            console.log("There is an authtoken in storage, feel free to request api");
            const result = await getCurrentAssessment();
            if (result.status == 400) {
                // something is wrong or there is no new assessment
                const myProfile = await getMyProfile();

                const userId = myProfile.id;

                const assessments = await getMyTests(userId);
                
                console.log(assessments);
                if(assessments.length > 0) {
                    for (const test of assessments) {
                        const isComplete = await getStatus(test.uuid);
                        if (isComplete == "complete"){
                            const completeTest = await completeAssessment(test.id);
                            if (completeTest.status == 200) {
                                const anotherNewTest = await createNewAssessment();
                                if (anotherNewTest.status == 200) {
                                    localStorage.assessment_id = anotherNewTest.data.data.uuid // ... the traitify assessment_id
                                }
                            }
                        }
                    }
                } else {
                    // Create a new test and log it 
                    const newAssessmentReq = await createNewAssessment();
                    if (newAssessmentReq.status == 200) {
                        localStorage.assessment_id = newAssessmentReq.data.data.uuid // ... the traitify assessment_id
                    }
                }

                
            } else {
                const checkComplete = await getStatus(result.data.uuid);
                        if (checkComplete == "complete"){
                            const logCompletion = await completeAssessment(result.data.id);
                            if (logCompletion.status == 200) {
                                if(confirm("would you like to take another test?")){
                                    const myNewTest = await createNewAssessment();
                                    if (myNewTest.status == 200) {
                                        localStorage.assessment_id = myNewTest.data.data.uuid // ... the traitify assessment_id
                                    }
                                } else {
                                    // grab uuid from getCurrentAssessment
                                    localStorage.assessment_id = result.data.uuid
                                }
                            }
                        }
                
            }
        } else {
            window.location.replace(`${window.origin}/login.html`)
        }
        Traitify.setHost(config.host_url);
        Traitify.setPublicKey(config.public_key); 
        const assessment = Traitify.ui.component();
        assessment.assessmentID(localStorage.assessment_id);
        assessment.target("#traitify");
        assessment.render();
    }     
})()