//Configuraciones para el servidor
var serverConf = require('./config/config');

var express = require('express');
const expressJwt = require('express-jwt');
//const { expressJwt } = require('express-jwt');
const cookieParser = require('cookie-parser');
//Se crea el servidor
var app = express();
var server = require('http').Server(app);

var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');


const User = require('./models/user.schema');
const { Role } = require('./models/role.schema');


//Se levanta la coneccion a la bdd
mongoose.connect(`mongodb://${serverConf.uri}:27017/crud-express`/*, { autoIndex: false }*/).then(
    () => {
        User.find( { }, (err,docs)=>{
            if(err){
                console.log('Error in mongo connection');
                return;
            }
            console.log('Database connection is successful');
        });


        Role.find({ name : "default"} , (err,docs)=>{
            if(docs.length == 0){
                new Role({
                    _id: new mongoose.Types.ObjectId("63138bf71633d6e9ea039a54"),
                    name: "default",
                    description : "default user"
                }).save((err , doc)=>{
                    if(!err){
                        console.log('Roles initialized');
                    }
                });
            }
        });
    },
    err => { 
        logger.error('Error when connecting to the database' + err);
    }
);

//Le indicamos que las respuestas se deben de mandar en formato JSON
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}));
//Se habilitan las CORS para que no existan errores de cominicacion
app.use(cors());

//Rutas

const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const moviesRouter = require('./routes/movies');

//Se implementa el jwt en todas las rutas menos en las
//Rutas desprotegidas por el jwt
 app.use(expressJwt({secret:serverConf.key})
  .unless({path: ["/login","/users/register"]}));

app.use(cookieParser());
//app.use('/',router);
app.use('/', loginRouter);
app.use('/users',usersRouter);
app.use('/roles',rolesRouter);
app.use('/movies',moviesRouter);

//Metodo para lanzar la app por el puerto
server.listen(serverConf.port, () => {
    console.log(`Server running on port ${serverConf.port} ...`);
});

module.exports = server;