import React from 'react';
import axios from 'axios';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super ();

    this.state= {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix-1.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function(error){
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        { selectedMovie ? <MovieView movie= {selectedMovie} back={movie=>this.onMovieClick(!movie)} />
        : movies.map (movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
      </div>
    );
  }
}