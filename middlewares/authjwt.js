const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const Theatre = require("../models/theatre.model");


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    console.log("Veryfing token")
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        console.log("Veryfed token")
        next();
    });
};


isAdmin = async (req, res, next) => {
    console.log("@@@",req.userId);
    const user = await User.findOne({
        userId: req.userId
    })
    if (user && user.userType == constants.userTypes.admin) {

        next();
    } else {
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    }
};

isAdminOrClient = async (req, res, next) => {

    console.log("Checking admin or client")
    const user = await User.findOne({
        userId: req.userId
    })
    if (user && ( (user.userType == constants.userTypes.admin) || user.userType == constants.userTypes.client) ) {
        
        if(user.userType == constants.userTypes.client){
            console.log("User is client")
            //check if the client is the owner of the theatre or not
            const savedTheatre = await Theatre.findOne({ _id: req.params.id });
            
            // if(savedTheatre.ownerId != user._id){  this is not the correct way to compare and will fail
            if(String(savedTheatre.ownerId) != String(user._id)){
                return res.status(403).send({
                    message: "Client requesting to update the theatre is not the owner!"
                });
            }else{
                next();
            }
        }
        else{
            next();
        }
    } else {
        return res.status(403).send({
            message: "Require Admin Role or Client role!"
        });
        
    }

    
};






const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isAdminOrClient : isAdminOrClient

};
module.exports = authJwt;