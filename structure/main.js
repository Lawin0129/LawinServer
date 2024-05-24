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
    res.json([{
    "codeId": "L4WINS3RV3R",
    "codeType": "CodeToken:FounderFriendInvite",
    "dateCreated": "2024-04-02T21:37:00.420Z"
  },
  {
    "codeId": "playeereq",
    "codeType": "CodeToken:FounderFriendInvite_XBOX",
    "dateCreated": "2024-04-02T21:37:00.420Z"
  },
  {
    "codeId": "lawinscodelol",
    "codeType": "CodeToken:MobileInvite",
    "dateCreated": "2024-04-02T21:37:00.420Z"
  }])
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

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*", async (req, res) => {
    const tournamentandhistory = require("./../responses/Athena/Tournament/tournamentandhistory.json");
    
    res.json(tournamentandhistory)
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

express.get("/d98eeaac-2bfa-4bf4-8a59-bdc95469c693", async (req, res) => {
    res.json({
        "playlist": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPE1QRCB4bWxucz0idXJuOm1wZWc6ZGFzaDpzY2hlbWE6bXBkOjIwMTEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4c2k6c2NoZW1hTG9jYXRpb249InVybjptcGVnOkRBU0g6c2NoZW1hOk1QRDoyMDExIGh0dHA6Ly9zdGFuZGFyZHMuaXNvLm9yZy9pdHRmL1B1YmxpY2x5QXZhaWxhYmxlU3RhbmRhcmRzL01QRUctREFTSF9zY2hlbWFfZmlsZXMvREFTSC1NUEQueHNkIiBwcm9maWxlcz0idXJuOm1wZWc6ZGFzaDpwcm9maWxlOmlzb2ZmLWxpdmU6MjAxMSIgdHlwZT0ic3RhdGljIiBtZWRpYVByZXNlbnRhdGlvbkR1cmF0aW9uPSJQVDMwLjIxM1MiIG1heFNlZ21lbnREdXJhdGlvbj0iUFQyLjAwMFMiIG1pbkJ1ZmZlclRpbWU9IlBUNC4xMDZTIj4KICA8QmFzZVVSTD5odHRwczovL2ZvcnRuaXRlLXB1YmxpYy1zZXJ2aWNlLXByb2QxMS5vbC5lcGljZ2FtZXMuY29tL2F1ZGlvL0phbVRyYWNrcy9PR1JlbWl4LzwvQmFzZVVSTD4KICA8UHJvZ3JhbUluZm9ybWF0aW9uPjwvUHJvZ3JhbUluZm9ybWF0aW9uPgogIDxQZXJpb2QgaWQ9IjAiIHN0YXJ0PSJQVDBTIj4KICAgIDxBZGFwdGF0aW9uU2V0IGlkPSIwIiBjb250ZW50VHlwZT0iYXVkaW8iIHN0YXJ0V2l0aFNBUD0iMSIgc2VnbWVudEFsaWdubWVudD0idHJ1ZSIgYml0c3RyZWFtU3dpdGNoaW5nPSJ0cnVlIj4KICAgICAgPFJlcHJlc2VudGF0aW9uIGlkPSIwIiBhdWRpb1NhbXBsaW5nUmF0ZT0iNDgwMDAiIGJhbmR3aWR0aD0iMTI4MDAwIiBtaW1lVHlwZT0iYXVkaW8vbXA0IiBjb2RlY3M9Im1wNGEuNDAuMiI+CiAgICAgICAgPFNlZ21lbnRUZW1wbGF0ZSBkdXJhdGlvbj0iMjAwMDAwMCIgdGltZXNjYWxlPSIxMDAwMDAwIiBpbml0aWFsaXphdGlvbj0iaW5pdF8kUmVwcmVzZW50YXRpb25JRCQubXA0IiBtZWRpYT0ic2VnbWVudF8kUmVwcmVzZW50YXRpb25JRCRfJE51bWJlciQubTRzIiBzdGFydE51bWJlcj0iMSI+PC9TZWdtZW50VGVtcGxhdGU+CiAgICAgICAgPEF1ZGlvQ2hhbm5lbENvbmZpZ3VyYXRpb24gc2NoZW1lSWRVcmk9InVybjptcGVnOmRhc2g6MjMwMDM6MzphdWRpb19jaGFubmVsX2NvbmZpZ3VyYXRpb246MjAxMSIgdmFsdWU9IjIiPjwvQXVkaW9DaGFubmVsQ29uZmlndXJhdGlvbj4KICAgICAgPC9SZXByZXNlbnRhdGlvbj4KICAgIDwvQWRhcHRhdGlvblNldD4KICA8L1BlcmlvZD4KPC9NUEQ+",
        "playlistType": "application/dash+xml",
        "metadata": {
            "assetId": "",
            "baseUrls": [
                "https://fortnite-public-service-prod11.ol.epicgames.com/audio/JamTracks/OGRemix/"
            ],
            "supportsCaching": true,
            "ucp": "a",
            "version": "f2528fa1-5f30-42ff-8ae5-a03e3b023a0a"
        }
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
    const tournament = require("./../responses/Athena/Tournament/tournament.json");
    
    res.json(tournament)
})

express.get("/api/v1/events/Fortnite/:eventId/history/:accountId", async (req, res) => {
    var history = require("./../responses/Athena/Tournament/history.json");
    history[0].scoreKey.eventId = req.params.eventId;
    history[0].teamId = req.params.accountId;
    history[0].teamAccountIds.push(req.params.accountId);
    
    res.json(history)
})

express.get("/api/v1/leaderboards/Fortnite/:eventId/:eventWindowId/:accountId", async (req, res) => {
    var leaderboards = require("./../responses/Athena/Tournament/leaderboard.json");
    var heroNames = require("./../responses/Campaign/heroNames.json");
    heroNames = heroNames.sort(() => Math.random() - 0.5);
    heroNames.unshift(req.params.accountId);

    leaderboards.eventId = req.params.eventId;
    leaderboards.eventWindowId = req.params.eventWindowId;

    var entryTemplate = leaderboards.entryTemplate;

    for (var i = 0; i < heroNames.length; i++) {
        var entry = { ...entryTemplate };
        entry.eventId = req.params.eventId;
        entry.eventWindowId = req.params.eventWindowId;

        entry.teamAccountIds = [heroNames[i]];
        entry.teamId = heroNames[i];
        
        entry.pointsEarned = entry.score = 69 - i;
        var splittedPoints = Math.floor(Math.random() * entry.pointsEarned);
        entry.pointBreakdown = {
            "PLACEMENT_STAT_INDEX:13": {
                "timesAchieved": 13,
                "pointsEarned": splittedPoints
            },
            "TEAM_ELIMS_STAT_INDEX:37": {
                "timesAchieved": 13,
                "pointsEarned": entry.pointsEarned - splittedPoints
            }
        };
        entry.rank = i + 1;

        leaderboards.entries.push(entry)
    }
    
    res.json(leaderboards)
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

express.get("/fortnite/api/game/v2/leaderboards/cohort/:accountId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "cohortAccounts": [
            req.params.accountId,
            "Lawin",
            "TI93",
            "PRO100KatYT",
            "Playeereq",
            "Matteoki"
        ],
        "expiresAt": "9999-12-31T00:00:00.000Z",
        "playlist": req.query.playlist
    })
})

express.post("/fortnite/api/leaderboards/type/group/stat/:statName/window/:statWindow", async (req, res) => {
    var entries = [];
    
    for (var i = 0; i < req.body.length; i++) {
        entries.push({
            "accountId": req.body[i],
            "value": Math.floor(Math.random() * 68) + 1
        })
    }

    res.json({
        "entries": entries,
        "statName": req.params.statName,
        "statWindow": req.params.statWindow
    })
    res.end();
});

express.post("/fortnite/api/leaderboards/type/global/stat/:statName/window/:statWindow", async (req, res) => {
    var heroNames = require("./../responses/Campaign/heroNames.json");

    var entries = [];
    
    for (var i = 0; i < heroNames.length; i++) {
        entries.push({
            "accountId": heroNames[i],
            "value": Math.floor(Math.random() * 68) + 1
        })
    }

    res.json({
        "entries": entries,
        "statName": req.params.statName,
        "statWindow": req.params.statWindow
    })
    res.end();
});

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
        const discovery_api_assets = require("./../responses/Athena/Discovery/discovery_api_assets.json");
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

// Parental Controls
express.all("/v1/epic-settings/public/users/*/values", async (req, res) => {
    const epicsettings = require("./../responses/epic-settings.json");
    res.json(epicsettings)
})

express.get("/fortnite/api/game/v2/br-inventory/account/*", async (req, res) => {
    res.json({
        "stash": {
            "globalcash": 5000
        }
    })
})

module.exports = express;
