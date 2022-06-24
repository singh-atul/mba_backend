const Booking = require("../models/booking.model");
const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const sendEmail = require("../utils/NotificationClient").sendEmail;


/**
 * Get the list of all the payments.
 * ADMIN user should get the list of all the payments
 * Customer user should get the list of all his/her payments
 */
exports.getAllPayments = async (req, res) => {

    const queryObj = {}
    const userIdReq = req.userId;
    const user = await User.findOne({"userId" : userIdReq});
    if (user.userType == constants.userTypes.admin) {
    } else {
        const bookings = await Booking.find({
            _id: req.userId
        });

        const bookingIds = bookings.map(b => b._id);
        queryObj._id = { $in: bookingIds }
    };



    const payments = await Payment.find(queryObj);

    res.status(200).send(payments);

}

/**
 * Get the payment details based on the payment id
 */

exports.getPaymentOnId = async (req, res) => {
    try {
        const payments = await Payment.findOne({ _id: req.params.id });
        res.status(200).send(payments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while searching for the payments"
        })
    }

}


/**
 * Create a payment
 */
exports.createPayment = async (req, res) => {

    const booking = await Booking.findOne({
        _id: req.body.bookingId
    });

    var bookingTime = booking.createdAt;
    var currentTime = Date.now();

    var minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);

    if (minutes > 5) {
        booking.status = constants.bookingStatus.expired;
        await booking.save();
        return res.status(200).send({
            message: "Can't do the payment as the booking is delayed and expired"
        })
    }

    
    var paymentObject = {
        bookingId: req.body.bookingId,
        amount: req.body.amount,
        status: constants.paymentStatus.success,
    }
    try {
        const payment = await Payment.create(paymentObject);
        /**
         * Update the booking status
         */
        booking.status = constants.bookingStatus.completed;
        await booking.save();

        const user = await User.findOne({"userId" : req.userId});
        sendEmail(payment._id, "Payment successfull for the booking id : " + req.body.bookingId, JSON.stringify(booking), user.email, "mba-no-reply@mba.com")
        /**
         * Send the confirmation email
         */

        return res.status(201).send(payment);

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal error while creating the booking"
        })
    }

}
