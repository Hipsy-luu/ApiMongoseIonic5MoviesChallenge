const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name : String,
    description : String
}, {
    timestamps: true
});

RoleSchema.index({name : 1 });

module.exports = {
    Role : mongoose.model('Role', RoleSchema),
    RoleSchema : RoleSchema
};



