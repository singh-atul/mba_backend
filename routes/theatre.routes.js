const theatreController = require("../controllers/theatre.controller");
const { authJwt, verifyTheatreReqBody } = require("../middlewares");



/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/v1/theatres",  theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken], theatreController.getTheatre);
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isAdmin, verifyTheatreReqBody.validateTheatreRequestBody], theatreController.createTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdminOrClient, verifyTheatreReqBody.validateTheatreRequestBody], theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdmin], theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isAdminOrClient], theatreController.addMoviesToATheater);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", [authJwt.verifyToken], theatreController.checkMovieInsideATheatre);
}