const { Schema, model} = require('mongoose')
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema(  
    {
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    todo : [{type : Schema.Types.ObjectId, ref: 'Todo'}],
    },
    {timestamps:true}
);

//! Hooks
userSchema.pre('save', function(next) {
    
    if (this.password ) {
        this.password = hash(this.password);
    }

    next();
})

const user = model('User', userSchema);
exports.User = user;