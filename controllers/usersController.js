const User = require('../models/userSchema');

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password} = req.value.body;
        console.log("입력된 이메일: "+email);
        
        // findOne은 몽구스에서 제공해주는 함수.
        const foundUser = await User.findOne({email});
        
        if(foundUser){
            return res.status(403).json({error: '존재하는 이메일입니다.'});
        }else{
            console.log("Create New User..");
            const newUser = new User({email, password});
            await newUser.save();
        }
    },

    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called!!');
    },

    secret: async (req, res, next) => {
        console.log('UserController.secret() called!!');
    }
}