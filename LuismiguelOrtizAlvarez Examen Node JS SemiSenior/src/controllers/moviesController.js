const { Movie } = require('../models/movie.schema');

function list(req, res, next) {
  Movie.find({}).then(movies => {
    res.json({
      message: "List of movies obtained",
      error: false,
      obj: movies
    })
  }).catch((err) => {
    res.json({
      message: "Error",
      error: true,
      obj: err
    });
  });
}

function index(req, res, next) {
  if (!req.params.id) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let id = req.params.id;
  Movie.findById(id, (err, role) => {
    if (err) {
      res.json({
        message: "Error looking for the movie or wrong id syntax",
        error: false,
        obj: {}
      });
      return;
    }
    if (!role) {
      res.json({
        message: "Movie not found",
        error: false,
        obj: {}
      });
      return;
    }
    res.json({
      message: "Movie sended",
      error: false,
      obj: role
    });
  });
}
/* 
  Body example
  {
    "name" : "movie test "
  } 
*/
function create(req, res, next) {
  if (
    req.body.name == null ||
    req.body.name == undefined 
  ) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let movie = req.body;

  /* Check if movie name is already taken*/
  Movie.find({ name: movie.name }, (err, docs) => {
    if (err) {
      res.json({
        message: "Error when search already name",
        error: true,
        obj: err
      });
      return;
    }
    if (docs.length != 0) {
      res.json({
        message: "Movie name already taken",
        error: true,
        obj: {}
      });
      return;
    }

    let newMovie = new Movie(movie);

    newMovie.save()
      .then((obj) => {
        res.status(200).json({
          message: 'Movie with id ' + obj._id + " Created...",
          error: false,
          obj: obj
        });
      })
      .catch((err) => {
        res.status(200).json({
          message: "Error creating movie",
          error: true,
          obj: err
        });
      });
  });
}

function update(req, res, next) {
  if (
    req.body.name == null ||
    req.body.name == undefined || 
    !req.params.id
  ) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let newroleData = req.body;
  let id = req.params.id;
  Movie.findByIdAndUpdate(id, newroleData, (err, movie) => {
    if(movie){
      res.json({
        message: 'Movie with id ' + movie._id + " Updated...",
        error: false,
        obj: movie
      });
      return;
    }

    res.json({
      message: "Movie with id " + id + " does exist...",
      error: true,
      obj: {}
    });
  });
}

function destroy(req, res, next) {
  if (!req.params.id) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let id = req.params.id;
  Movie.findByIdAndDelete(id, (err, movie) => {
    if(movie){
      res.json({
        message: 'Movie with id ' + id + " Deleted...",
        error: false,
        obj: movie
      });
      return;
    }

    res.json({
      message: "Movie with id " + id + " does exist...",
      error: true,
      obj: {}
    });
  });
}

module.exports = {
  index, list, create, update, destroy
}
