const movieController = require("../controllers/movie.controller");
const { verifyMovieReqBody } = require("../middlewares");



/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/v1/movies", movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id", movieController.getMovie);
    app.post("/mba/api/v1/movies/", [verifyMovieReqBody.validateMovieRequestBody], movieController.createMovie);
    app.put("/mba/api/v1/movies/:id", [verifyMovieReqBody.validateMovieRequestBody], movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);
}