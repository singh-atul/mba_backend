const userController = require('../controllers/user.controller');
const { verifyUserReqBody, authJwt } = require("../middlewares");


module.exports = function (app) {

    app.put("/crm/api/v1/users/", [authJwt.verifyToken], userController.update);
    app.put("/mba/api/v1/users/:userId", userController.updateUser);
    app.get("/mba/api/v1/users/", [authJwt.verifyToken, authJwt.isAdmin],userController.getAllUsers);

}


