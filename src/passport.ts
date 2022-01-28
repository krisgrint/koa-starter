import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

export default (): void => {
  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      const compare = password === "test123";
      if (username === "kris" && compare) {
        done(null, { username });
      } else {
        done(null, false);
      }
    })
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        secretOrKey: "TOP_SECRET",
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
