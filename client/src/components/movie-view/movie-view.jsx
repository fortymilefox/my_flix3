import React from 'react';
import './movie-view.scss';


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
        <div className="movie-title">
          {/* <span className="label">Title: </span> */}
          <span>{movie.Title}</span>
        </div>
        <br></br>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="back-button">
          <button onClick={() => back(movie)}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

