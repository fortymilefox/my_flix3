import './main-view.scss';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

//#0
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      // movies: [],
      // selectedMovie: null,
      user: null
      // register: false,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //#1
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedIn(authData) {
    // console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/my_flix3', '_self');
  }

  render() {
    //#2
    let { movies } = this.props;
    let { user } = this.state;


    return (
      <Router basename="/my_flix3">
        <Navbar bg="light" expand="lg">
          <NavbarBrand as={Link} to="/">myFlix</NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/user">Your Profile</Nav.Link>
              <Button size="sm" onClick={() => this.onLoggedOut()}>Sign Out</Button>
            </Nav>
          </NavbarCollapse>
        </Navbar>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />
          <Route exact path="/user" render={() => <ProfileView movies={movies} />} />
        </div>
      </Router>
    );
  }
}

//#3
const mapStateToProps = state => {
  return { movies: state.movies }
}

const mapDispatchToProps = {
  setMovies,
  setUser
}

//#4
export default connect(mapStateToProps, mapDispatchToProps)(MainView);