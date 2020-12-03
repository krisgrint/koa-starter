const Router = require("@koa/router");
const { heartbeat } = require("./handlers");

const router = new Router();

router.get("/heartbeat", heartbeat);

module.exports = router;
