const serverConfig = require('./configs/server.config');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const Movie = require('./models/movie.model');
const Theatre = require('./models/theatre.model');
const User = require('./models/user.model');
const bcrypt = require("bcryptjs");
const cors = require('cors');
//Initializing express
const app = express();

//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**
 * DB Connection initialization
 */
mongoose.connect(dbConfig.DB_URL, () => {
    console.log("connected to Mongo DB ")
    init();
}, err => {
    console.log("Error :", err.mssage)
}
);


/**
 * This function will initialize the initial state of the movie booking application
 */
async function init() {

    /**
     * Creating one ADMIN user at the server boot time
     */
     await User.collection.drop();
     try {

        user = await User.create({
            name: "Vishwa",
            userId: "admin", // It should be atleat 16, else will throw error
            email: "Kankvish@gmail.com",  // If we don't pass this, it will throw the error
            userType: "ADMIN",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        console.log("ADMIN user created");

    } catch (e) {
        console.log(e.message);
    }

    let client1, client2, client3 ;
    try {

        client1 = await User.create({
            name: "Client1",
            userId: "client01", // It should be atleat 16, else will throw error
            email: "Kankvish1@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        client2 = await User.create({
            name: "Client2",
            userId: "client02", // It should be atleat 16, else will throw error
            email: "Kankvish2@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        client3 = await User.create({
            name: "Client3",
            userId: "client03", // It should be atleat 16, else will throw error
            email: "Kankvish3@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CLIENT",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        customer = await User.create({
            name: "atul01",
            userId: "atul01", // It should be atleat 16, else will throw error
            email: "Kankvish3@gmail.com",  // If we don't pass this, it will throw the error
            userType: "CUSTOMER",
            password :bcrypt.hashSync("Welcome1", 8) //this field should be hidden from the end user

        });
        console.log("Clients created");

    } catch (e) {
        console.log(e.message);
    }

    /**
     * Create few theatre owners at the server boot time
     */

    // Creating few initial set of movies
    await Movie.collection.drop();
    try {
        movie1 = await Movie.create({
            name: "Bachhan Pandey",
            description: "Comedy Masala Movie",
            casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
            director: "Farhad Samji",
            trailerUrl: "https://www.youtube.com/watch?v=cpNaGiBhXiM",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BOWE5ZjljZDEtYTZmNy00MGVlLWJjNjEtMWUwMzUyMDc5NTA3XkEyXkFqcGdeQXVyODgzMDMwODI@._V1_.jpg",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie2 = await Movie.create({
            name: "Jalsa",
            description: "Intense Drama Movie",
            casts: ["Vidya Balan", "Shefali Shah"],
            director: "Suresh Triveni",
            trailerUrl: "https://www.youtube.com/watch?v=T8GaE3fi3OU",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMTRlNzY5MTEtOTZkZS00ZDEzLTgyN2YtZDJhNDRmMjdkOWI5XkEyXkFqcGdeQXVyNTM1MzM4Nzk@._V1_.jpg",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        movie3 = await Movie.create({
            name: "Jhund",
            description: "Comedy Drama Movie",
            casts: ["Amitabh Bachchan", "Abhinay Raj"],
            director: "Nagraj Manjule",
            trailerUrl: "https://www.youtube.com/watch?v=iqydRuNr2yY",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BOTllNjVkY2ItMjA3OC00ODE5LWE3MWMtMjdjZTQ1N2NlYjRmXkEyXkFqcGdeQXVyNDI3NjU1NzQ@._V1_.jpg",
            language: "Hindi",
            releaseDate: "04-03-2022",
            releaseSatus: "RELEASED"
        });
        movie4 = await Movie.create({
            name: "Radhe Shyam",
            description: "Comedy Drama Movie",
            casts: ["Prabhas", "Pooja Hegde"],
            director: "Radha Krishna Kumar",
            trailerUrl: "https://www.youtube.com/watch?v=ZAP6q_Zv-4g",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMzNhOTdlNmUtYzNiYi00MmUxLTg3ZjgtZjk4Y2Y5YTk3ODdiXkEyXkFqcGdeQXVyMTE2MjAzMTU3._V1_.jpg",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });
        movie5 = await Movie.create({
            name: "The Kashmir Files",
            description: "Intense Movie",
            casts: ["Mithun Chakraborty", "Anupam Kher"],
            director: "Vivek Agnihotri",
            trailerUrl: "https://www.youtube.com/watch?v=A179apttY58",
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/The_Kashmir_Files_poster.jpg",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });

        console.log("Movies inserted in the db");

        //Creating few intial sets of Theatres
        await Theatre.collection.drop();
        await Theatre.create({
            name: "FunCinemas",
            city: "Bangalore",
            description: "Top class theatre",
            pinCode: 560052,
            movies : [movie1._id, movie2._id, movie3._id],
            ownerId : client1._id

        });
        await Theatre.create({
            name: "PVR Cinemas - Kormangala",
            city: "Bangalore",
            description: "PVR franchise theatre",
            pinCode: 560095,
            movies : [movie1._id, movie2._id, movie4._id],
            ownerId : client1._id

        });
        await Theatre.create({
            name: "IMax",
            city: "Bangalore",
            description: "IMax franchise theatre",
            pinCode: 560095,
            movies : [movie1._id, movie4._id],
            ownerId : client2._id

        });
        await Theatre.create({
            name: "Vaibhav Theatre",
            city: "Bangalore",
            description: "Economical theatre",
            pinCode: 560094,
            movies : [movie5._id, movie4._id],
            ownerId : client2._id
 
        });

        await Theatre.create({
            name: "Inox",
            city: "Pune",
            description: "Top class theatre",
            pinCode: 411001,
            movies : [movie5._id, movie2._id],
            ownerId : client3._id

        });
        await Theatre.create({
            name: "Sonmarg Theatre",
            city: "Pune",
            description: "Economical theatre",
            pinCode: 411042,
            movies : [movie3._id, movie2._id],
            ownerId : client3._id

        });

        console.log("Theatres created");

    } catch (e) {
        console.error(e.message);
    }

}



/**
 * Importing the routes
 */
require('./routes/movie.routes')(app);
require('./routes/theatre.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/booking.routes')(app);
require('./routes/payment.routes')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port num : ${serverConfig.PORT}`);
})
