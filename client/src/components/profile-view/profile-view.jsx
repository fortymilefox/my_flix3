import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor(props) {
    super (props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://myflix-1.herokuapp.com/users/${username}`,{
      headers: {Authorization: `Bearer ${token}`},
    })

    .then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
        FavoriteMovies: res.data.FavoriteMovies,
      });
    })
    .catch(function(err){
      console.log(err);
    });
  }

  render() {
    const {movies} = this.props;

    return (
      <div>
        <Container>
          <h1>Your Profile</h1>
          <br/>
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.Username} </Card.Text>
              <Card.Text>Password: </Card.Text>
              <Card.Text>Email: {this.state.Email} </Card.Text>
              <Card.Text>Birthday: {this.state.Birthday} </Card.Text>

            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}