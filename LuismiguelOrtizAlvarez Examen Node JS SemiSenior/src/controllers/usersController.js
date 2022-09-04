const User = require('./../models/user.schema');
const mongoose = require('mongoose');


function list(req, res, next) {
  User.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'idRole',
        foreignField: '_id',
        as: 'role'
      }
    },
  ]).then(users => {
    res.json({
      message: "User list successfully obtained",
      error: false,
      objs: users
    });
  }).catch((error) => {
    res.json({
      message: "Error",
      error: true,
      obj: err
    });
  });
}
/* 
  Example id
  63139611287d4a4ff0367e3d
*/
function index(req, res, next) {
  if (!req.params.id) {
    res.json({
      message: "Invalid request",
      error: true,
      objs: {}
    });
    return;
  }
  let id = req.params.id;

  User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(`${id}`)
      }
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'idRole',
        foreignField: '_id',
        as: 'role'
      }
    },
  ]).then(users => {
    if (users.length == 0) {
      res.json({
        message: 'User with id ' + id + " dont exist...",
        error: false,
        obj: {}
      });
      return;
    }
    res.json({
      message: 'User with id ' + id + " dont exist...",
      error: false,
      obj: users[0]
    });
  });
}
/* 
* Example Body : {
    "name": "luismi",
    "idRole" :"63138bf71633d6e9ea039a54", //this id is already created
    "email" : "luismi.luu@gmail.com",
    "password" : "qwertyuiop"
  }
*/
function create(req, res, next) {
  if (
    req.body.name == null ||
    req.body.name == undefined ||
    req.body.idRole == null ||
    req.body.idRole == undefined ||
    req.body.email == null ||
    req.body.email == undefined ||
    req.body.password == null ||
    req.body.password == undefined
  ) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }
  let user = req.body;

  /* Check if user email is already taken*/
  User.find({ email: user.email }, (err, docs) => {
    if (err) {
      res.json({
        message: "Error when search already email",
        error: true,
        obj: err
      });
      return;
    }
    if (docs.length != 0) {
      res.json({
        message: "Email already taken",
        error: true,
        obj: err
      });
      return;
    }

    let newUser = new User(user);

    newUser.save()
      .then((obj) => {
        User.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(`${obj._id}`)
            }
          },
          {
            $lookup: {
              from: 'roles',
              localField: 'idRole',
              foreignField: '_id',
              as: 'role'
            }
          },
        ]).then(users => {
          res.json({
            message: 'User with id ' + obj._id + " Created...",
            error: false,
            obj: users[0]
          });
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: "error creating user",
          error: true,
          obj: err
        });
      });
  });
}
/* 
  Example body
  {
    "name": "luismi",
    "idRole" :"63138bf71633d6e9ea039a54",
    "email" : "luismi.luu@gmail.cosm"
  }
*/
function update(req, res, next) {
  if (
    req.body.name == null ||
    req.body.name == undefined ||
    req.body.idRole == null ||
    req.body.idRole == undefined ||
    req.body.email == null ||
    req.body.email == undefined
  ) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let newUserData = req.body;
  let id = req.params.id;
  User.findByIdAndUpdate(id, newUserData, (err, user) => {
    User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(`${user._id}`)
        }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'idRole',
          foreignField: '_id',
          as: 'role'
        }
      },
    ]).then(users => {
      res.json({
        message: 'User with id ' + user._id + " Updated...",
        error: false,
        obj: users[0]
      });
    })
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

  User.findByIdAndDelete(id, (err, user) => {
    if(user){
      res.json({
        message: 'User with id ' + id + " Deleted...",
        error: false,
        obj: {
          user : user
        }
      });
      return;
    }

    res.json({
      message: "User with id " + id + " does exist...",
      error: true,
      obj: {}
    });
  });
}

module.exports = {
  index, list, create, update, destroy
}
