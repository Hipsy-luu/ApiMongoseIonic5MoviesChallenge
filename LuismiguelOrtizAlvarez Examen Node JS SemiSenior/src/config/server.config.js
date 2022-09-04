const SERVER_ENV = {
    'production': { port: 3000 , key: 'QWE$#"RFDSA', uri:"mongo-server"},
    'development': { port: 3000 , key: 'QWE$#"RFDSA',uri:"localhost"},
    'test':{ port: 3000 ,uri:"localhost", testEnvironment: 'node'}
};

module.exports = SERVER_ENV;
