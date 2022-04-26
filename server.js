'use strict'

const express = require('express');
const movieData = require('./Movie_data/data.json');

const app = express();
const port = 3000;

app.get('/', handleData);

function handleData(req, res) {
  let result = [];
  let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview)
  result.push(newMovie);
  res.json(result);
}

app.get('/favorite', handleFavorite);

function handleFavorite(req, res) {
  res.send('Welcome to Favorite Page');
}

app.get('/error', (req, res) => res.send(error()));

app.use(function (err, req, res, text) {
  console.log(err.stack);
  res.type('taxt/plain');
  res.status(500);
  res.send('Sorry, something went wrong');
})

app.use(function (req, res, text) {
  res.status(404);
  res.type('text/plain');
  res.send('Not found');
});


app.listen(port, handleListen)

function handleListen() {
  console.log(`I'm alive on port ${port}`)
}

function Movie(title, poster_path, overview) {
  this.title = title
  this.poster_path = poster_path
  this.overview = overview
}

