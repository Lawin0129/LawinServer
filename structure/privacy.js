const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const privacy = require("./../responses/privacy.json");

express.get("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    privacy.accountId = req.params.accountId;

    res.json(privacy);
})

express.post("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    privacy.accountId = req.params.accountId;
    privacy.optOutOfPublicLeaderboards = req.body.optOutOfPublicLeaderboards;

    fs.writeFileSync("./responses/privacy.json", JSON.stringify(privacy, null, 2));

    res.json(privacy);
    res.end();
})

module.exports = express;