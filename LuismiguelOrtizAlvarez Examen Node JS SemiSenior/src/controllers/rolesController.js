const { Role } = require('../models/role.schema');

function list(req, res, next) {
  Role.find({}).then(roles => {
    res.json({
      message: "List of roles obtained",
      error: false,
      obj: roles
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
  Role.findById(id, (err, role) => {
    if (err) {
      res.json({
        message: "Error looking for the role or wrong id syntax",
        error: false,
        obj: {}
      });
      return;
    }
    if (!role) {
      res.json({
        message: "Role not found",
        error: false,
        obj: {}
      });
      return;
    }
    res.json({
      message: "Role sended",
      error: false,
      obj: role
    });
  });
}
/* 
  Body example
  {
    "name" : "role test ",
    "description" : "description"
  } 
*/
function create(req, res, next) {
  if (
    req.body.name == null ||
    req.body.name == undefined ||
    req.body.description == null ||
    req.body.description == undefined
  ) {
    res.json({
      message: "Invalid request",
      error: true,
      obj: {}
    });
    return;
  }

  let role = req.body;

  /* Check if role name is already taken*/
  Role.find({ name: role.name }, (err, docs) => {
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
        message: "Role name already taken",
        error: true,
        obj: {}
      });
      return;
    }
    let role = req.body;

    let newrole = new Role(role);

    newrole.save()
      .then((obj) => {
        res.status(200).json({
          message: 'Role with id ' + obj._id + " Created...",
          error: false,
          obj: obj
        });
      })
      .catch((err) => {
        res.status(200).json({
          message: "Error creating role",
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
    req.body.description == null ||
    req.body.description == undefined
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
  Role.findByIdAndUpdate(id, newroleData, (err, role) => {
    if(role){
      res.json({
        message: 'Role with id ' + role._id + " Updated...",
        error: false,
        obj: role
      });
      return;
    }

    res.json({
      message: "Role with id " + id + " does exist...",
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
  Role.findByIdAndDelete(id, (err, role) => {
    if(role){
      res.json({
        message: 'Role with id ' + id + " Deleted...",
        error: false,
        obj: {
          role : role
        }
      });
      return;
    }

    res.json({
      message: "Role with id " + id + " does exist...",
      error: true,
      obj: {}
    });
  });
}

module.exports = {
  index, list, create, update, destroy
}
