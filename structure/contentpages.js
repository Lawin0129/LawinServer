const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

express.get("/content/api/pages/*", async (req, res) => {
    const contentpages = functions.getContentPages(req);

    res.json(contentpages)
})

express.post("/api/v1/fortnite-br/surfaces/motd/target", async (req, res) => {
    const motdTarget = JSON.parse(JSON.stringify(require("./../responses/motdTarget.json")));

    try {
        motdTarget.contentItems.forEach(item => {
            item.contentFields.title = item.contentFields.title[req.body.language];
            item.contentFields.body = item.contentFields.body[req.body.language];
        })
    } catch (err) {}

    res.json(motdTarget)
})

module.exports = express;