import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserModel from './models/UserModel';
const { PASSPORT_SECRET } = process.env;

const sign = payload => jwt.sign(payload, PASSPORT_SECRET);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PASSPORT_SECRET
};

passport.use(new Strategy(options, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}))

export {
  sign,
  passport
}