import Router from "@koa/router";
import { heartbeat } from "./handlers";

const router = new Router();

router.get("/heartbeat", heartbeat);

export default router;
