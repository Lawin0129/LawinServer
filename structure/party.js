const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

express.get("/party/api/v1/Fortnite/user/*", async (req, res) => {
    res.json({
        "current": [],
        "pending": [],
        "invites": [],
        "pings": []
    });
})

express.post("/party/api/v1/Fortnite/parties", async (req, res) => {
    if (!req.body.join_info) return res.json({});
    if (!req.body.join_info.connection) return res.json({});

    res.json({
        "id": functions.MakeID().replace(/-/ig, ""),
        "created_at": new Date().toISOString(),
        "updated_at": new Date().toISOString(),
        "config": {
            "type": "DEFAULT",
            ...req.body.config,
            "discoverability": "ALL",
            "sub_type": "default",
            "invite_ttl": 14400,
            "intention_ttl": 60
        },
        "members": [{
            "account_id": (req.body.join_info.connection.id || "").split("@prod")[0],
            "meta": req.body.join_info.meta || {},
            "connections": [
                {
                    "id": req.body.join_info.connection.id || "",
                    "connected_at": new Date().toISOString(),
                    "updated_at": new Date().toISOString(),
                    "yield_leadership": false,
                    "meta": req.body.join_info.connection.meta || {}
                }
            ],
            "revision": 0,
            "updated_at": new Date().toISOString(),
            "joined_at": new Date().toISOString(),
            "role": "CAPTAIN"
        }],
        "applicants": [],
        "meta": req.body.meta || {},
        "invites": [],
        "revision": 0,
        "intentions": []
    })
})

express.all("/party/api/v1/Fortnite/parties/*", async (req, res) => {
    res.status(204)
    res.end()
})

module.exports = express;