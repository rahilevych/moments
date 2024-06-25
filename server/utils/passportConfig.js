import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models/userModel';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY_RANDOM',
};

const JWTAuth = new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
  try {
    const user = await User.findOne({ id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
export default JWTAuth;
