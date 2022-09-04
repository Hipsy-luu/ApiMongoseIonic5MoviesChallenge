const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name : String,
}, {
    timestamps: true
});

MovieSchema.index({name : 1 });

module.exports = {
    Movie : mongoose.model('Movie', MovieSchema),
    MovieSchema : MovieSchema
};

