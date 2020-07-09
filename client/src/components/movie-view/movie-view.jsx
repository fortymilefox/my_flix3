import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';

import {Link} from "react-router-dom";


export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, back } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <br></br><br></br>
        <div className="movie-title">
          {/* <span className="label">Title: </span> */}
          <span>{movie.Title}</span>
        </div>
        <br></br><br></br>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre: </Button>
          </Link>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        
        <div className="movie-director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director: </Button>
          </Link>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="back-button">
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    );
  }
}

