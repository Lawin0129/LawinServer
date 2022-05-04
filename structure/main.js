const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const path = require("path");
const functions = require("./functions.js");

express.get("/clearitemsforshop", async (req, res) => {
    res.set("Content-Type", "text/plain");

    const athena = require("./../profiles/athena.json");
    const CatalogConfig = require("./../Config/catalog_config.json");
    var StatChanged = false;

    for (var value in CatalogConfig) {
        for (var i in CatalogConfig[value].itemGrants) {
            if (Array.isArray(CatalogConfig[value].itemGrants)) {
                for (var key in athena.items) {
                    if (typeof CatalogConfig[value].itemGrants[i] == "string") {
                        if (CatalogConfig[value].itemGrants[i].length != 0) {
                            if (CatalogConfig[value].itemGrants[i].toLowerCase() == athena.items[key].templateId.toLowerCase()) {
                                delete athena.items[key]

                                StatChanged = true;
                            }
                        }
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
            "https://epicgames-download1.akamaized.net/",
            "https://download.epicgames.com/",
            "https://download2.epicgames.com/",
            "https://download3.epicgames.com/",
            "https://download4.epicgames.com/",
            "https://lawinserver.ol.epicgames.com/"
        ]
    });
})

express.get("/launcher/api/public/assets/*", async (req, res) => {
    res.json({
        "appName": "FortniteContentBuilds",
        "labelName": "LawinServer",
        "buildVersion": "++Fortnite+Release-20.00-CL-19458861-Windows",
        "catalogItemId": "5cb97847cee34581afdbc445400e2f77",
        "expires": "9999-12-31T23:59:59.999Z",
        "items": {
            "MANIFEST": {
                "signature": "LawinServer",
                "distribution": "https://lawinserver.ol.epicgames.com/",
                "path": "Builds/Fortnite/Content/CloudDir/LawinServer.manifest",
                "hash": "55bb954f5596cadbe03693e1c06ca73368d427f3",
                "additionalDistributions": []
            },
            "CHUNKS": {
                "signature": "LawinServer",
                "distribution": "https://lawinserver.ol.epicgames.com/",
                "path": "Builds/Fortnite/Content/CloudDir/LawinServer.manifest",
                "additionalDistributions": []
            }
        },
        "assetId": "FortniteContentBuilds"
    });
})

express.get("/Builds/Fortnite/Content/CloudDir/*.manifest", async (req, res) => {
    res.set("Content-Type", "application/octet-stream")

    const manifest = fs.readFileSync(path.join(__dirname, "..", "responses", "CloudDir", "LawinServer.manifest"));

    res.status(200).send(manifest).end();
})

express.get("/Builds/Fortnite/Content/CloudDir/*.chunk", async (req, res) => {
    res.set("Content-Type", "application/octet-stream")

    const chunk = fs.readFileSync(path.join(__dirname, "..", "responses", "CloudDir", "LawinServer.chunk"));

    res.status(200).send(chunk).end();
})

express.get("/Builds/Fortnite/Content/CloudDir/*.ini", async (req, res) => {
    const ini = fs.readFileSync(path.join(__dirname, "..", "responses", "CloudDir", "Full.ini"));

    res.status(200).send(ini).end();
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

express.post("/fortnite/api/game/v2/chat/*/*/*/pc", async (req, res) => {
    res.json({ "GlobalChatRooms": [{"roomName":"lawinserverglobal"}] })
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

express.get("/fortnite/api/game/v2/homebase/allowed-name-chars", async (req, res) => {
    res.json({
        "ranges": [
            48,
            57,
            65,
            90,
            97,
            122,
            192,
            255,
            260,
            265,
            280,
            281,
            286,
            287,
            304,
            305,
            321,
            324,
            346,
            347,
            350,
            351,
            377,
            380,
            1024,
            1279,
            1536,
            1791,
            4352,
            4607,
            11904,
            12031,
            12288,
            12351,
            12352,
            12543,
            12592,
            12687,
            12800,
            13055,
            13056,
            13311,
            13312,
            19903,
            19968,
            40959,
            43360,
            43391,
            44032,
            55215,
            55216,
            55295,
            63744,
            64255,
            65072,
            65103,
            65281,
            65470,
            131072,
            173791,
            194560,
            195103
        ],
        "singlePoints": [
            32,
            39,
            45,
            46,
            95,
            126
        ],
        "excludedPoints": [
            208,
            215,
            222,
            247
        ]
    })
})

express.post("/datarouter/api/v1/public/data", async (req, res) => {
    res.status(204);
    res.end();
})

express.post("/api/v1/assets/Fortnite/*/*", async (req, res) => {
    if (req.body.hasOwnProperty("FortCreativeDiscoverySurface") && req.body.FortCreativeDiscoverySurface == 0) {
        const discovery_api_assets = require("./../responses/discovery/discovery_api_assets.json");
        res.json(discovery_api_assets)
    }
    else {
        res.json({
            "FortCreativeDiscoverySurface": {
                "meta": {
                    "promotion": req.body.FortCreativeDiscoverySurface || 0
                },
                "assets": {}
            }
        })
    }
})

express.get("/region", async (req, res) => {
    res.json({
        "continent": {
            "code": "EU",
            "geoname_id": 6255148,
            "names": {
                "de": "Europa",
                "en": "Europe",
                "es": "Europa",
                "fr": "Europe",
                "ja": "ヨーロッパ",
                "pt-BR": "Europa",
                "ru": "Европа",
                "zh-CN": "欧洲"
            }
        },
        "country": {
            "geoname_id": 2635167,
            "is_in_european_union": false,
            "iso_code": "GB",
            "names": {
                "de": "UK",
                "en": "United Kingdom",
                "es": "RU",
                "fr": "Royaume Uni",
                "ja": "英国",
                "pt-BR": "Reino Unido",
                "ru": "Британия",
                "zh-CN": "英国"
            }
        },
        "subdivisions": [
            {
                "geoname_id": 6269131,
                "iso_code": "ENG",
                "names": {
                    "de": "England",
                    "en": "England",
                    "es": "Inglaterra",
                    "fr": "Angleterre",
                    "ja": "イングランド",
                    "pt-BR": "Inglaterra",
                    "ru": "Англия",
                    "zh-CN": "英格兰"
                }
            },
            {
                "geoname_id": 3333157,
                "iso_code": "KEC",
                "names": {
                    "en": "Royal Kensington and Chelsea"
                }
            }
        ]
    })
})

module.exports = express;
