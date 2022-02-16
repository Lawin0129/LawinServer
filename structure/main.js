const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const functions = require("./functions.js");

express.get("/clearitemsforshop", async (req, res) => {
    res.set("Content-Type", "text/plain");

    const athena = require("./../profiles/athena.json");
    const CatalogConfig = require("./../Config/catalog_config.json");
    var StatChanged = false;

    for (var value in CatalogConfig) {
        for (var key in athena.items) {
            if (typeof CatalogConfig[value].templateId == "string") {
                if (CatalogConfig[value].templateId.length != 0) {
                    if (CatalogConfig[value].templateId.toLowerCase() == athena.items[key].templateId.toLowerCase()) {
                        delete athena.items[key]

                        StatChanged = true;
                    }
                }
            }
        }
    }

    if (StatChanged == true) {
        athena.rvn += 1;
        athena.commandRevision += 1;

        fs.writeFileSync("./profiles/athena.json", JSON.stringify(athena, null, 2));

        res.send('Success');
    } else {
        res.send('Failed, there are no items to remove')
    }
})

express.get("/eulatracking/api/shared/agreements/fn*", async (req, res) => {
    res.json({})
})

express.get("/fortnite/api/game/v2/friendcodes/*/epic", async (req, res) => {
    res.json([])
})

express.get("/launcher/api/public/distributionpoints/", async (req, res) => {
    res.json({
        "distributions": [
            "https://download.epicgames.com/",
            "https://download2.epicgames.com/",
            "https://download3.epicgames.com/",
            "https://download4.epicgames.com/",
            "https://epicgames-download1.akamaized.net/"
        ]
    });
})

express.post("/fortnite/api/game/v2/grant_access/*", async (req, res) => {
    res.json({});
    res.status(204);
})

express.post("/api/v1/user/setting", async (req, res) => {
    res.json([]);
})

express.get("/waitingroom/api/waitingroom", async (req, res) => {
    res.status(204);
    res.end();
})

express.get("/socialban/api/public/v1/*", async (req, res) => {
    res.json({
        "bans": [],
        "warnings": []
    });
})

express.get("/party/api/v1/Fortnite/user/*", async (req, res) => {
    res.json({
        "current": [],
        "pending": [],
        "invites": [],
        "pings": []
    });
})

express.post("/party/api/v1/Fortnite/user/*/current/*", async (req, res) => {
    res.json({});
})

express.post("/party/api/v1/Fortnite/user/*/pending/*", async (req, res) => {
    res.json({});
})

express.post("/party/api/v1/Fortnite/user/*/invites/*", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
})

express.post("/party/api/v1/Fortnite/user/*/pings/*", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/statsv2/account/:accountId", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
})

express.get("/statsproxy/api/statsv2/account/:accountId", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
})

express.get("/fortnite/api/stats/accountId/:accountId/bulk/window/alltime", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    })
})

express.post("/fortnite/api/feedback/*", async (req, res) => {
    res.status(200);
    res.end();
})

express.post("/fortnite/api/statsv2/query", async (req, res) => {
    res.json([]);
})

express.post("/statsproxy/api/statsv2/query", async (req, res) => {
    res.json([]);
})

express.post("/fortnite/api/game/v2/events/v2/setSubgroup/*", async (req, res) => {
    res.status(204);
    res.end();
})

express.get("/fortnite/api/game/v2/enabled_features", async (req, res) => {
    res.json([])
})

express.get("/api/v1/events/Fortnite/download/*", async (req, res) => {
    res.json({})
})

express.get("/fortnite/api/game/v2/twitch/*", async (req, res) => {
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/world/info", async (req, res) => {
    const worldstw = functions.getTheater(req);

    res.json(worldstw)
})

express.post("/fortnite/api/game/v2/chat/*/recommendGeneralChatRooms/pc", async (req, res) => {
    res.json({})
})

express.get("/presence/api/v1/_/*/last-online", async (req, res) => {
    res.json({})
})

express.get("/fortnite/api/receipts/v1/account/*/receipts", async (req, res) => {
    res.json([])
})

express.get("/fortnite/api/game/v2/leaderboards/cohort/*", async (req, res) => {
    res.json([])
})

express.post("/datarouter/api/v1/public/data", async (req, res) => {
    res.status(204);
    res.end();
})

module.exports = express;
