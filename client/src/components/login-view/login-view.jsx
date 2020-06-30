import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /*send request to the server for authntication*/
    /*then call props.onLoggedIn(username)*/
    props.onLoggedIn(username);
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