const Express = require("express");
const express = Express.Router();
const discovery = require("./../responses/discovery/discovery_frontend.json");

express.post("/fortnite/api/game/v2/creative/discovery/surface/*", async (req, res) => {
    res.json(discovery);
})

module.exports = express;