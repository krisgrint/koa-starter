import { Context, Next } from "koa";
import passport from "koa-passport";
import jwt from "jsonwebtoken";

export const profile = async (ctx: Context): Promise<void> => {
  ctx.status = 200;
  ctx.body = {
    message: "Profile page",
  };
};

export const login = async (ctx: Context, next: Next): Promise<void> => {
  passport.authenticate("login", (err, user) => {
    if (!user) {
      ctx.throw(401);
    }
    ctx.body = { token: jwt.sign({ user }, "TOP_SECRET") };
    ctx.login(user, { session: false });
  })(ctx, next);
};
