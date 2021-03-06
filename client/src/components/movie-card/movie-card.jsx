import './movie-card.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import {Link} from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const {movie} = this.props;

    return (
      <div className="movie-cards">
        <Card style={{width: '16rem'}}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="card-body">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className="movieText">{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="secondary">More</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired
//   }) .isRequired,
//   onClick: PropTypes.func.isRequired
// };