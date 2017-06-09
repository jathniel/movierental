import React from 'react';


const MoviePage = () => {
  return(
    <div className="movie">
      <div className="search-bar">
        <div className="container">
          <div className="search-container">
            <form>
              <div className="form-group">
                <div className="wrapper">
                  <input type="text" name="search" placeholder="Search Movie title" className="form-control input input-lg margin-bottom10"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MoviePage;
