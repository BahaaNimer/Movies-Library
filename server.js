'use strict'

const url = 'postgres://nimer:224212@localhost:5432/movie'
require('dotenv').config();
// Declare Variables:
const express = require('express');
// const movieData = require('./Movie_data/data.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const apiKey = process.env.API_KEY;

const { Client } = require('pg')
const client = new Client(url)

// Create app:
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = 3000;

// Raouts:
app.post("/addMovie", handleAdd);
app.get("/getMovies", handleGet);
app.use(handleError);
// app.get('/', handleData);
// app.get('/favorite', handleFavorite);
// app.get('/error', (req, res) => res.send(error()));
// app.get('/trending', hundleTrending);
// app.get('/search', hundleSearch);
// app.get('/id', hundleSearchId);
// app.get('/image', hundleImage);
// app.get('/topRated', hundleTopRated);


// handle the Error:
// app.use(function (err, req, res, text) {
//   console.log(err.stack);
//   res.type('taxt/plain');
//   res.status(500);
//   res.send('Sorry, something went wrong');
// })
// app.use(function (req, res, text) {
//   res.status(404);
//   res.type('text/plain');
//   res.send('Not found');
// });

// Function: 
function handleAdd(req, res) {
  const { name, time, summary, image } = req.body;

  let sql = 'INSERT INTO movie(name,time,summary,image ) VALUES($1, $2, $3, $4) RETURNING *;' // sql query
  let values = [name, time, summary, image];
  client.query(sql, values).then((result) => {
    console.log(result.rows);
    return res.status(201).json(result.rows[0]);
  }).catch()
}
function handleGet(req, res) {

  let sql = 'SELECT * from movie;'
  client.query(sql).then((result) => {
    console.log(result);
    res.json(result.rows);
  }).catch((err) => {
    handleError(err, req, res);
  });
}
function handleError(error, req, res) {
  res.status(500).send(error)
}
// function handleData(req, res) {
//   let result = [];
//   let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview)
//   result.push(newMovie);
//   res.json(result);
// }
// function handleFavorite(req, res) {
//   res.send('Welcome to Favorite Page');
// }
// function hundleTrending(req, res) {
//   const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
//   // axios.get().then().catch() 
//   axios.get(url)
//     .then(result => {
//       // console.log(result);
//       // console.log(result.data.results);
//       let trender = result.data.results.map(trend => {
//         return new Trend(trend.id, trend.title, trend.release_date, trend.poster_path, trend.overview);
//       })
//       res.json(trender);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.send("Inside catch");
//     })
// }

// function hundleSearch(req, res) {
//   let movieName = req.query.movieName;
//   let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&page=2`;
//   // axios.get().then().catch() 
//   axios.get(url)
//     .then(result => {
//       // console.log(result.data.results);
//       res.json(result.data.results)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.send("Searching for data")
//     })
// }
// function hundleTopRated(req, res) {
//   let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`;
//   // axios.get().then().catch() 
//   axios.get(url)
//     .then(result => {
//       // console.log(result.data.results);
//       res.json(result.data.results)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.send("Searching for data")
//     })
// }
// function hundleSearchId(req, res) {
//   let movieId = req.query.movieId;
//   let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&page=2`;
//   // axios.get().then().catch() 
//   axios.get(url)
//     .then(result => {
//       // console.log(result.data);
//       res.json(result.data)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.send("Searching for data")
//     })
// }
// function hundleImage(req, res) {
//   let movieId = req.query.movieId;
//   let url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`;
//   // axios.get().then().catch() 
//   axios.get(url)
//     .then(result => {
//       // console.log(result.data);
//       res.json(result.data)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.send("Searching for data")
//     })
// }


// CREATE LISTENER:
// app.listen(PORT, handleListen)
// function handleListen() {
//   console.log(`I'm alive on PORT ${PORT}`)
// }
client.connect().then(() => {

  app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
  });
})

// Constructor:
// function Movie(title, poster_path, overview) {
//   this.title = title
//   this.poster_path = poster_path
//   this.overview = overview
// }

// function Trend(id, title, release_date, poster_path, overview) {
//   this.id = id;
//   this.title = title;
//   this.release_date = release_date;
//   this.poster_path = poster_path;
//   this.overview = overview;
// }