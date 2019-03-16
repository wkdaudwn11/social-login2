const JWT = require('jsonwebtoken');
const User = require('../models/userSchema');

const {JWT_SECRET} = require('../config/index');

signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr', // 작성자?
        sub: user.id, // 아이디
        iat: new Date().getTime(), // 생성날짜
        exp: new Date().setDate(new Date().getDate() + 1) // 만료날짜 (생성날짜 + 1일)
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const {email, password} = req.value.body;
        console.log("입력된 이메일: "+email);
        
        // findOne은 몽구스에서 제공해주는 함수.
        const foundUser = await User.findOne({email});
        
        if(foundUser){
            return res.status(403).json({error: '이미 존재하는 이메일입니다.'}); // JSON값으로 화면에 뿌리는 거 같음
        }else{
            console.log("Create New User..");
            const newUser = new User({email, password});
            await newUser.save();

            // 토큰 생성
            const token = signToken(newUser);

            // 서버에다가 토큰 보내기
            //res.status(200).json({user: 'created'});
            res.status(200).json({user: token});
        }
    },

    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called!!');
        console.log(req.body);
        //console.log(req.user);
        //const token = signToken(req.user);
        // console.log(token);
        // res.status(200).json({token});
    },

    secret: async (req, res, next) => {
        console.log('UserController.secret() called!!');
    }
}