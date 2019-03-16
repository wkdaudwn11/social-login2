const passport = require('passport');
const JwtStrategy = requre('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config/index');
const User = require('./models/userSchema');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    _secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try{
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        if(!user){ // If user doesn't exists, handle it
            return done(null, false);
        }else{ // Otherwise, return the user
            done(null, user);
        }
    }catch(error){
        done(error.false);
    }
}));
