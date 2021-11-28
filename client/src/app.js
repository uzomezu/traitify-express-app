import config from "../config.js";
import {getStatus, createNewAssessment} from '../modules/assessment.controller.js'
(async ()=>{
    var assessment_id = localStorage.assessment_id ? localStorage.getItem('assessment_id') : config.assessment_id
    const status = await getStatus(assessment_id);
    if (status == 'complete') {
        if (confirm('Would you like to make a new assessment?')) {

            const newAssessmentId = await createNewAssessment();
            localStorage.setItem('assessment_id', newAssessmentId);
        } else {
            console.log("No new assessment will be created")
        }
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