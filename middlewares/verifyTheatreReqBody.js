const constants = require("../utils/constants");
const Theatre = require("../models/theatre.model");

validateTheatreRequestBody = async (req, res, next) => {
    console.log(req.body);
    //Validate the theatre  name
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Theatre name is not provided !"
        });

    }

    //Validate the theatre description
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Theatre description is not provided !"
        });  
    }

    //Validate the theatre city 
    if(!req.body.city){
        return res.status(400).send({
            message: "Failed! Theatre city is not provided !"
        });  
    }

    //Validate the theatre pincode
    if(!req.body.pinCode){
        return res.status(400).send({
            message: "Failed! Theatre location pincode is not provided !"
        });  
    }

    /**
     * Validate same theatre at the same location is not created
     * This validation should only be done creation and not editing
     */
    const theatre = await Theatre.findOne({name: req.body.name , pinCode : req.body.pinCode});
    if(theatre!=null && req.method == "POST" ){
        return res.status(400).send({
            message: "Failed! Same theatre in same location already exists !"
        }); 
    }

    console.log("Request body is verified");
    next();

}

const verifyTheatreReqBody = {
    validateTheatreRequestBody : validateTheatreRequestBody
};

module.exports = verifyTheatreReqBody;