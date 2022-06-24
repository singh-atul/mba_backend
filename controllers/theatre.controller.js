const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");
const sendEmail = require("../utils/NotificationClient").sendEmail;
const User = require("../models/user.model");


/**
 * Create  a new Theatre
 */
exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode,
        ownerId: req.body.userId

    }

    const theatre = await Theatre.create(theatreObject);

    /**
     * Sending email to the owner of the theatre
     */
    console.log('sds')
    const theatreOwner = await User.findOne({_id : theatre.ownerId});
    // sendEmail(theatre._id, "New theatre created with the theatre id : " + theatre._id, JSON.stringify(theatre), theatreOwner.email, "mba-no-reply@mba.com");
        
    res.status(201).send(theatre);
}

/**
 * Get the list of all the theaters
 */
exports.getAllTheatres = async (req, res) => {
    const queryObj = {};

    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if (req.query.city != undefined) {
        queryObj.city = req.query.city;
    }
    if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode;
    }
    var theatres = await Theatre.find(queryObj);
    
    if (req.query.movieId != undefined) {
        //filter the list of the theatres
        theatres = theatres.filter(t => t.movies.includes(req.query.movieId));
    }

    res.status(200).send(theatres);
}

/**
 * Get the theatre based on theatre id
 */
exports.getTheatre = async (req, res) => {
    console.log("Reached controller to get single theater")
    const theatre = await Theatre.findOne({
        _id: req.params.id
    });
    res.status(200).send(theatre);

}

/**
 * Update a theatre
 */
exports.updateTheatre = async (req, res) => {
    console.log("Updating theater")
    const savedTheatre = await Theatre.findOne({ _id: req.params.id });

    if (!savedTheatre) {
        console.log("here 5");
        return res.status(400).send({
            message: "Theatre being updated doesn't exist"
        });
    }

    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;

    var updatedTheatre = await savedTheatre.save();
    /**
     * Sending email to the owner of the theatre
     */
     const theatreOwner = await User.findOne({_id : updatedTheatre.ownerId});
    //  sendEmail(updatedTheatre._id, "Theatre updated with the theatre id : " + updatedTheatre._id, JSON.stringify(updatedTheatre), theatreOwner.email, "mba-no-reply@mba.com");
     
    console.log("sending the response");
    res.status(200).send(updatedTheatre);
}



/**
 * Delete a theatres
 */
exports.deleteTheatre = async (req, res) => {
   
    const savedTheatre = await Theatre.findOne({_id: req.params.id});
    await Theatre.deleteOne({
        _id: req.params.id
    });

    /**
     * Sending email to the owner of the theatre
     */
     const theatreOwner = await User.findOne({_id : savedTheatre.ownerId});
    //  sendEmail(savedTheatre._id, "Theatre deleted with the theatre id : " + savedTheatre._id, "Theatre deleted", theatreOwner.email, "mba-no-reply@mba.com");
     


    res.status(200).send({
        message: "Successfully deleted theatre with id [ " + req.params.id + " ]"
    });


}

/**
 * Add a movie inside a theatre
 */
exports.addMoviesToATheater = async (req, res) => {

    //validation of tha savedTheatre will be done in the later section as middleware
    const savedTheatre = await Theatre.findOne({ _id: req.params.id });

    //Validation of these movie ids will be done in the later section
    movieIds = req.body.movieIds;

    //Add movieIds to the theatres
    if (req.body.insert) {
        movieIds.forEach(movieId => {
            savedTheatre.movies.push(movieId);
        });
    } else {
        //remove these movies from the theatres
        savedMovieIds = savedTheatre.movies;

        movieIds.forEach(movieId => {
            savedMovieIds = savedMovieIds.filter(smi => smi != movieId);
        });
        savedTheatre.movies = savedMovieIds;
    }


    await savedTheatre.save(); //save in the database

    /**
     * Sending email to the owner of the theatre
     */
    //  const theatreOwner = await User.findOne({_id : savedTheatre.ownerId});
    //  sendEmail(savedTheatre._id, "Movies updated in the theatre with id : " + savedTheatre._id, SON.stringify(savedTheatre), theatreOwner.email, "mba-no-reply@mba.com");
     
     res.status(200).send(savedTheatre);

}

/**
 * Check if the given movie is running in the given theatre
 */
exports.checkMovieInsideATheatre = async (req, res) => {


    const savedTheatre = await Theatre.findOne({ _id: req.params.theatreId });

    const savedMovie = await Movie.findOne({ _id: req.params.movieId });


    const responseBody = {
        message: savedTheatre.movies.includes(savedMovie._id) ? "Movie is present" : "Movie is not present"
    }
    res.status(200).send(responseBody);
}


