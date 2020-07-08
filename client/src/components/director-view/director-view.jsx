import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {Link} from 'react-router-dom';

export class DirectorView extends React.Component{
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {movie,director} = this.props;

    if (!director) return null;

    return(
      <div className="director-view">
        <Container>
          <Card style={{width: '16rem'}}>
            <Card.Body>
              <Card.Title>{director.Name}</Card.Title>
              <Card.Text>Bio: {director.Bio}</Card.Text>
              <Card.Text>Birth Year: {director.Birth}</Card.Text>
              <Card.Text>Death Year: {director.Death}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}