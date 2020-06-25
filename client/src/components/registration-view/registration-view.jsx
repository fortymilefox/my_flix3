import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);

    props.onRegistered(username);
  };

  returns(
    <Container className="regContainer">
      <Form className="regForm">
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=> createEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => createUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => createPassword(e.target.value)} />
        </Form.Group>
        
        <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
      </Form>
    </Container>
  )
}