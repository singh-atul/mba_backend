const bookingController = require("../controllers/booking.controller");
const { authJwt, verifyBookingReqBody } = require("../middlewares");



/**
 * Routes for the booking resource
 */

module.exports = function (app) {
    app.get("/mba/api/v1/bookings", [authJwt.verifyToken], bookingController.getAllBookings); 
    app.get("/mba/api/v1/bookings/:id", [authJwt.verifyToken], bookingController.getBookingOnId);  
    app.post("/mba/api/v1/bookings", [authJwt.verifyToken,verifyBookingReqBody.validateBookingRequestBody], bookingController.createBooking);
    app.put("/mba/api/v1/bookings/:id", [authJwt.verifyToken], bookingController.updateBooking);
}