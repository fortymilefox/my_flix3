//Require func.
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB',{
  useNewUrlParser: true, useUnifiedTopology: true
});
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

const app = express();


let Movies = [
  {
  title : 'He Got Game',
  year: '1998',
  director: 'Spike Lee',
  stars: 'Denzel Washington, Ray Allen'
},
{
  title: 'The Science of Sleep',
  year: '2006',
  director: 'Michel Gondry',
  stars: 'Gael Garcia Bernal, Charlotte Gainsbourg'
},
{
  title: 'Spanglish',
  year: '2004',
  director: 'James L. Brooks',
  stars: 'Adam Sandler, Paz Vega'
},
{
  title: 'Friday',
  year: '1995',
  director: 'F. Gary Gray',
  stars: 'Ice Cube, Chris Tucker'
},
{
  title: 'The Dark Knight',
  year: '2008',
  director: 'Christoper Nolan',
  stars: 'Christian Bale, Heath Ledger'
},
{
  title: 'Seven Samurai',
  year: '1954',
  director: 'Akira Kurosawa',
  stars: 'Toshiro Mifune, Takashi Shimura'
},
{
  title: 'Akira',
  year: '1988',
  director: 'Katsuhiro Otomo',
  stars: 'Mitsuo Iwata, Nozomu Sasaki'
},
{
  title: 'Stand By Me',
  year: '1986',
  director: 'Rob Reiner',
  stars: 'Wil Wheaton, River Phoenix'
},
{
  title: 'Hotel Chevalier',
  year: '2007',
  director: 'Wes Anderson',
  stars: 'Jason Schwartzman, Natalie Portman'
}
]
//serve static files
app.use(express.static('public'));
//Morgan
app.use(morgan('common'));

//GET functions
app.get('/', function(req,res){
  res.send('Welcome to my Top Ten Films')
});

//LIST OF ALL MOVIES
app.get('/movies', function(req, res){
  res.send("Successful GET request returning data about all movies.")
});

//SINGLE MOVIE
app.get("/movies/:titles", (req, res) => {
  res.send("Successful GET request returning data about a single movie")
});

//GENRE BY NAME
app.get("/genre/:name", (req, res) => {
  res.send("Successful GET request returning data about a movie genre.")
});

//DIRECTOR BY NAME
app.get("/director/:name", (req, res) => {
  res.send("Success GET request returning data about a director.")
});

//ADD NEW USER
app.post("/users", (req, res) => {
  let newUser = req.body;

  if(!newUser.username){
    const message = "Missing User Name in request body.";
    res.status(400).send(message)
  } else {
    res.send("User successfully added.")
  }
});

//UPDATE USER INFO
app.put("/users/:username/:password/:email/:dateofbirth", (req, res) => {
  res.send("User information successfully updated.")
});

//ADD MOVIE TO FAVORITES
app.post("/favorites/:username/:title", (req, res) => {
  res.send("User successfully added movie to favorites.")
});

//REMOVES MOVIE FROM FAVORITES
app.delete("/favorites/:username/:title", (req, res) =>{
  res.send("Movie succesfully removed from user favorites.")
});

//DELETE USER FROM REGISTRY
app.delete("/users/:username", (req, res) => {
  res.send("User succesfully removed from registry.")
});


//ERROR HANDLING
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });





//listen
app.listen(8080)
