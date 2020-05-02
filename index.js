//Require func.
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
  Models = require('./models');

const app = express();

const Movies = Models.Movie;
const Users = Models.User;
const passport = require('passport');
require('./passport');

mongoose.connect('mongodb://localhost:27017/myFlixDB',{
  useNewUrlParser: true, useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Authentication
let auth = require('./auth')(app);

//Morgan
app.use(morgan('common'));

//GET functions
app.get('/', function(req,res){
  res.send('Welcome to my Top Ten Films')
});

//get ALL MOVIES
app.get('/movies', passport.authenticate('jwt',{session: false}), function(req, res){
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//get ALL USERS
app.get('/users', passport.authenticate('jwt',{session: false}), function(req,res){
  Users.find()
  .then(function(users){
    res.status(201).json(users)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get USER BY USER NAME
app.get('/users/:Username', passport.authenticate('jwt',{session: false}), function(req,res){
  Users.findOne({Username: req.params.Username})
  .then(function(user){
    res.json(user)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//get SINGLE MOVIE BY TITLE
app.get('/movies/:Title', passport.authenticate('jwt',{session: false}), function(req,res){
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    res.json(movie)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//get GENRE BY NAME
app.get('/movies/genres/:Name', passport.authenticate('jwt',{session: false}),function(req,res){
  Movies.findOne({'Genre.Name': req.params.Name})
  .then(function(movie){
    res.json(movie.Genre)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//get DIRECTOR BY NAME
app.get('/movies/directors/:Name', passport.authenticate('jwt',{session: false}),function(req, res){
  Movies.findOne({'Director.Name': req.params.Name})
  .then(function(movie){
    res.json(movie.Director)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//add NEW USER
app.post("/users", passport.authenticate('jwt',{session: false}),function(req, res) {
  Users.findOne({Username: req.body.Username})
  .then(function(user){
    if (user) {
      return res.status(400).send(req.body.Username + "already exists.");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user)})
      .catch(function(error){
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error){
    console.error(error);
    res.status(500).send("Error: " + error);
  })
});

//update USER INFO, BY USERNAME
app.put("/users/:Username", passport.authenticate('jwt',{session: false}),(req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    {new : true},
    function(err,updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

//add MOVIE TO FAVORITES
app.post("/users/:Username/Movies/:MovieID", passport.authenticate('jwt',{session: false}),(req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username},{
    $push: {FavoriteMovies: req.params.MovieID}
  },
{new: true},
function(err, updatedUser){
  if (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  } else {
    res.json(updatedUser)
  }
})
});

//delete MOVIE FROM FAVORITES
app.delete("/users/:Username/Movies/:MovieID", passport.authenticate('jwt',{session: false}),(req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username},
    {$pull: {FavoriteMovies: req.params.MovieID}},
    {new:  true},
  function(err, updatedUser){
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//delete USER FROM REGISTRY
app.delete("/users/:Username", passport.authenticate('jwt',{session: false}),(req, res) => {
  Users.findOneAndRemove({Username: req.params.Username})
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.Username + " was not found.");
    } else {
      res.status(200).send(req.params.Username + "was deleted.");
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//ERROR HANDLING

  app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });





//listen
app.listen(8080)
