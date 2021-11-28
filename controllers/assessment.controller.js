const db = require('../models/index');
const Assessment = db.assessments;


exports.logAssesment = async (req,res) => {
    if (!req.body.id) {
        res.status(400).send("Error: Must have relevant id to traitify quiz");
        return;
    }

    const assessment = {
        uuid : req.body.id,
    }
    Assessment.create(assessment).then((data=>{
        res.status(200).json({
            "message" : "Logged asssement into db!",
            "data" : data
        }).catch(err=>{
            res.status(500).send({
                message: err.message
            })
        })
    }));

}
