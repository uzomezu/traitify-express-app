import config from "../config.js";
import {getStatus, createNewAssessment, getCurrentAssessment, completeAssessment} from '../modules/assessment.controller.js'
(async ()=>{
    var assessment_id;
    if (localStorage.authtoken) {
        console.log("There is a current user, feel free to request api or traitify");
        // successful login and authtoken in storage

        if (localStorage.assessment_id) {
            const checkCompletion = await getStatus(localStorage.assessment_id);
            if (checkCompletion !== "complete") {
                assessment_id = localStorage.assessment_id
            } else {
                // confirm complete assessment
                const myCurrentAssessment = await getCurrentAssessment();
                console.log(myCurrentAssessment.data.id);
                const resToComplete = await completeAssessment(myCurrentAssessment.data.id);
                if (resToComplete.status == 200) {
                    if (confirm('Would you like to make a new assessment?')) {

                        const myNewAssessmentReq = await createNewAssessment();
                        if (myNewAssessmentReq.status == 200) {
                                assessment_id = myNewAssessmentReq.data.data.uuid // ... the traitify assessment_id
                                localStorage.setItem('assessment_id', myNewAssessmentReq.data.data.uuid);
                            }
                                
                            } else {
                                console.log("No new assessment will be created");
                                assessment_id = localStorage.assessment_id
                            }
                }
            }

        } else {
            const result = await getCurrentAssessment();

            if (result.status !== 200) {
                console.log(result.data);
                // get a new assessment id
                const newAssessment = await createNewAssessment();
                if (newAssessment.status == 200) {
                    assessment_id = newAssessment.data.data.uuid // ... the traitify assessment_id
                    localStorage.setItem('assessment_id', newAssessment.data.data.uuid)
                }
            } else {
                const myAssessmentStatus = await getStatus(result.data.uuid);
    
                if (myAssessmentStatus !== 'complete') {
                    assessment_id = result.data.uuid
                    localStorage.setItem('assessment_id', result.data.uuid)
                } else {
                    const resCompleteAssessment = await completeAssessment(result.data.id);
                    if (resCompleteAssessment.status == 200) {
                        if (confirm('Would you like to make a new assessment?')) {
    
                                    const newAssessmentReq = await createNewAssessment();
                                    if (newAssessmentReq.status == 200) {
                                        assessment_id = newAssessmentReq.data.data.uuid // ... the traitify assessment_id
                                        localStorage.setItem('assessment_id', newAssessmentReq.data.data.uuid);
                                    }
                                    
                                } else {
                                    console.log("No new assessment will be created");
                                    assessment_id = localStorage.assessment_id
                                }
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
    if (localStorage.assessment_id) {
        assessment.assessmentID(localStorage.getItem('assessment_id'));
    } else {
        assessment.assessmentID(assessment_id);
    }
    assessment.target("#traitify");
    assessment.render();
        
})()