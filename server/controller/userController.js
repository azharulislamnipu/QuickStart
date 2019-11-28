const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const {serverError,resourceError} = require('../utils/error');
const User = require('../model/Users');
module.exports = {

    // login controller
     login(req, res){
       // extract data from request
        // validation check user data
        // echek for user availability
        // compaire with given password
        // generate token and response back
       
        let {email, password} = req.body;

        let validate = loginValidator({ email, password})
 
        if(!validate.isValid){
            return res.status(400).json(validate.error);
        }else{
            //check user exist
        User.findOne({email})
        .then(user => {
            if(!user){
                return resourceError(res, 'User Doesn\'t Exist');
            }else{

                bcrypt.compare(password, user.password, (err, result) => {

                    if(err){
                        return serverError(res, err);
                    }
                    if(!result){
                        return resourceError(res, 'Password Doesn\'t Match');
                    }

                    let token = jwt.sign({
                        _id:user.id,
                        name:user.name,
                        email:user.email
                    }, process.env.SECRET,{expiresIn:'2h'});

                    user.token = `Bearer ${token}`;
                    user.save(user);

                    res.cookie('user_auth',user.token,'',false).status(200).json({
                        message:'Login Successfull',
                        token:`Bearer ${token}`
                        });
                })
                
            }
            
        })
        
   
        }
     },

    // register controller
    register(req, res){
      
         let {name, email, password, confirmPassword, role, token} = req.body;

         let validate = registerValidator({name, email, password, confirmPassword})

         if(!validate.isValid){
             res.status(400).json(validate.error)
         }else{
            
            //check user exist
            User.findOne({email})
            .then(user => {
                if(user){
                    return resourceError(res, 'Email Already Exist');
                }else{
                    bcrypt.hash(password,11,(err, hash) => {

                        if(err){
                            return resourceError(res, 'Server Error Occured');
                        }

                        let user = new User({
                            name, email, password:hash, role, token
                        });

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message:'User Created Success Fully'
                                    })
                            } )
                            .catch(error => serverError(res, error));
                    
                    });
                    
                    
                }
                
            })
            .catch(error => serverError(res, error));

         }

     }
}