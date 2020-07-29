const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Organization = mongoose.model('organizations');
const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const organization = await Organization.findById(payload.organizationId).select('email id');
                if (organization) {
                    done(null, organization);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e)
            }
        })
    );
}