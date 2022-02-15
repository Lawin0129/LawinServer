const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

express.get("/content/api/pages/*", async (req, res) => {
    const contentpages = functions.getContentPages(req);

    res.json(contentpages)
})

module.exports = express;