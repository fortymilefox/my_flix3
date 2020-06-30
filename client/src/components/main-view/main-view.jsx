import React from 'react';
import axios from 'axios';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import './main-view.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {
  constructor() {
    super ();

    this.state= {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false,
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://myflix-1.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign a result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  register() {
    this.setState({register: true});
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    if(register)
    return(
      <RegistrationView onClick={() => this.existingMember()}
      onSignedIn={(user) => this.onSignedIn(user)} />
    );

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
       <Container>
         <Row>
         { selectedMovie ? <MovieView movie= {selectedMovie} back={movie=>this.onMovieClick(!movie)} />
        : movies.map (movie => (
          <Col key={movie._id} xs={12} sm={6} md={4}><MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/></Col>
        ))
      }
         </Row>
       </Container>
      </div>
    );
  }
}