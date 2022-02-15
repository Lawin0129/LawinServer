const Express = require("express");
const express = Express.Router();
const friendslist = require("./../responses/friendslist.json");
const friendslist2 = require("./../responses/friendslist2.json");

express.get("/friends/api/v1/*/settings", async (req, res) => {
    res.json({})
})

express.get("/friends/api/v1/*/blocklist", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/friends/*", async (req, res) => {
    res.json(friendslist)
})

express.get("/friends/api/v1/*/summary", async (req, res) => {
    res.json(friendslist2)
})

express.get("/friends/api/public/list/fortnite/*/recentPlayers", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/blocklist/*", async (req, res) => {
    res.json({
        "blockedUsers": []
    })
})

module.exports = express;