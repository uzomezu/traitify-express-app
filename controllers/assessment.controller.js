const Assessment = require('../models/assessment.model');


exports.logAssesment = async (req,res) => {
    if (!req.body.id) {
        res.status(400).send("Error: Must have relevant id to traitify quiz");
        return;
    }
    const allTests = await Assessment.findAll({where : {
        userId: req.user.id
    }});
    
    unFinishedTests = await allTests.flatMap((item, index)=>{
        if (item.isComplete == false){
            return item
        } 
    });
    const filterNull = unFinishedTests.filter(item=>item!==undefined)
    console.log(filterNull);
    if (filterNull.length > 0) {
        // console.log(unFinishedTests);
        res.status(400).send({message: "Error: You have an unfinished test, finish that one first", data: unFinishedTests})
    } else {
        const assessment = {
            uuid : req.body.id,
            userId : req.user.id
        }
        Assessment.create(assessment).then((data)=>{
            res.status(200).json({
                "message" : "Logged asssement into db!",
                "data" : data
            })
            }).catch(err=>{
                res.status(500).send({
                    message: err.message
                });
    
    })
    }
}
exports.getCurrentAssessment = async (req,res) => {
    try {
        if (req.user) {
            const currentAssessment = await Assessment.findOne({where:{
                isComplete : false,
                userId: req.user.id
            }});
            if (currentAssessment) {
                res.status(200).send(currentAssessment);
            } else {
                res.status(400).send({message: "Error: No current assessment or all assessments completed, create a new assessment."})
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}
exports.completeAssessment = async (req,res) => {
    const assessment = await Assessment.findByPk(req.params.id);

    if (assessment) {
        Assessment.update({isComplete : true}, {where: {id : req.params.id}})
            .then(async (data)=>{
                if(data) {
                    const updatedAssessment = await Assessment.findByPk(req.params.id)
                    res.status(200).send({message: "Completed Assessment!", data: updatedAssessment})
                }
            })
            .catch(err=>{
                res.status(400).send({message: err.message})
            })
    } else {
        res.status(400).send({message: "Error completing assessment"})
    }
}
