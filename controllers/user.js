const { compare } = require("bcrypt");
const {User} = require("../models/user")
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helpers/emailSender");
const { JWT_SECRET_KEY } = process.env
// const sendMail = require('../helpers/emailSender')

class UserController{
    static getAll = async(req, res, next) => {
        try {
            const data = await User.find();

            res.status(200).json({
                success:true,
                message : 'Succesfully Retrive Data!',
                data
            });
        } catch (err) {
             //   err.status = 500;
            next(err);

        }
    };
    
    static view = async(req, res, next) => {
        try {
            const {id} =req.params;
            const data = await User.findById(id);
            console.log('data find user', data.username);

            res.status(200).json({
                success:true,
                message : `Succesfully Retrive Data! id ${id}`,
                data
                
            });
        } catch (err) {
             //   err.status = 500;
            next(err);
        }
    };

    // static register = async(req, res, next) => {
    //     try {
    //         const {username, password} = req.body;
    //         const data = await User.create({username, password})

    //         res.status(200).json({
    //             success:true,
    //             message : `Succesfully create data`,
    //             data
    //         });
    //     } catch (err) {
    //          //   err.status = 500;
    //         next(err);
    //     }
    // };

    static async register(req, res) {
        try {
          // User registration
          const { username, email, password} = req.body;
    
          /* Register user logic */
    
          /* End of register user logic */
    
          //! send email with nodemailer
         await sendMail (
            email,
            'Registration Success',
            'You have successfully registered',
            `<b>Welcome ${username}</b>`
          );
    
          res.status(201).json({ msg: `User berhasil dibuat!`, data : req.body });
        } catch (error) {
          res.status(500).json({ msg: error.message || `Internal server is an error!` });
        }
      } 

    static login = async (req, res, next) => {
        try {
            const {username, password} = req.body;

            const user = await User.findOne({ username });

            if (!user)
                return res.status(400).json({
                    success : false,
                    message : 'user not found',
                });

            const checkPassword = compare(password, user.password)

            if (!checkPassword) 
                return res.status(400).json({
                    success : false,
                    message : 'incorrect password',
                });

            const payload = {
                id : user.id,
                username : user.username,
            };

            const token = jwt.sign(payload, JWT_SECRET_KEY)

            res.status(200).json({
                success : true,
                message : 'Successfully Login',
                token,
            });

        } catch(err) {
            // err.status = 500
            next(err)
        }
    };
    

    //! TODO CREATE LOGIN

    static edit = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {username, password} = req.body;
            let errorMessage = ""
            if (!username) {
                errorMessage += " username"
            }
            if(!password) {
                errorMessage += " password"
            }

            if (errorMessage) {
                return res.status(400).json({
                    success : false,
                    message : `Please Fill${errorMessage}`
                })
            }

            // ----- dynamic update -------
            const updatedData = {};
            if (username) updatedData.username = username;
            if(password) updatedData.password = password;
            // ----- dynamic update -------

            const data = await User.findByIdAndUpdate(
                id,
                {
                    $set : updatedData, //update ketika diisi data
                },
                {
                    new : true
                }                
            );
            if (!data) {
                return res.status(500).json({
                    success:false,
                    message: "failed to update data !",
                });
            }
            res.status(200).json({
                success:true,
                message : `Succesfully updated data`,
                data
            
            });
        } catch (err) {
             //   err.status = 500;
            next(err);
        }
    };

    static delete = async(req, res, next) => {
        try {
            const {id} =req.params;
            const data = await User.findByIdAndDelete(id);

            res.status(200).json({
                success:true,
                message : `Succesfully delete Data! byId ${id}`,
                data
            });
            
        } catch (err) {
            //    err.status = 500;
            next(err);
        }
    };    
}

module.exports = UserController
