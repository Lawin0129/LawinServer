const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");
const catalog = functions.getItemShop();
const keychain = require("./../responses/keychain.json");

express.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
    if (req.headers["user-agent"].includes("2870186")) {
        return res.status(404).end();
    }

    res.json(catalog);
})

express.get("/fortnite/api/storefront/v2/keychain", async (req, res) => {
    res.json(keychain)
})

express.get("/catalog/api/shared/bulk/offers", async (req, res) => {
    res.json({});
})

module.exports = express;