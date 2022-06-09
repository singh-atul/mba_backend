const serverConfig = require('./configs/server.config');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const Movie = require('./models/movie.model');
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
    await Movie.collection.drop();
    try {
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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

    } catch (e) {
        console.error(e.message);
    }

}



/**
 * Importing the routes
 */
require('./routes/movie.routes')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port num : ${serverConfig.PORT}`);
})
