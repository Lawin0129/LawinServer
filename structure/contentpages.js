const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

express.get("/content/api/pages/fortnite-game/spark-tracks", async (req, res) => {
    const sparkTracks = require("./../responses/Athena/sparkTracks.json");

    res.json(sparkTracks)
})

express.get("/content/api/pages/*", async (req, res) => {
    const contentpages = functions.getContentPages(req);

    res.json(contentpages)
})

express.post("/api/v1/fortnite-br/surfaces/*/target", async (req, res) => {
    const motd = JSON.parse(JSON.stringify(require("./../responses/Athena/motd.json")));
    const fields = ["title", "body", "TeaserTitle", "FullScreenTitle", "FullScreenBody"];

    try {
        motd.contentItems.forEach(item => {
            fields.forEach(field => {
                item.contentFields[field] = item.contentFields[field][req.body.language];
            })
        })
    } catch (err) {}

    res.json(motd)
})

module.exports = express;