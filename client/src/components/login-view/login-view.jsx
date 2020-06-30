import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /*send request to the server for authntication*/
    axios.post('https://myflix-1.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user found')
    });

  };

  return (
    <div className = "signin-container">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control placeholder = "Username" type = "text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control placeholder = "Password" type = "password" value ={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="secondary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
}