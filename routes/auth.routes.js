const authController = require('../controllers/auth.controller');
const { verifyUserReqBody } = require("../middlewares");

module.exports = function (app) {

    app.post("/mba/api/v1/auth/signup", [verifyUserReqBody.validateUserRequestBody], authController.signup);

    app.post("/mba/api/v1/auth/signin", authController.signin);


}