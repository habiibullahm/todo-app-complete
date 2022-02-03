const { Todo } = require('../models/todo');
const { User } = require('../models/user');

class TodoContollers {
    static getAll = async (req, res, next) => {
        try {
            const data = await Todo.find().populate("userId", "_id username");
            res.status(200).json({
                success: true,
                message: "Successfuly retrieve data !",
                data
            });

        } catch(err) {
            //err.status = 500
            next(err)
        }
    }

    static view = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Todo.findById(id).populate("userId", "_id username");
            
            res.status(200).json({
                success : true,
                message : "Successfully retrieve data !",
                data
            });

        } catch(err) {
            // err.status = 500
            next(err)
        }
    }

    static create = async (req, res, next) => {
        try {
            const { name } = req.body;
            const   id   = req.decoded.id;

            const data = await Todo.create({name, userId : id});
       
            //push Todo id to User who created the todo
            await User.findByIdAndUpdate(id, {
                $push : {
                    todo : data.id,
                },
            });

            res.status(200).json({
                success : true,
                message : "Successfully create data !",
                data,
            });
            
        } catch (err) {
            next(err);
        }
           
        

    }

    static edit = async (req, res, next) => {
        try {
            const { name } = req.body
            const { id } = req.params

        const data = await Todo.findByIdAndUpdate(id, {
            $set: { name },
            },
            {
                new:true,
            }
        ); 
            res.status(200).json({
                success : true,
                message : "Successfully Updated Data !",
                data,
            })

        } catch(err) {
            // err.status 500
            next(err);
        }
    };

    static delete = async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await Todo.findByIdAndDelete(id) 


            res.status(200).json({
                success : true,
                message : "Succesfully Delete Data !",
                data,
            });
            

        } catch(err) {
            next(err)
        }
    }
}

module.exports = TodoContollers