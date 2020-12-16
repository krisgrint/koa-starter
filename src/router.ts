import Router from "@koa/router";
import passport from "koa-passport";
import { DefaultState, Context } from "koa";
import { heartbeat, profile, login } from "./handlers";

const router = new Router<DefaultState, Context>();

router.get("/heartbeat", heartbeat);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);
router.post("/login", login);

export default router;
