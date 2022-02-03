const { Schema, model} = require('mongoose')

const todoSchema = new Schema(  
    {
    name: {type:String, required : true },
    userId: {type:Schema.Types.ObjectId, ref: 'User'}, 
    },
    {timestamps:true}
);

const todo = model('Todo', todoSchema);
exports.Todo = todo;