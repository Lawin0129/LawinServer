const Express = require("express");
const express = Express();
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const config = require("./config.json");
const friendslist = require("./responses/friendslist.json");
const friendslist2 = require("./responses/friendslist2.json");
const keychain = require("./responses/keychain.json");
const privacy = require("./responses/privacy.json");
const catalog = getItemShop();
express.use(function(req, res, next) {
    // Getting the raw body of a request for client saving
    if (req.originalUrl.includes('/fortnite/api/cloudstorage/user/')) {
        req.rawBody = '';
        req.setEncoding('latin1');

        req.on('data', function(chunk) {
            req.rawBody += chunk;
        });

        req.on('end', function() {
            next();
        });
    } else {
        return next();
    }
});
express.use(Express.json());
express.use(Express.urlencoded({
    extended: true
}));
express.use(Express.static('public'));

const port = process.env.PORT || 3551;
express.listen(port, console.log("Started listening on port", port));

express.get("/", async (req, res) => {
    res.sendFile('index.html');
})

express.get("/clearitemsforshop", async (req, res) => {
    res.set("Content-Type", "text/plain");

    const athena = require("./profiles/athena.json");
    const CatalogConfig = require("./catalog_config.json");

    for (var value in CatalogConfig) {
        for (var key in athena.items) {
            if (typeof CatalogConfig[value] == "string") {
                if (CatalogConfig[value].length != 0) {
                    if (CatalogConfig[value].toLowerCase() == athena.items[key].templateId.toLowerCase()) {
                        delete athena.items[key]
                    }
                }
            }
        }
    }

    athena.rvn += 1;
    athena.commandRevision += 1;

    fs.writeFileSync("./profiles/athena.json", JSON.stringify(athena, null, 2));

    res.send('Success')
})

express.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
    if (req.headers["user-agent"].includes("2870186")) {
        return res.status(404).end();
    }

    res.json(catalog);
});

express.get("/purchase", async (req, res) => {
    res.json({});
})

express.get("/lightswitch/api/service/Fortnite/status", async (req, res) => {
    res.json({
        "serviceInstanceId": "fortnite",
        "status": "UP",
        "message": "Fortnite is online",
        "maintenanceUri": null,
        "overrideCatalogIds": [
          "a7f138b2e51945ffbfdacc1af0541053"
        ],
        "allowedActions": [],
        "banned": false,
        "launcherInfoDTO": {
          "appName": "Fortnite",
          "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
          "namespace": "fn"
        }
      });
})

express.get("/fortnite/api/version", async (req, res) => {
    res.json({
        "app": "fortnite",
        "serverDate": new Date().toISOString(),
        "overridePropertiesVersion": "unknown",
        "cln": "17951730",
        "build": "444",
        "moduleName": "Fortnite-Core",
        "buildDate": "2021-10-27T21:00:51.697Z",
        "version": "18.30",
        "branch": "Release-18.30",
        "modules": {
          "Epic-LightSwitch-AccessControlCore": {
            "cln": "17237679",
            "build": "b2130",
            "buildDate": "2021-08-19T18:56:08.144Z",
            "version": "1.0.0",
            "branch": "trunk"
          },
          "epic-xmpp-api-v1-base": {
            "cln": "5131a23c1470acbd9c94fae695ef7d899c1a41d6",
            "build": "b3595",
            "buildDate": "2019-07-30T09:11:06.587Z",
            "version": "0.0.1",
            "branch": "master"
          },
          "epic-common-core": {
            "cln": "17909521",
            "build": "3217",
            "buildDate": "2021-10-25T18:41:12.486Z",
            "version": "3.0",
            "branch": "TRUNK"
          }
        }
      });
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

express.post("/fortnite/api/game/v2/tryPlayOnPlatform/account/*", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(true);
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

express.get("/affiliate/api/public/affiliates/slug/:slug", async (req, res) => {
    const SupportedCodes = require("./responses/SAC.json");
    SupportedCodes.forEach(code => {
        if (req.params.slug.toLowerCase() == code.toLowerCase()) {
            return res.json({
                "id": code,
                "slug": code,
                "displayName": code,
                "status": "ACTIVE",
                "verified": false
            });
        }
    })

    res.status(404);
    res.json({});
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

express.post("/party/api/v1/Fortnite/user/*/pings/*", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
})

express.get("/catalog/api/shared/bulk/offers", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
})

express.get("/fortnite/api/matchmaking/session/findPlayer/*", async (req, res) => {
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    privacy.accountId = req.params.accountId;

    res.json(privacy);
});

express.post("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    privacy.accountId = req.params.accountId;
    privacy.optOutOfPublicLeaderboards = req.body.optOutOfPublicLeaderboards;

    fs.writeFileSync("./responses/privacy.json", JSON.stringify(privacy, null, 2));

    res.json(privacy);
    res.end();
});

express.get("/fortnite/api/statsv2/account/:accountId", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
});

express.get("/statsproxy/api/statsv2/account/:accountId", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
});

express.post("/fortnite/api/feedback/*", async (req, res) => {
    res.status(200);
    res.end();
});

express.post("/fortnite/api/statsv2/query", async (req, res) => {
    res.json([]);
});

express.post("/statsproxy/api/statsv2/query", async (req, res) => {
    res.json([]);
});

express.post("/fortnite/api/game/v2/events/v2/setSubgroup/*", async (req, res) => {
    res.status(204);
    res.end();
});

express.get("/fortnite/api/game/v2/enabled_features", async (req, res) => {
    res.json([])
})

express.get("/api/v1/events/Fortnite/download/*", async (req, res) => {
    res.json({})
})

express.get("/lightswitch/api/service/bulk/status", async (req, res) => {
    res.json(
        [{
            "serviceInstanceId": "fortnite",
            "status": "UP",
            "message": "fortnite is up.",
            "maintenanceUri": null,
            "overrideCatalogIds": [
                "a7f138b2e51945ffbfdacc1af0541053"
            ],
            "allowedActions": [
                "PLAY",
                "DOWNLOAD"
            ],
            "banned": false,
            "launcherInfoDTO": {
                "appName": "Fortnite",
                "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
                "namespace": "fn"
            }
        }]
    )
})

express.get("/account/api/public/account", async (req, res) => {
    res.json(
        [
            {
                "id": req.query.accountId,
                "displayName": req.query.accountId,
                "externalAuths": {}
            },
            {
                "id": "SubtoLawin_LOL123",
                "displayName": "Subscribe to Lawin on YouTube!",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "SubtoLawin_LOL123",
                        "externalDisplayName": "YouTube-Lawin",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "SubtoLawin_LOL123",
                        "externalDisplayName": "YouTube-Lawin",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "Followlawin_LOL123",
                "displayName": "Follow @lawin_010 on twitter!",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "Followlawin_LOL123",
                        "externalDisplayName": "Twitter-lawin_010",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "Followlawin_LOL123",
                        "externalDisplayName": "Twitter-lawin_010",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "NINJALOL_1238",
                "displayName": "Ninja",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "NINJALOL_1238",
                        "externalDisplayName": "Ninja",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "NINJALOL_1238",
                        "externalDisplayName": "Ninja",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "TFUELOL_1238",
                "displayName": "Tfue",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "TFUELOL_1238",
                        "externalDisplayName": "Tfue",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "TFUELOL_1238",
                        "externalDisplayName": "Tfue",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "ALIALOL_1238",
                "displayName": "Ali-A",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "ALIALOL_1238",
                        "externalDisplayName": "Ali-A",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "ALIALOL_1238",
                        "externalDisplayName": "Ali-A",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "DAKOTAZLOL_1238",
                "displayName": "Dark",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "DAKOTAZLOL_1238",
                        "externalDisplayName": "Dark",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "DAKOTAZLOL_1238",
                        "externalDisplayName": "Dark",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "SYPHERPKLOL_1238",
                "displayName": "SypherPK",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "SYPHERPKLOL_1238",
                        "externalDisplayName": "SypherPK",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "SYPHERPKLOL_1238",
                        "externalDisplayName": "SypherPK",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            },
            {
                "id": "NICKEH30LOLL_2897669",
                "displayName": "Nick Eh 30",
                "externalAuths": {
                    "xbl": {
                        "type": "xbl",
                        "externalAuthIdType": "xuid",
                        "accountId": "NICKEH30LOLL_2897669",
                        "externalDisplayName": "Nick Eh 30",
                        "authIds": [{
                            "id": "0",
                            "type": "xuid"
                        }]
                    },
                    "psn": {
                        "type": "psn",
                        "externalAuthId": "0",
                        "externalAuthIdType": "psn_user_id",
                        "accountId": "NICKEH30LOLL_2897669",
                        "externalDisplayName": "Nick Eh 30",
                        "authIds": [{
                            "id": "0",
                            "type": "psn_user_id"
                        }]
                    }
                }
            }
        ]
    )
})

express.get("/account/api/public/account/:accountId", async (req, res) => {
    res.json({
        "id": req.params.accountId,
        "displayName": req.params.accountId,
        "name": "Lawin",
        "email": req.params.accountId + "@lawin.com",
        "failedLoginAttempts": 0,
        "lastLogin": new Date().toISOString(),
        "numberOfDisplayNameChanges": 0,
        "ageGroup": "UNKNOWN",
        "headless": false,
        "country": "US",
        "lastName": "Server",
        "preferredLanguage": "en",
        "canUpdateDisplayName": false,
        "tfaEnabled": false,
        "emailVerified": true,
        "minorVerified": false,
        "minorExpected": false,
        "minorStatus": "UNKNOWN"
    })
})

express.get("/fortnite/api/v2/versioncheck/*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
})

express.get("/fortnite/api/v2/versioncheck*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
})

express.get("/fortnite/api/versioncheck*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
})

express.get("/eulatracking/api/shared/agreements/fn*", async (req, res) => {
    res.json({})
})

express.get("/fortnite/api/game/v2/friendcodes/*/epic", async (req, res) => {
    res.json([])
})

express.get("/account/api/epicdomains/ssodomains", async (req, res) => {
    res.json([
        "unrealengine.com",
        "unrealtournament.com",
        "fortnite.com",
        "epicgames.com"
    ])
})

express.get("/fortnite/api/game/v2/matchmakingservice/ticket/player/*", async (req, res) => {
    config.currentbuildUniqueId = req.query.bucketId.split(":")[0];

    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    res.json({
        "serviceUrl": "ws://127.0.0.1:443",
        "ticketType": "mms-player",
        "payload": "69=",
        "signature": "420="
    })
    res.end();
})

express.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "sessionId": req.params.sessionId,
        "key": "AOJEv8uTFmUh7XM2328kq9rlAzeQ5xzWzPIiyKn2s7s="
    })
})

express.get("/fortnite/api/matchmaking/session/:session_id", async (req, res) => {
    res.json({
        "id": req.params.session_id,
        "ownerId": crypto.createHash('md5').update(`1${Math.random().toString()}`).digest('hex').toUpperCase(),
        "ownerName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
        "serverName": "[DS]fortnite-liveeugcec1c2e30ubrcore0a-z8hj-1968",
        "serverAddress": "127.0.0.1",
        "serverPort": 9015,
        "maxPublicPlayers": 220,
        "openPublicPlayers": 175,
        "maxPrivatePlayers": 0,
        "openPrivatePlayers": 0,
        "attributes": {
          "REGION_s": "EU",
          "GAMEMODE_s": "FORTATHENA",
          "ALLOWBROADCASTING_b": true,
          "SUBREGION_s": "GB",
          "DCID_s": "FORTNITE-LIVEEUGCEC1C2E30UBRCORE0A-14840880",
          "tenant_s": "Fortnite",
          "MATCHMAKINGPOOL_s": "Any",
          "STORMSHIELDDEFENSETYPE_i": 0,
          "HOTFIXVERSION_i": 0,
          "PLAYLISTNAME_s": "Playlist_DefaultSolo",
          "SESSIONKEY_s": crypto.createHash('md5').update(`2${Math.random().toString()}`).digest('hex').toUpperCase(),
          "TENANT_s": "Fortnite",
          "BEACONPORT_i": 15009
        },
        "publicPlayers": [],
        "privatePlayers": [],
        "totalPlayers": 45,
        "allowJoinInProgress": false,
        "shouldAdvertise": false,
        "isDedicated": false,
        "usesStats": false,
        "allowInvites": false,
        "usesPresence": false,
        "allowJoinViaPresence": true,
        "allowJoinViaPresenceFriendsOnly": false,
        "buildUniqueId": config.currentbuildUniqueId, // buildUniqueId is different for every build, this uses the netver of the version you're currently using
        "lastUpdated": new Date().toISOString(),
        "started": false
      })
})

express.post("/fortnite/api/matchmaking/session/*/join", async (req, res) => {
    res.status(204);
    res.end();
})

express.post("/fortnite/api/matchmaking/session/matchMakingRequest", async (req, res) => {
    res.json([])
})

express.get("/account/api/public/account/*/externalAuths", async (req, res) => {
    res.json([])
})

express.get("/fortnite/api/game/v2/twitch/*", async (req, res) => {
    res.status(200);
    res.end();
})

express.get("/fortnite/api/stats/accountId/:accountId/bulk/window/alltime", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    })
})

express.delete("/account/api/oauth/sessions/kill", async (req, res) => {
    res.status(204);
    res.end();
})

express.delete("/account/api/oauth/sessions/kill/*", async (req, res) => {
    res.status(204);
    res.end();
})

express.post("/fortnite/api/game/v2/chat/*/recommendGeneralChatRooms/pc", async (req, res) => {
    res.json({})
})

express.get("/friends/api/v1/*/settings", async (req, res) => {
    res.json({})
})

express.get("/friends/api/v1/*/blocklist", async (req, res) => {
    res.json([])
})

express.get("/presence/api/v1/_/*/last-online", async (req, res) => {
    res.json({})
})

express.get("/fortnite/api/receipts/v1/account/*/receipts", async (req, res) => {
    res.json([])
})

express.get("/fortnite/api/cloudstorage/system", async (req, res) => {
    // patch 9.40
    if (req.headers["user-agent"].includes("7315705")) {
        return res
            .status(404)
            .json()
    }
    // patch 9.41
    if (req.headers["user-agent"].includes("7463579")) {
        return res
            .status(404)
            .json()
    }
    // patch 9.41 (2)
    if (req.headers["user-agent"].includes("7609292")) {
        return res
            .status(404)
            .json()
    }
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
    if (seasondata.season == 10) {
        return res.status(404).json();
    }

    const dir = path.join(__dirname, 'CloudStorage')
    var CloudFiles = [];

    fs.readdirSync(dir).forEach(name => {
        if (name.toLowerCase().endsWith(".ini")) {
            const ParsedFile = fs.readFileSync(path.join(__dirname, 'CloudStorage', name), 'utf-8');
            const ParsedStats = fs.statSync(path.join(__dirname, 'CloudStorage', name));

            CloudFiles.push({
                "uniqueFilename": name,
                "filename": name,
                "hash": crypto.createHash('sha1').update(ParsedFile).digest('hex'),
                "hash256": crypto.createHash('sha256').update(ParsedFile).digest('hex'),
                "length": ParsedFile.length,
                "contentType": "application/octet-stream",
                "uploaded": ParsedStats.mtime,
                "storageType": "S3",
                "storageIds": {},
                "doNotCache": true
            })
        }
    });

    res.json(CloudFiles)
})

express.get("/fortnite/api/cloudstorage/system/:file", async (req, res) => {
    const file = path.join(__dirname, 'CloudStorage', req.params.file);

    if (fs.existsSync(file)) {
        const ParsedFile = fs.readFileSync(file);

        return res.status(200).send(ParsedFile).end();
    }

    res.status(200);
    res.end();
})

express.get("/fortnite/api/cloudstorage/user/*/:file", async (req, res) => {
    res.set("Content-Type", "application/octet-stream")

    if (req.params.file.toLowerCase() != "clientsettings.sav") {
        return res.status(404).json({
            "error": "file not found"
        });
    }

    const seasonchecker = require("./seasonchecker.js")
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    var currentBuildID = seasondata.CL;

    const file = path.join(__dirname, `./ClientSettings/ClientSettings-${currentBuildID}.Sav`);

    if (fs.existsSync(file)) {
        return res.status(200).sendFile(file);
    } else {
        return res.status(200).end();
    }
})

express.get("/fortnite/api/cloudstorage/user/:accountId", async (req, res) => {
    res.set("Content-Type", "application/json")

    const seasonchecker = require("./seasonchecker.js")
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    var currentBuildID = seasondata.CL;

    const file = `./ClientSettings/ClientSettings-${currentBuildID}.Sav`;

    if (fs.existsSync(file)) {
        const utf8_file = fs.readFileSync(path.join(__dirname, file), 'utf-8');
        const file_stats = fs.statSync(path.join(__dirname, file));

        return res.json([{
            "uniqueFilename": "ClientSettings.Sav",
            "filename": "ClientSettings.Sav",
            "hash": crypto.createHash('sha1').update(utf8_file).digest('hex'),
            "hash256": crypto.createHash('sha256').update(utf8_file).digest('hex'),
            "length": Buffer.byteLength(utf8_file),
            "contentType": "application/octet-stream",
            "uploaded": file_stats.mtime,
            "storageType": "S3",
            "storageIds": {},
            "accountId": req.params.accountId,
            "doNotCache": true
        }]);
    } else {
        return res.json([]);
    }
})

express.put("/fortnite/api/cloudstorage/user/*/*", async (req, res) => {
    const seasonchecker = require("./seasonchecker.js")
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    var currentBuildID = seasondata.CL;

    fs.writeFileSync(`./ClientSettings/ClientSettings-${currentBuildID}.Sav`, req.rawBody, 'latin1');
    res.status(204).end();
})

express.get("/fortnite/api/game/v2/leaderboards/cohort/*", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/list/fortnite/*/recentPlayers", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/friends/*", async (req, res) => {
    res.json(friendslist)
})

express.get("/friends/api/v1/*/summary", async (req, res) => {
    res.json(friendslist2)
})

express.get("/fortnite/api/calendar/v1/timeline", async (req, res) => {
    const seasonchecker = require("./seasonchecker.js")
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

	var activeEvents = [
	{
		"eventType": `EventFlag.Season${seasondata.season}`,
		"activeUntil": "9999-01-01T00:00:00.000Z",
		"activeSince": "2020-01-01T00:00:00.000Z"
	},
	{
		"eventType": `EventFlag.${seasondata.lobby}`,
		"activeUntil": "9999-01-01T00:00:00.000Z",
		"activeSince": "2020-01-01T00:00:00.000Z"
	}];

	if (seasondata.season == 3) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Spring2018Phase1",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Spring2018Phase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Spring2018Phase3",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Spring2018Phase4",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 4) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Blockbuster2018",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Blockbuster2018Phase1",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Blockbuster2018Phase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Blockbuster2018Phase3",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Blockbuster2018Phase4",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 5) {
		activeEvents.push(
		{
			"eventType": "EventFlag.RoadTrip2018",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Horde",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}
	
	if (seasondata.build == 5.10) {
		activeEvents.push(
		{
			"eventType": "EventFlag.BirthdayBattleBus",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 6) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Fortnitemares",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.FortnitemaresPhase1",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.FortnitemaresPhase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}
	
	if (seasondata.build == 6.20 || seasondata.build == 6.21) {
		activeEvents.push(
		{
			"eventType": "EventFlag.LobbySeason6Halloween",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.HalloweenBattleBus",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 7) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Frostnite",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 8) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Spring2019",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Spring2019.Phase1",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Spring2019.Phase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}


	if (seasondata.season == 9) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Season9.Phase1",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Season9.Phase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

	if (seasondata.season == 10) {
		activeEvents.push(
		{
			"eventType": "EventFlag.Season10.Phase2",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
		{
			"eventType": "EventFlag.Season10.Phase3",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		})
	}

    // Credits to Silas for three of these event flags and credits to uni for testing on 11.31
    if (seasondata.build == 11.31 || seasondata.build == 11.40) {
        activeEvents.push(
        {
            "eventType": "EventFlag.Winterfest.Tree",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.LTE_WinterFest",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.LTE_WinterFest2019",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HolidayDeco",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.Season11.Frostnite",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.Season11.WinterFest.Quests.Phase1",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.Season11.WinterFest.Quests.Phase2",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        })
    }

    if (seasondata.build == 19.01) {
        activeEvents.push(
        {
            "eventType": "EventFlag.LTE_WinterFest",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "WF_IG_AVAIL",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        })
    }

    res.json({
        "channels": {
            "client-matchmaking": {
                "states": [],
                "cacheExpire": "9999-01-01T22:28:47.830Z"
            },
            "client-events": {
                "states": [{
                    "validFrom": "2020-01-01T20:28:47.830Z",
                    "activeEvents": activeEvents,
                    "state": {
                        "activeStorefronts": [],
                        "eventNamedWeights": {},
                        "seasonNumber": seasondata.season,
                        "seasonTemplateId": `AthenaSeason:athenaseason${seasondata.season}`,
                        "matchXpBonusPoints": 0,
                        "seasonBegin": "2020-01-01T13:00:00Z",
                        "seasonEnd": "9999-01-01T14:00:00Z",
                        "seasonDisplayedEnd": "9999-01-01T07:30:00Z",
                        "weeklyStoreEnd": "9999-01-01T00:00:00Z",
                        "stwEventStoreEnd": "9999-01-01T00:00:00.000Z",
                        "stwWeeklyStoreEnd": "9999-01-01T00:00:00.000Z",
                        "dailyStoreEnd": "9999-01-01T00:00:00Z"
                    }
                }],
                "cacheExpire": "9999-01-01T22:28:47.830Z"
            }
        },
        "eventsTimeOffsetHrs": 0,
        "cacheIntervalMins": 10,
        "currentTime": new Date().toISOString()
    });
    res.status(200);
    res.end();
})

express.get("/friends/api/public/blocklist/*", async (req, res) => {
    res.json({
        "blockedUsers": []
    })
})

express.get("/content/api/pages/*", async (req, res) => {
    const contentpages = getContentPages(req);

    res.json(contentpages)
})

express.get("/fortnite/api/game/v2/world/info", async (req, res) => {
    const worldstw = getTheater(req);
    res.json(worldstw)
})

express.get("/fortnite/api/storefront/v2/keychain", async (req, res) => {
    res.json(keychain)
})

express.get("/account/api/oauth/verify", async (req, res) => {
    res.json({
        "token": "lawinstokenlol",
        "session_id": "3c3662bcb661d6de679c636744c66b62",
        "token_type": "bearer",
        "client_id": "lawinsclientidlol",
        "internal_client": true,
        "client_service": "fortnite",
        "account_id": "LawinServer",
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "auth_method": "exchange_code",
        "display_name": "LawinServer",
        "app": "fortnite",
        "in_app_id": "LawinServer",
        "device_id": "lawinsdeviceidlol"
    })
})

express.post("/datarouter/api/v1/public/data", async (req, res) => {
    res.status(204);
    res.end();
})

express.post("/account/api/oauth/token", async (req, res) => {
    res.json({
        "access_token": "lawinstokenlol",
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "token_type": "bearer",
        "refresh_token": "lawinstokenlol",
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-02T01:12:01.100Z",
        "account_id": req.body.username || "LawinServer",
        "client_id": "lawinsclientidlol",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": req.body.username || "LawinServer",
        "app": "fortnite",
        "in_app_id": req.body.username || "LawinServer",
        "device_id": "lawinsdeviceidlol"
    })
})

// MCP BELOW

// Set support a creator code
express.post("/fortnite/api/game/v2/profile/*/client/SetAffiliateName", async (req, res) => {
    const profile = require("./profiles/common_core.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    const SupportedCodes = require("./responses/SAC.json");
    SupportedCodes.forEach(code => {
        if (req.body.affiliateName.toLowerCase() == code.toLowerCase() || req.body.affiliateName == "") {
            profile.stats.attributes.mtx_affiliate_set_time = new Date().toISOString();
            profile.stats.attributes.mtx_affiliate = req.body.affiliateName;
            StatChanged = true;
        }
    })

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "mtx_affiliate_set_time",
            "value": profile.stats.attributes.mtx_affiliate_set_time
        })

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "mtx_affiliate",
            "value": profile.stats.attributes.mtx_affiliate
        })

        fs.writeFileSync("./profiles/common_core.json", JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": "common_core",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set STW banner
express.post("/fortnite/api/game/v2/profile/*/client/SetHomebaseBanner", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.homebaseBannerIconId && req.body.homebaseBannerColorId) {
        switch (req.query.profileId) {

            case "profile0":
                profile.stats.attributes.homebase.bannerIconId = req.body.homebaseBannerIconId;
                profile.stats.attributes.homebase.bannerColorId = req.body.homebaseBannerColorId;
                StatChanged = true;
                break;

            case "common_public":
                profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId;
                profile.stats.attributes.banner_color = req.body.homebaseBannerColorId;
                StatChanged = true;
                break;

        }
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        if (req.query.profileId == "profile0") {
            ApplyProfileChanges.push({
                "changeType": "statModified",
                "name": "homebase",
                "value": profile.stats.attributes.homebase
            })
        }

        if (req.query.profileId == "common_public") {
            ApplyProfileChanges.push({
                "changeType": "statModified",
                "name": "banner_icon",
                "value": profile.stats.attributes.banner_icon
            })

            ApplyProfileChanges.push({
                "changeType": "statModified",
                "name": "banner_color",
                "value": profile.stats.attributes.banner_color
            })
        }

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "profile0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Buy skill tree perk STW
express.post("/fortnite/api/game/v2/profile/*/client/PurchaseHomebaseNode", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var ItemAdded = false;

    const ID = makeid();

    if (req.body.nodeId) {
        profile.items[ID] = {
            "templateId": `HomebaseNode:${req.body.nodeId}`,
            "attributes": {
                "item_seen": true
            },
            "quantity": 1
        };
        ItemAdded = true;
    }

    if (ItemAdded == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "profile0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Open Winterfest presents (11.31 & 19.01)
express.post("/fortnite/api/game/v2/profile/*/client/UnlockRewardNode", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
    const common_core = require("./profiles/common_core.json");
    const WinterFestIDS = require("./responses/winterfestrewards.json");
    const seasondata = require("./season.json");
    const seasonchecker = require("./seasonchecker.js");
    seasonchecker(req, seasondata);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;
    var Season = "Season" + seasondata.season;

    const ID = makeid();
    const GiftID = makeid();

    if (req.body.nodeId && req.body.rewardGraphId) {
        if (WinterFestIDS[Season][req.body.nodeId].toLowerCase().startsWith("homebasebannericon:")) {
            MultiUpdate.push({
                "profileRevision": common_core.rvn || 0,
                "profileId": "common_core",
                "profileChangesBaseRevision": common_core.rvn || 0,
                "profileChanges": [],
                "profileCommandRevision": common_core.commandRevision || 0,
            })

            common_core.items[ID] = {
                "templateId": WinterFestIDS[Season][req.body.nodeId],
                "attributes": {
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": false,
                    "xp": 0,
                    "variants": [],
                    "favorite": false
                },
                "quantity": 1
            };

            MultiUpdate[0].profileChanges.push({
                "changeType": "itemAdded",
                "itemId": ID,
                "item": common_core.items[ID]
            })

            common_core.rvn += 1;
            common_core.commandRevision += 1;
    
            MultiUpdate[0].profileRevision = common_core.rvn || 0;
            MultiUpdate[0].profileCommandRevision = common_core.commandRevision || 0;
        }

        if (!WinterFestIDS[Season][req.body.nodeId].toLowerCase().startsWith("homebasebannericon:")) {
            profile.items[ID] = {
                "templateId": WinterFestIDS[Season][req.body.nodeId],
                "attributes": {
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": false,
                    "xp": 0,
                    "variants": [],
                    "favorite": false
                },
                "quantity": 1
            };

            ApplyProfileChanges.push({
                "changeType": "itemAdded",
                "itemId": ID,
                "item": profile.items[ID]
            })
        }

        profile.items[GiftID] = {"templateId":"GiftBox:gb_winterfestreward","attributes":{"max_level_bonus":0,"fromAccountId":"","lootList":[{"itemType":WinterFestIDS[Season][req.body.nodeId],"itemGuid":ID,"itemProfile":"athena","attributes":{"creation_time":new Date().toISOString()},"quantity":1}],"level":1,"item_seen":false,"xp":0,"giftedOn":new Date().toISOString(),"params":{"SubGame":"Athena","winterfestGift":"true"},"favorite":false},"quantity":1};
        profile.items[req.body.rewardGraphId].attributes.reward_keys[0].unlock_keys_used += 1;
        profile.items[req.body.rewardGraphId].attributes.reward_nodes_claimed.push(req.body.nodeId);

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": GiftID,
            "item": profile.items[GiftID]
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.rewardGraphId,
            "attributeName": "reward_keys",
            "attributeValue": profile.items[req.body.rewardGraphId].attributes.reward_keys
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.rewardGraphId,
            "attributeName": "reward_nodes_claimed",
            "attributeValue": profile.items[req.body.rewardGraphId].attributes.reward_nodes_claimed
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
        fs.writeFileSync("./profiles/common_core.json", JSON.stringify(common_core, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Remove gift box
express.post("/fortnite/api/game/v2/profile/*/client/RemoveGiftBox", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    // Gift box ID on 11.31
    if (req.body.giftBoxItemId) {
        var id = req.body.giftBoxItemId;

        delete profile.items[id];

        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": id
        })

        StatChanged = true;
    }

    // Gift box ID on 19.01
    if (req.body.giftBoxItemIds) {
        for (var i = 0; i < req.body.giftBoxItemIds.length; i++) {
            var id = req.body.giftBoxItemIds[i];

            delete profile.items[id];

            ApplyProfileChanges.push({
                "changeType": "itemRemoved",
                "itemId": id
            })
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set pinned STW quests
express.post("/fortnite/api/game/v2/profile/*/client/SetPinnedQuests", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.pinnedQuestIds) {
        profile.stats.attributes.client_settings.pinnedQuestInstances = req.body.pinnedQuestIds;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "client_settings",
            "value": profile.stats.attributes.client_settings
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Replace Daily Quests
express.post("/fortnite/api/game/v2/profile/*/client/FortRerollDailyQuest", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
    var QuestIDS = require("./responses/quests.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.query.profileId == "profile0" || req.query.profileId == "campaign") {
        QuestIDS = QuestIDS.SaveTheWorld
    }

    if (req.query.profileId == "athena") {
        QuestIDS = QuestIDS.BattleRoyale
    }

    const NewQuestID = makeid();
    var randomNumber = Math.floor(Math.random() * QuestIDS.length);

    for (var key in profile.items) {
        while (QuestIDS[randomNumber].toLowerCase() == profile.items[key].templateId.toLowerCase()) {
            randomNumber = Math.floor(Math.random() * QuestIDS.length);
        }
    }

    if (req.body.questId && profile.stats.attributes.quest_manager.dailyQuestRerolls >= 1) {
        profile.stats.attributes.quest_manager.dailyQuestRerolls -= 1;

        delete profile.items[req.body.questId];

        profile.items[NewQuestID] = {
            "templateId": QuestIDS[randomNumber],
            "attributes": {
                "creation_time": new Date().toISOString(),
                "completion_complete": 0,
                "level": -1,
                "item_seen": false,
                "playlists": [],
                "sent_new_notification": false,
                "challenge_bundle_id": "",
                "xp_reward_scalar": 1,
                "challenge_linked_quest_given": "",
                "quest_pool": "",
                "quest_state": "Active",
                "bucket": "",
                "last_state_change_time": new Date().toISOString(),
                "challenge_linked_quest_parent": "",
                "max_level_bonus": 0,
                "xp": 0,
                "quest_rarity": "uncommon",
                "favorite": false
            },
            "quantity": 1
        };

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "quest_manager",
            "value": profile.stats.attributes.quest_manager
        })

        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": NewQuestID,
            "item": profile.items[NewQuestID]
        })

        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.questId
        })

        Notifications.push({
            "type": "dailyQuestReroll",
            "primary": true,
            "newQuestId": QuestIDS[randomNumber]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Mark New Quest Notification Sent
express.post("/fortnite/api/game/v2/profile/*/client/MarkNewQuestNotificationSent", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.itemIds) {
        for (var i = 0; i < req.body.itemIds.length; i++) {
            var id = req.body.itemIds[i];

            profile.items[id].attributes.sent_new_notification = true

            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": id,
                "attributeName": "sent_new_notification",
                "attributeValue": true
            })
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Check for new quests
express.post("/fortnite/api/game/v2/profile/*/client/ClientQuestLogin", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
    var QuestIDS = require("./responses/quests.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var QuestCount = 0;
    var ShouldGiveQuest = true;
    var DateFormat = (new Date().toISOString()).split("T")[0];

    try {
        if (req.query.profileId == "profile0" || req.query.profileId == "campaign") {
            QuestIDS = QuestIDS.SaveTheWorld

            for (var key in profile.items) {
                if (profile.items[key].templateId.toLowerCase().startsWith("quest:daily")) {
                    QuestCount += 1;
                }
            }
        }

        if (req.query.profileId == "athena") {
            QuestIDS = QuestIDS.BattleRoyale

            for (var key in profile.items) {
                if (profile.items[key].templateId.toLowerCase().startsWith("quest:athenadaily")) {
                    QuestCount += 1;
                }
            }
        }

        if (profile.stats.attributes.hasOwnProperty("quest_manager")) {
            if (profile.stats.attributes.quest_manager.hasOwnProperty("dailyLoginInterval")) {
                if (profile.stats.attributes.quest_manager.dailyLoginInterval.includes("T")) {
                    var DailyLoginDate = (profile.stats.attributes.quest_manager.dailyLoginInterval).split("T")[0];

                    if (DailyLoginDate == DateFormat) {
                        ShouldGiveQuest = false;
                    } else {
                        ShouldGiveQuest = true;
                        profile.stats.attributes.quest_manager.dailyQuestRerolls = 1;
                    }
                }
            }
        }

        if (QuestCount < 3 && ShouldGiveQuest == true) {
            const NewQuestID = makeid();
            var randomNumber = Math.floor(Math.random() * QuestIDS.length);

            for (var key in profile.items) {
                while (QuestIDS[randomNumber].toLowerCase() == profile.items[key].templateId.toLowerCase()) {
                    randomNumber = Math.floor(Math.random() * QuestIDS.length);
                }
            }

            profile.items[NewQuestID] = {
                "templateId": QuestIDS[randomNumber],
                "attributes": {
                    "creation_time": new Date().toISOString(),
                    "completion_complete": 0,
                    "level": -1,
                    "item_seen": false,
                    "playlists": [],
                    "sent_new_notification": false,
                    "challenge_bundle_id": "",
                    "xp_reward_scalar": 1,
                    "challenge_linked_quest_given": "",
                    "quest_pool": "",
                    "quest_state": "Active",
                    "bucket": "",
                    "last_state_change_time": new Date().toISOString(),
                    "challenge_linked_quest_parent": "",
                    "max_level_bonus": 0,
                    "xp": 0,
                    "quest_rarity": "uncommon",
                    "favorite": false
                },
                "quantity": 1
            };
            profile.stats.attributes.quest_manager.dailyLoginInterval = new Date().toISOString();

            ApplyProfileChanges.push({
                "changeType": "itemAdded",
                "itemId": NewQuestID,
                "item": profile.items[NewQuestID]
            })

            ApplyProfileChanges.push({
                "changeType": "statModified",
                "name": "quest_manager",
                "value": profile.stats.attributes.quest_manager
            })

            StatChanged = true;
        }
    } catch (err) {}

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Refund V-Bucks purchase
express.post("/fortnite/api/game/v2/profile/*/client/RefundMtxPurchase", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "common_core"}.json`);
    const ItemProfile = require("./profiles/athena.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var ItemGuids = [];

    if (req.body.purchaseId) {
        MultiUpdate.push({
            "profileRevision": ItemProfile.rvn || 0,
            "profileId": "athena",
            "profileChangesBaseRevision": ItemProfile.rvn || 0,
            "profileChanges": [],
            "profileCommandRevision": ItemProfile.commandRevision || 0,
        })

        profile.stats.attributes.mtx_purchase_history.refundsUsed += 1;
        profile.stats.attributes.mtx_purchase_history.refundCredits -= 1;

        for (var i = 0; i < profile.stats.attributes.mtx_purchase_history.purchases.length; i++) {
            if (profile.stats.attributes.mtx_purchase_history.purchases[i].purchaseId == req.body.purchaseId) {
                for (var x = 0; x < profile.stats.attributes.mtx_purchase_history.purchases[i].lootResult.length; x++) {
                    ItemGuids.push(profile.stats.attributes.mtx_purchase_history.purchases[i].lootResult[x].itemGuid)
                }

                profile.stats.attributes.mtx_purchase_history.purchases[i].refundDate = new Date().toISOString();
            }
        }

        for (var i = 0; i < ItemGuids.length; i++) {
            delete ItemProfile.items[ItemGuids[i]]

            MultiUpdate[0].profileChanges.push({
                "changeType": "itemRemoved",
                "itemId": ItemGuids[i]
            })
        }

        ItemProfile.rvn += 1;
        ItemProfile.commandRevision += 1;
        profile.rvn += 1;
        profile.commandRevision += 1;

        StatChanged = true;
    }

    if (StatChanged == true) {
        
        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "mtx_purchase_history",
            "value": profile.stats.attributes.mtx_purchase_history
        })

        MultiUpdate[0].profileRevision = ItemProfile.rvn || 0;
        MultiUpdate[0].profileCommandRevision = ItemProfile.commandRevision || 0;

        fs.writeFileSync(`./profiles/${req.query.profileId || "common_core"}.json`, JSON.stringify(profile, null, 2));
        fs.writeFileSync(`./profiles/athena.json`, JSON.stringify(ItemProfile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "common_core",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Claim STW daily reward
express.post("/fortnite/api/game/v2/profile/*/client/ClaimLoginReward", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var DateFormat = (new Date().toISOString()).split("T")[0] + "T00:00:00.000Z";

    if (profile.stats.attributes.daily_rewards.lastClaimDate != DateFormat) {
        profile.stats.attributes.daily_rewards.nextDefaultReward += 1;
        profile.stats.attributes.daily_rewards.totalDaysLoggedIn += 1;
        profile.stats.attributes.daily_rewards.lastClaimDate = DateFormat;
        profile.stats.attributes.daily_rewards.additionalSchedules.founderspackdailyrewardtoken.rewardsClaimed += 1;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "daily_rewards",
            "value": profile.stats.attributes.daily_rewards
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Equip team perk STW
express.post("/fortnite/api/game/v2/profile/*/client/AssignTeamPerkToLoadout", async (req, res) => {
    const profile = require("./profiles/campaign.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.loadoutId) {
        profile.items[req.body.loadoutId].attributes.team_perk = req.body.teamPerkId || "";
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "team_perk",
            "attributeValue": profile.items[req.body.loadoutId].attributes.team_perk
        })

        fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Equip gadget STW
express.post("/fortnite/api/game/v2/profile/*/client/AssignGadgetToLoadout", async (req, res) => {
    const profile = require("./profiles/campaign.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.loadoutId) {
        switch (req.body.slotIndex) {

            case 0:
                if (req.body.gadgetId.toLowerCase() == profile.items[req.body.loadoutId].attributes.gadgets[1].gadget.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.gadgets[1].gadget = "";
                }
                profile.items[req.body.loadoutId].attributes.gadgets[req.body.slotIndex].gadget = req.body.gadgetId || "";
                StatChanged = true;
                break;

            case 1:
                if (req.body.gadgetId.toLowerCase() == profile.items[req.body.loadoutId].attributes.gadgets[0].gadget.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.gadgets[0].gadget = "";
                }
                profile.items[req.body.loadoutId].attributes.gadgets[req.body.slotIndex].gadget = req.body.gadgetId || "";
                StatChanged = true;
                break;

        }
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "gadgets",
            "attributeValue": profile.items[req.body.loadoutId].attributes.gadgets
        })

        fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Assign worker to squad STW
express.post("/fortnite/api/game/v2/profile/*/client/AssignWorkerToSquad", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.characterId) {
        for (var key in profile.items) {
            if (profile.items[key].hasOwnProperty('attributes')) {
                if (profile.items[key].attributes.hasOwnProperty('squad_id') && profile.items[key].attributes.hasOwnProperty('squad_slot_idx')) {
                    if (profile.items[key].attributes.squad_id != "" && profile.items[key].attributes.squad_slot_idx != -1) {
                        if (profile.items[key].attributes.squad_id.toLowerCase() == req.body.squadId.toLowerCase() && profile.items[key].attributes.squad_slot_idx == req.body.slotIndex) {
                            profile.items[key].attributes.squad_id = "";
                            profile.items[key].attributes.squad_slot_idx = 0;

                            ApplyProfileChanges.push({
                                "changeType": "itemAttrChanged",
                                "itemId": key,
                                "attributeName": "squad_id",
                                "attributeValue": profile.items[key].attributes.squad_id
                            })

                            ApplyProfileChanges.push({
                                "changeType": "itemAttrChanged",
                                "itemId": key,
                                "attributeName": "squad_slot_idx",
                                "attributeValue": profile.items[key].attributes.squad_slot_idx
                            })
                        }
                    }
                }
            }
        }
    }

    if (req.body.characterId) {
        profile.items[req.body.characterId].attributes.squad_id = req.body.squadId || "";
        profile.items[req.body.characterId].attributes.squad_slot_idx = req.body.slotIndex || 0;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.characterId,
            "attributeName": "squad_id",
            "attributeValue": profile.items[req.body.characterId].attributes.squad_id
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.characterId,
            "attributeName": "squad_slot_idx",
            "attributeValue": profile.items[req.body.characterId].attributes.squad_slot_idx
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "profile0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Assign multiple workers to squad STW
express.post("/fortnite/api/game/v2/profile/*/client/AssignWorkerToSquadBatch", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.characterIds && req.body.squadIds && req.body.slotIndices) {
        for (var i = 0; i < req.body.characterIds.length; i++) {
            for (var key in profile.items) {
                if (profile.items[key].hasOwnProperty('attributes')) {
                    if (profile.items[key].attributes.hasOwnProperty('squad_id') && profile.items[key].attributes.hasOwnProperty('squad_slot_idx')) {
                        if (profile.items[key].attributes.squad_id != "" && profile.items[key].attributes.squad_slot_idx != -1) {
                            if (profile.items[key].attributes.squad_id.toLowerCase() == req.body.squadIds[i].toLowerCase() && profile.items[key].attributes.squad_slot_idx == req.body.slotIndices[i]) {
                                profile.items[key].attributes.squad_id = "";
                                profile.items[key].attributes.squad_slot_idx = 0;

                                ApplyProfileChanges.push({
                                    "changeType": "itemAttrChanged",
                                    "itemId": key,
                                    "attributeName": "squad_id",
                                    "attributeValue": profile.items[key].attributes.squad_id
                                })

                                ApplyProfileChanges.push({
                                    "changeType": "itemAttrChanged",
                                    "itemId": key,
                                    "attributeName": "squad_slot_idx",
                                    "attributeValue": profile.items[key].attributes.squad_slot_idx
                                })
                            }
                        }
                    }
                }
            }

            profile.items[req.body.characterIds[i]].attributes.squad_id = req.body.squadIds[i] || "";
            profile.items[req.body.characterIds[i]].attributes.squad_slot_idx = req.body.slotIndices[i] || 0;

            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.characterIds[i],
                "attributeName": "squad_id",
                "attributeValue": profile.items[req.body.characterIds[i]].attributes.squad_id
            })

            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.characterIds[i],
                "attributeName": "squad_slot_idx",
                "attributeValue": profile.items[req.body.characterIds[i]].attributes.squad_slot_idx
            })
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "profile0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Claim STW quest reward
express.post("/fortnite/api/game/v2/profile/*/client/ClaimQuestReward", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.questId) {
        profile.items[req.body.questId].attributes.quest_state = "Claimed";
        profile.items[req.body.questId].attributes.last_state_change_time = new Date().toISOString();
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.questId,
            "attributeName": "quest_state",
            "attributeValue": profile.items[req.body.questId].attributes.quest_state
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.questId,
            "attributeName": "last_state_change_time",
            "attributeValue": profile.items[req.body.questId].attributes.last_state_change_time
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Level item up STW 1
express.post("/fortnite/api/game/v2/profile/*/client/UpgradeItem", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        profile.items[req.body.targetItemId].attributes.level += 1;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "level",
            "attributeValue": profile.items[req.body.targetItemId].attributes.level
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Level slotted item up STW
express.post("/fortnite/api/game/v2/profile/*/client/UpgradeSlottedItem", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "collection_book_people0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        if (req.body.desiredLevel) {
            var new_level = Number(req.body.desiredLevel);

            profile.items[req.body.targetItemId].attributes.level = new_level;
        } else {
            profile.items[req.body.targetItemId].attributes.level += 1;
        }
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "level",
            "attributeValue": profile.items[req.body.targetItemId].attributes.level
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "collection_book_people0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "collection_book_people0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Level item up STW 2
express.post("/fortnite/api/game/v2/profile/*/client/UpgradeItemBulk", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        var new_level = Number(req.body.desiredLevel);

        profile.items[req.body.targetItemId].attributes.level = new_level;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "level",
            "attributeValue": profile.items[req.body.targetItemId].attributes.level
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Evolve item STW
express.post("/fortnite/api/game/v2/profile/*/client/ConvertItem", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t04")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t04/ig, "T05");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t03")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t03/ig, "T04");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t02")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t02/ig, "T03");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t01")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t01/ig, "T02");
        }

        // Conversion Index: 0 = Ore, 1 = Crystal
        if (req.body.conversionIndex == 1) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/ore/ig, "Crystal");
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        const ID = makeid();

        profile.items[ID] = profile.items[req.body.targetItemId];
        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        delete profile.items[req.body.targetItemId]
        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.targetItemId
        })

        Notifications.push({
            "type": "conversionResult",
            "primary": true,
            "itemsGranted": [
                {
                    "itemType": profile.items[ID].templateId,
                    "itemGuid": ID,
                    "itemProfile": req.query.profileId || "campaign",
                    "attributes": {
                        "level": profile.items[ID].attributes.level,
                        "alterations": profile.items[ID].attributes.alterations || []
                    },
                    "quantity": 1
                }
            ]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Evolve slotted item STW
express.post("/fortnite/api/game/v2/profile/*/client/ConvertSlottedItem", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "collection_book_people0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t04")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t04/ig, "T05");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t03")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t03/ig, "T04");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t02")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t02/ig, "T03");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("t01")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/t01/ig, "T02");
        }

        // Conversion Index: 0 = Ore, 1 = Crystal
        if (req.body.conversionIndex == 1) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/ore/ig, "Crystal");
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        const ID = makeid();

        profile.items[ID] = profile.items[req.body.targetItemId];
        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        delete profile.items[req.body.targetItemId]
        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.targetItemId
        })

        Notifications.push({
            "type": "conversionResult",
            "primary": true,
            "itemsGranted": [
                {
                    "itemType": profile.items[ID].templateId,
                    "itemGuid": ID,
                    "itemProfile": req.query.profileId || "collection_book_people0",
                    "attributes": {
                        "level": profile.items[ID].attributes.level,
                        "alterations": profile.items[ID].attributes.alterations || []
                    },
                    "quantity": 1
                }
            ]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "collection_book_people0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "collection_book_people0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Upgrade item rarity STW
express.post("/fortnite/api/game/v2/profile/*/client/UpgradeItemRarity", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("_vr_")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/_vr_/ig, "_SR_");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("_r_")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/_r_/ig, "_VR_");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("_uc_")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/_uc_/ig, "_R_");
        }

        if (profile.items[req.body.targetItemId].templateId.toLowerCase().includes("_c_")) {
            profile.items[req.body.targetItemId].templateId = profile.items[req.body.targetItemId].templateId.replace(/_c_/ig, "_UC_");
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        const ID = makeid();

        profile.items[ID] = profile.items[req.body.targetItemId];
        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        delete profile.items[req.body.targetItemId]
        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.targetItemId
        })

        Notifications.push([{
            "type": "upgradeItemRarityNotification",
            "primary": true,
            "itemsGranted": [
                {
                    "itemType": profile.items[ID].templateId,
                    "itemGuid": ID,
                    "itemProfile": req.query.profileId || "campaign",
                    "attributes": {
                        "level": profile.items[ID].attributes.level,
                        "alterations": profile.items[ID].attributes.alterations || []
                    },
                    "quantity": 1
                }
            ]
        }])

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Super charge item STW
express.post("/fortnite/api/game/v2/profile/*/client/PromoteItem", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        profile.items[req.body.targetItemId].attributes.level += 2;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "level",
            "attributeValue": profile.items[req.body.targetItemId].attributes.level
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Craft item STW (Guns, melees and traps only)
express.post("/fortnite/api/game/v2/profile/*/client/CraftWorldItem", async (req, res) => {
    const seasondata = require("./season.json");
    const seasonchecker = require("./seasonchecker.js");
    seasonchecker(req, seasondata);

    const profile = require(`./profiles/${req.query.profileId || "theater0"}.json`);
    var schematic_profile;
    // do not change this
    var chosen_profile = false;

    if (4 <= seasondata.season || seasondata.build == 3.5 || seasondata.build == 3.6 && chosen_profile == false) {
        schematic_profile = require("./profiles/campaign.json");
        chosen_profile = true;
    }

    if (3 >= seasondata.season && chosen_profile == false) {
        schematic_profile = require("./profiles/profile0.json");
        chosen_profile = true;
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var Item;
    const ID = makeid();

    if (req.body.targetSchematicItemId) {
        var Body = '';
        Body += JSON.stringify(schematic_profile.items[req.body.targetSchematicItemId]);
        Item = JSON.parse(Body);

        var ItemType = 'Weapon:';
        var ItemIDType = 'WID';
        if (Item.templateId.split("_")[1].split("_")[0].toLowerCase() == "wall") {
            ItemType = "Trap:";
            ItemIDType = "TID";
        }
        if (Item.templateId.split("_")[1].split("_")[0].toLowerCase() == "floor") {
            ItemType = "Trap:";
            ItemIDType = "TID";
        }
        if (Item.templateId.split("_")[1].split("_")[0].toLowerCase() == "ceiling") {
            ItemType = "Trap:";
            ItemIDType = "TID";
        }

        Item.quantity = req.body.numTimesToCraft || 1;
        Item.templateId = Item.templateId.replace(/schematic:/ig, ItemType);
        Item.templateId = Item.templateId.replace(/sid/ig, ItemIDType);
        if (req.body.targetSchematicTier) {
            switch (req.body.targetSchematicTier.toLowerCase()) {

                case "i":
                    if (!Item.templateId.toLowerCase().includes("t01")) {
                        Item.attributes.level = 10;
                    }
                    Item.templateId = Item.templateId.substring(0, Item.templateId.length-3) + "T01"
                    Item.templateId = Item.templateId.replace(/crystal/ig, "Ore")
                break;

                case "ii":
                    if (!Item.templateId.toLowerCase().includes("t02")) {
                        Item.attributes.level = 20;
                    }
                    Item.templateId = Item.templateId.substring(0, Item.templateId.length-3) + "T02"
                    Item.templateId = Item.templateId.replace(/crystal/ig, "Ore")
                break;

                case "iii":
                    if (!Item.templateId.toLowerCase().includes("t03")) {
                        Item.attributes.level = 30;
                    }
                    Item.templateId = Item.templateId.substring(0, Item.templateId.length-3) + "T03"
                    Item.templateId = Item.templateId.replace(/crystal/ig, "Ore")
                break;

                case "iv":
                    if (!Item.templateId.toLowerCase().includes("t04")) {
                        Item.attributes.level = 40;
                    }
                    Item.templateId = Item.templateId.substring(0, Item.templateId.length-3) + "T04"
                break;

                case "v":
                    Item.templateId = Item.templateId.substring(0, Item.templateId.length-3) + "T05"
                break;
            }
        }

        Item.attributes = {
            "clipSizeScale": 0,
            "loadedAmmo": 999,
            "level": Item.attributes.level || 1,
            "alterationDefinitions": Item.attributes.alterations || [],
            "baseClipSize": 999,
            "durability": 375,
            "itemSource": ""
        };

        profile.items[ID] = Item;

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        });

        Notifications.push({
            "type": "craftingResult",
            "primary": true,
            "itemsCrafted": [
                {
                    "itemType": profile.items[ID].templateId,
                    "itemGuid": ID,
                    "itemProfile": req.query.profileId || "theater0",
                    "attributes": {
                        "loadedAmmo": profile.items[ID].attributes.loadedAmmo,
                        "level": profile.items[ID].attributes.level,
                        "alterationDefinitions": profile.items[ID].attributes.alterationDefinitions,
                        "durability": profile.items[ID].attributes.durability
                    },
                    "quantity": profile.items[ID].quantity
                }
            ]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "theater0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "theater0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Destroy item STW
express.post("/fortnite/api/game/v2/profile/*/client/DestroyWorldItems", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "theater0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.itemIds) {
        for (var i = 0; i < req.body.itemIds.length; i++) {
            var id = req.body.itemIds[i];
            delete profile.items[id]

            ApplyProfileChanges.push({
                "changeType": "itemRemoved",
                "itemId": id
            })
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "theater0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "theater0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Disassemble items STW
express.post("/fortnite/api/game/v2/profile/*/client/DisassembleWorldItems", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "theater0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemIdAndQuantityPairs) {
        for (var i = 0; i < req.body.targetItemIdAndQuantityPairs.length; i++) {
            var id = req.body.targetItemIdAndQuantityPairs[i].itemId;
            var quantity = Number(req.body.targetItemIdAndQuantityPairs[i].quantity);
            var orig_quantity = Number(profile.items[id].quantity);

            if (quantity >= orig_quantity) {
                delete profile.items[id]

                ApplyProfileChanges.push({
                    "changeType": "itemRemoved",
                    "itemId": id
                })
            }

            if (quantity < orig_quantity) {
                profile.items[id].quantity -= quantity;

                ApplyProfileChanges.push({
                    "changeType": "itemQuantityChanged",
                    "itemId": id,
                    "quantity": profile.items[id].quantity
                })
            }
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "theater0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "theater0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Storage transfer STW
express.post("/fortnite/api/game/v2/profile/*/client/StorageTransfer", async (req, res) => {
    const theater0 = require("./profiles/theater0.json");
    const outpost0 = require("./profiles/outpost0.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var BaseRevision = theater0.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.transferOperations) {
        MultiUpdate.push({
            "profileRevision": outpost0.rvn || 0,
            "profileId": "outpost0",
            "profileChangesBaseRevision": outpost0.rvn || 0,
            "profileChanges": [],
            "profileCommandRevision": outpost0.commandRevision || 0,
        })

        for (var i = 0; i < req.body.transferOperations.length; i++) {
            if (req.body.transferOperations[i].toStorage == false) {
                let id = req.body.transferOperations[i].itemId;
                let body_quantity = Number(req.body.transferOperations[i].quantity);
                if (outpost0.items[id]) {
                    var outpost0_quantity = Number(outpost0.items[id].quantity);
                } else {
                    var outpost0_quantity = "Unknown";
                }
                if (theater0.items[id]) {
                    var theater0_quantity = Number(theater0.items[id].quantity);
                } else {
                    var theater0_quantity = "Unknown";
                }

                if (theater0.items[id] && outpost0.items[id]) {
                    if (outpost0_quantity > body_quantity) {
                        theater0.items[id].quantity += body_quantity;
                        outpost0.items[id].quantity -= body_quantity;

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        })
                    }

                    if (outpost0_quantity <= body_quantity) {
                        theater0.items[id].quantity += body_quantity;

                        delete outpost0.items[id]

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id
                        });
                    }
                }

                if (!theater0.items[id] && outpost0.items[id]) {
                    const Item = JSON.parse(JSON.stringify(outpost0.items[id]));

                    if (outpost0_quantity > body_quantity) {
                        outpost0.items[id].quantity -= body_quantity;

                        Item.quantity = body_quantity;

                        theater0.items[id] = Item;

                        ApplyProfileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        });
                    }

                    if (outpost0_quantity <= body_quantity) {
                        theater0.items[id] = Item;

                        delete outpost0.items[id]

                        ApplyProfileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id
                        })
                    }
                }
            }

            if (req.body.transferOperations[i].toStorage == true) {
                let id = req.body.transferOperations[i].itemId;
                let body_quantity = Number(req.body.transferOperations[i].quantity);
                if (outpost0.items[id]) {
                    var outpost0_quantity = Number(outpost0.items[id].quantity);
                } else {
                    var outpost0_quantity = "Unknown";
                }
                if (theater0.items[id]) {
                    var theater0_quantity = Number(theater0.items[id].quantity);
                } else {
                    var theater0_quantity = "Unknown";
                }

                if (outpost0.items[id] && theater0.items[id]) {
                    if (theater0_quantity > body_quantity) {
                        outpost0.items[id].quantity += body_quantity;
                        theater0.items[id].quantity -= body_quantity;

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        })
                    }

                    if (theater0_quantity <= body_quantity) {
                        outpost0.items[id].quantity += body_quantity;

                        delete theater0.items[id]

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        });

                        ApplyProfileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id
                        });
                    }
                }

                if (!outpost0.items[id] && theater0.items[id]) {
                    const Item = JSON.parse(JSON.stringify(theater0.items[id]));

                    if (theater0_quantity > body_quantity) {
                        theater0.items[id].quantity -= body_quantity;

                        Item.quantity = body_quantity;

                        outpost0.items[id] = Item;

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });
                    }

                    if (theater0_quantity <= body_quantity) {
                        outpost0.items[id] = Item;

                        delete theater0.items[id]

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        ApplyProfileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id,
                        })
                    }
                }
            }
        }

        StatChanged = true;
    }

    if (req.body.theaterToOutpostItems && req.body.outpostToTheaterItems) {
        MultiUpdate.push({
            "profileRevision": outpost0.rvn || 0,
            "profileId": "outpost0",
            "profileChangesBaseRevision": outpost0.rvn || 0,
            "profileChanges": [],
            "profileCommandRevision": outpost0.commandRevision || 0,
        })

        for (var i = 0; i < req.body.theaterToOutpostItems.length; i++) {
            let id = req.body.theaterToOutpostItems[i].itemId;
            let body_quantity = Number(req.body.theaterToOutpostItems[i].quantity);
            if (outpost0.items[id]) {
                var outpost0_quantity = Number(outpost0.items[id].quantity);
            } else {
                var outpost0_quantity = "Unknown";
            }
            if (theater0.items[id]) {
                var theater0_quantity = Number(theater0.items[id].quantity);
            } else {
                var theater0_quantity = "Unknown";
            }

            if (outpost0.items[id] && theater0.items[id]) {
                if (theater0_quantity > body_quantity) {
                    outpost0.items[id].quantity += body_quantity;
                    theater0.items[id].quantity -= body_quantity;

                    ApplyProfileChanges.push({
                        "changeType": "itemQuantityChanged",
                        "itemId": id,
                        "quantity": theater0.items[id].quantity
                    });

                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemQuantityChanged",
                        "itemId": id,
                        "quantity": outpost0.items[id].quantity
                    })
                }

                if (theater0_quantity <= body_quantity) {
                    outpost0.items[id].quantity += body_quantity;

                    delete theater0.items[id]

                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemQuantityChanged",
                        "itemId": id,
                        "quantity": outpost0.items[id].quantity
                    });

                    ApplyProfileChanges.push({
                        "changeType": "itemRemoved",
                        "itemId": id
                    });
                }
            }

            if (!outpost0.items[id] && theater0.items[id]) {
                const Item = JSON.parse(JSON.stringify(theater0.items[id]));

                if (theater0_quantity > body_quantity) {
                    theater0.items[id].quantity -= body_quantity;

                    Item.quantity = body_quantity;

                    outpost0.items[id] = Item;

                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemAdded",
                        "itemId": id,
                        "item": Item
                    })

                    ApplyProfileChanges.push({
                        "changeType": "itemQuantityChanged",
                        "itemId": id,
                        "quantity": theater0.items[id].quantity
                    });
                }

                if (theater0_quantity <= body_quantity) {
                    outpost0.items[id] = Item;

                    delete theater0.items[id]

                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemAdded",
                        "itemId": id,
                        "item": Item
                    })

                    ApplyProfileChanges.push({
                        "changeType": "itemRemoved",
                        "itemId": id,
                    })
                }
            }
        }

            for (var i = 0; i < req.body.outpostToTheaterItems.length; i++) {
                let id = req.body.outpostToTheaterItems[i].itemId;
                let body_quantity = Number(req.body.outpostToTheaterItems[i].quantity);
                if (outpost0.items[id]) {
                    var outpost0_quantity = Number(outpost0.items[id].quantity);
                } else {
                    var outpost0_quantity = "Unknown";
                }
                if (theater0.items[id]) {
                    var theater0_quantity = Number(theater0.items[id].quantity);
                } else {
                    var theater0_quantity = "Unknown";
                }

                if (theater0.items[id] && outpost0.items[id]) {
                    if (outpost0_quantity > body_quantity) {
                        theater0.items[id].quantity += body_quantity;
                        outpost0.items[id].quantity -= body_quantity;

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        })
                    }

                    if (outpost0_quantity <= body_quantity) {
                        theater0.items[id].quantity += body_quantity;

                        delete outpost0.items[id]

                        ApplyProfileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": theater0.items[id].quantity
                        });

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id
                        });
                    }
                }

                if (!theater0.items[id] && outpost0.items[id]) {
                    const Item = JSON.parse(JSON.stringify(outpost0.items[id]));

                    if (outpost0_quantity > body_quantity) {
                        outpost0.items[id].quantity -= body_quantity;

                        Item.quantity = body_quantity;

                        theater0.items[id] = Item;

                        ApplyProfileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemQuantityChanged",
                            "itemId": id,
                            "quantity": outpost0.items[id].quantity
                        });
                    }

                    if (outpost0_quantity <= body_quantity) {
                        theater0.items[id] = Item;

                        delete outpost0.items[id]

                        ApplyProfileChanges.push({
                            "changeType": "itemAdded",
                            "itemId": id,
                            "item": Item
                        })

                        MultiUpdate[0].profileChanges.push({
                            "changeType": "itemRemoved",
                            "itemId": id
                        })
                    }
                }
            }

        StatChanged = true;
    }

    if (StatChanged == true) {
        theater0.rvn += 1;
        theater0.commandRevision += 1;
        outpost0.rvn += 1;
        outpost0.commandRevision += 1;

        MultiUpdate[0].profileRevision = outpost0.rvn || 0;
        MultiUpdate[0].profileCommandRevision = outpost0.commandRevision || 0;

        fs.writeFileSync("./profiles/theater0.json", JSON.stringify(theater0, null, 2));
        fs.writeFileSync("./profiles/outpost0.json", JSON.stringify(outpost0, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": theater0
        }];
    }

    res.json({
        "profileRevision": theater0.rvn || 0,
        "profileId": "theater0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": theater0.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Modify quickbar STW
express.post("/fortnite/api/game/v2/profile/*/client/ModifyQuickbar", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "theater0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.primaryQuickbarChoices) {
        for (var i = 0; i < req.body.primaryQuickbarChoices.length; i++) {
            let a = i + 1;
            var value = [req.body.primaryQuickbarChoices[i].replace(/-/ig, "").toUpperCase()];
            if (req.body.primaryQuickbarChoices[i] == "") {
                value = [];
            }

            profile.stats.attributes.player_loadout.primaryQuickBarRecord.slots[a].items = value;
        }

        StatChanged = true;
    }

    if (typeof req.body.secondaryQuickbarChoice == "string") {
        var value = [req.body.secondaryQuickbarChoice.replace(/-/ig, "").toUpperCase()];
        if (req.body.secondaryQuickbarChoice == "") {
            value = [];
        }

        profile.stats.attributes.player_loadout.secondaryQuickBarRecord.slots[5].items = value;

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "player_loadout",
            "value": profile.stats.attributes.player_loadout
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "theater0"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "theater0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Hero equipping STW
express.post("/fortnite/api/game/v2/profile/*/client/AssignHeroToLoadout", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.loadoutId && req.body.slotName) {
        switch (req.body.slotName) {
            case "CommanderSlot":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot1.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot2.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot3.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot4.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot5.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = req.body.heroId || "";

                StatChanged = true;
            break;

            case "FollowerSlot1":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.commanderslot.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot2.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot3.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot4.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot5.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = req.body.heroId || "";

                StatChanged = true;
            break;

            case "FollowerSlot2":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot1.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.commanderslot.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot3.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot4.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot5.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = req.body.heroId || "";

                StatChanged = true;
            break;

            case "FollowerSlot3":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot1.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot2.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.commanderslot.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot4.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot5.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = req.body.heroId || "";

                StatChanged = true;
            break;

            case "FollowerSlot4":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot1.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot2.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot3.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.commanderslot.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot5.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = req.body.heroId || "";

                StatChanged = true;
            break;

            case "FollowerSlot5":
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot1.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot1 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot2.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot2 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot3.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot3 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.followerslot4.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.followerslot4 = "";
                }
                if (req.body.heroId.toLowerCase() == profile.items[req.body.loadoutId].attributes.crew_members.commanderslot.toLowerCase()) {
                    profile.items[req.body.loadoutId].attributes.crew_members.commanderslot = "";
                }

                profile.items[req.body.loadoutId].attributes.crew_members.followerslot5 = req.body.heroId || "";

                StatChanged = true;
            break;
        }
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "crew_members",
            "attributeValue": profile.items[req.body.loadoutId].attributes.crew_members
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Clear hero loadout STW
express.post("/fortnite/api/game/v2/profile/*/client/ClearHeroLoadout", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.loadoutId) {
        profile.items[req.body.loadoutId].attributes = {
            "team_perk": "",
            "loadout_name": profile.items[req.body.loadoutId].attributes.loadout_name,
            "crew_members": {
                "followerslot5": "",
                "followerslot4": "",
                "followerslot3": "",
                "followerslot2": "",
                "followerslot1": "",
                "commanderslot": profile.items[req.body.loadoutId].attributes.crew_members.commanderslot
            },
            "loadout_index": profile.items[req.body.loadoutId].attributes.loadout_index,
            "gadgets": [
                {
                    "gadget": "",
                    "slot_index": 0
                },
                {
                    "gadget": "",
                    "slot_index": 1
                }
            ]
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "team_perk",
            "attributeValue": profile.items[req.body.loadoutId].attributes.team_perk
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "crew_members",
            "attributeValue": profile.items[req.body.loadoutId].attributes.crew_members
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.loadoutId,
            "attributeName": "gadgets",
            "attributeValue": profile.items[req.body.loadoutId].attributes.gadgets
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Recycle items STW
express.post("/fortnite/api/game/v2/profile/*/client/RecycleItemBatch", async (req, res) => {
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;
    var ItemExists = false;

    if (req.body.targetItemIds) {
        for (var i = 0; i < req.body.targetItemIds.length; i++) {
            let id = req.body.targetItemIds[i];

            if (seasondata.season > 11 || seasondata.build == 11.30 || seasondata.build == 11.31 || seasondata.build == 11.40 || seasondata.build == 11.50) {
                var collection_book_profile = require("./profiles/collection_book_people0.json");

                if (profile.items[id].templateId.toLowerCase().startsWith("schematic:")) {
                    collection_book_profile = require("./profiles/collection_book_schematics0.json");
                }

                if (MultiUpdate.length == 0) {
                    MultiUpdate.push({
                        "profileRevision": collection_book_profile.rvn || 0,
                        "profileId": collection_book_profile.profileId || "collection_book_people0",
                        "profileChangesBaseRevision": collection_book_profile.rvn || 0,
                        "profileChanges": [],
                        "profileCommandRevision": collection_book_profile.commandRevision || 0,
                    })
                }

                for (var key in collection_book_profile.items) {
                    const Template1 = profile.items[id].templateId;
                    const Template2 = collection_book_profile.items[key].templateId;
                    if (Template1.substring(0, Template1.length - 4).toLowerCase() == Template2.substring(0, Template2.length - 4).toLowerCase()) {
                        if (Template1.toLowerCase().startsWith("worker:") && Template2.toLowerCase().startsWith("worker:")) {
                            if (profile.items[id].attributes.hasOwnProperty("personality") && collection_book_profile.items[key].attributes.hasOwnProperty("personality")) {
                                const Personality1 = profile.items[id].attributes.personality;
                                const Personality2 = collection_book_profile.items[key].attributes.personality;

                                if (Personality1.toLowerCase() == Personality2.toLowerCase()) {
                                    if (profile.items[id].attributes.level > collection_book_profile.items[key].attributes.level) {
                                        delete collection_book_profile.items[key];

                                        MultiUpdate[0].profileChanges.push({
                                            "changeType": "itemRemoved",
                                            "itemId": key
                                        })

                                        ItemExists = false;
                                    } else {
                                        ItemExists = true;
                                    }
                                }
                            }
                        } else {
                            if (profile.items[id].attributes.level > collection_book_profile.items[key].attributes.level) {
                                delete collection_book_profile.items[key];

                                MultiUpdate[0].profileChanges.push({
                                    "changeType": "itemRemoved",
                                    "itemId": key
                                })

                                ItemExists = false;
                            } else {
                                ItemExists = true;
                            }
                        }
                    }
                }

                if (ItemExists == false) {
                    collection_book_profile.items[id] = profile.items[id];
                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemAdded",
                        "itemId": id,
                        "item": collection_book_profile.items[id]
                    })

                    Notifications.push({
                        "type": "slotItemResult",
                        "primary": true,
                        "slottedItemId": id
                    })
                }

                delete profile.items[id];
                ApplyProfileChanges.push({
                    "changeType": "itemRemoved",
                    "itemId": id
                })

                collection_book_profile.rvn += 1;
                collection_book_profile.commandRevision += 1;

                MultiUpdate[0].profileRevision = collection_book_profile.rvn;
                MultiUpdate[0].profileCommandRevision = collection_book_profile.commandRevision;

                fs.writeFileSync(`./profiles/${collection_book_profile.profileId || "collection_book_people0"}.json`, JSON.stringify(collection_book_profile, null, 2));
            } else {
                delete profile.items[id];

                ApplyProfileChanges.push({
                    "changeType": "itemRemoved",
                    "itemId": id
                })
            }
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Add item from collection book STW
express.post("/fortnite/api/game/v2/profile/*/client/ResearchItemFromCollectionBook", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    const ID = makeid();

    if (req.body.templateId) {
        profile.items[ID] = {
            "templateId": req.body.templateId,
            "attributes": {
                "last_state_change_time": "2017-08-29T21:05:57.087Z",
                "max_level_bonus": 0,
                "level": 1,
                "item_seen": false,
                "xp": 0,
                "sent_new_notification": true,
                "favorite": false
            },
            "quantity": 1
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Slot item in collection book STW
express.post("/fortnite/api/game/v2/profile/*/client/SlotItemInCollectionBook", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var collection_book_profile = require("./profiles/collection_book_people0.json");

    if (profile.items[req.body.itemId].templateId.toLowerCase().startsWith("schematic:")) {
        collection_book_profile = require("./profiles/collection_book_schematics0.json");
    }

    if (req.body.itemId) {
        MultiUpdate.push({
            "profileRevision": collection_book_profile.rvn || 0,
            "profileId": collection_book_profile.profileId || "collection_book_people0",
            "profileChangesBaseRevision": collection_book_profile.rvn || 0,
            "profileChanges": [],
            "profileCommandRevision": collection_book_profile.commandRevision || 0,
        })

        for (var key in collection_book_profile.items) {
            const Template1 = profile.items[req.body.itemId].templateId;
            const Template2 = collection_book_profile.items[key].templateId;
            if (Template1.substring(0, Template1.length-4).toLowerCase() == Template2.substring(0, Template2.length-4).toLowerCase()) {
                if (Template1.toLowerCase().startsWith("worker:") && Template2.toLowerCase().startsWith("worker:")) {
                    if (profile.items[req.body.itemId].attributes.hasOwnProperty("personality") && collection_book_profile.items[key].attributes.hasOwnProperty("personality")) {
                        const Personality1 = profile.items[req.body.itemId].attributes.personality;
                        const Personality2 = collection_book_profile.items[key].attributes.personality;

                        if (Personality1.toLowerCase() == Personality2.toLowerCase()) {
                            delete collection_book_profile.items[key];

                            MultiUpdate[0].profileChanges.push({
                                "changeType": "itemRemoved",
                                "itemId": key
                            })
                        }
                    }
                } else {
                    delete collection_book_profile.items[key];

                    MultiUpdate[0].profileChanges.push({
                        "changeType": "itemRemoved",
                        "itemId": key
                    })
                }
            }
        }

        collection_book_profile.items[req.body.itemId] = profile.items[req.body.itemId];

        delete profile.items[req.body.itemId];

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;
        collection_book_profile.rvn += 1;
        collection_book_profile.commandRevision += 1;

        MultiUpdate[0].profileRevision = collection_book_profile.rvn || 0;
        MultiUpdate[0].profileCommandRevision = collection_book_profile.commandRevision || 0;

        ApplyProfileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.itemId
        })

        MultiUpdate[0].profileChanges.push({
            "changeType": "itemAdded",
            "itemId": req.body.itemId,
            "item": collection_book_profile.items[req.body.itemId]
        })

        Notifications.push({
            "type": "slotItemResult",
            "primary": true,
            "slottedItemId": req.body.itemId
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
        fs.writeFileSync(`./profiles/${collection_book_profile.profileId || "collection_book_people0"}.json`, JSON.stringify(collection_book_profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Unslot item from collection book STW
express.post("/fortnite/api/game/v2/profile/*/client/UnslotItemFromCollectionBook", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var collection_book_profile = require("./profiles/collection_book_people0.json");

    if (req.body.templateId.toLowerCase().startsWith("schematic:")) {
        collection_book_profile = require("./profiles/collection_book_schematics0.json");
    }

    const ID = makeid();

    MultiUpdate.push({
        "profileRevision": collection_book_profile.rvn || 0,
        "profileId": collection_book_profile.profileId || "collection_book_people0",
        "profileChangesBaseRevision": collection_book_profile.rvn || 0,
        "profileChanges": [],
        "profileCommandRevision": collection_book_profile.commandRevision || 0,
    })

    if (profile.items[req.body.itemId]) {
        profile.items[ID] = collection_book_profile.items[req.body.itemId];
        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": ID,
            "item": profile.items[ID]
        })

        delete collection_book_profile.items[req.body.itemId];
        MultiUpdate[0].profileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.itemId
        })

        StatChanged = true;
    }

    if (!profile.items[req.body.itemId]) {
        profile.items[req.body.itemId] = collection_book_profile.items[req.body.itemId];
        ApplyProfileChanges.push({
            "changeType": "itemAdded",
            "itemId": req.body.itemId,
            "item": profile.items[req.body.itemId]
        })

        delete collection_book_profile.items[req.body.itemId];
        MultiUpdate[0].profileChanges.push({
            "changeType": "itemRemoved",
            "itemId": req.body.itemId
        })

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;
        collection_book_profile.rvn += 1;
        collection_book_profile.commandRevision += 1;

        MultiUpdate[0].profileRevision = collection_book_profile.rvn || 0;
        MultiUpdate[0].profileCommandRevision = collection_book_profile.commandRevision || 0;

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
        fs.writeFileSync(`./profiles/${collection_book_profile.profileId || "collection_book_people0"}.json`, JSON.stringify(collection_book_profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Claim collection book rewards STW
express.post("/fortnite/api/game/v2/profile/*/client/ClaimCollectionBookRewards", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.requiredXp) {
        profile.stats.attributes.collection_book.maxBookXpLevelAchieved += 1;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "collection_book",
            "value": profile.stats.attributes.collection_book
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Modify schematic perk STW
express.post("/fortnite/api/game/v2/profile/*/client/RespecAlteration", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId && req.body.alterationId) {
        if (!profile.items[req.body.targetItemId].attributes.alterations) {
            profile.items[req.body.targetItemId].attributes.alterations = ["","","","","",""];
        }

        profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot] = req.body.alterationId;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "alterations",
            "attributeValue": profile.items[req.body.targetItemId].attributes.alterations
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Upgrade schematic perk STW
express.post("/fortnite/api/game/v2/profile/*/client/UpgradeAlteration", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        if (profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].toLowerCase().includes("t04")) {
            profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot] = profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].replace(/t04/ig, "T05");
        }

        if (profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].toLowerCase().includes("t03")) {
            profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot] = profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].replace(/t03/ig, "T04");
        }

        if (profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].toLowerCase().includes("t02")) {
            profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot] = profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].replace(/t02/ig, "T03");
        }

        if (profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].toLowerCase().includes("t01")) {
            profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot] = profile.items[req.body.targetItemId].attributes.alterations[req.body.alterationSlot].replace(/t01/ig, "T02");
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "alterations",
            "attributeValue": profile.items[req.body.targetItemId].attributes.alterations
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set active hero loadout STW
express.post("/fortnite/api/game/v2/profile/*/client/SetActiveHeroLoadout", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.selectedLoadout) {
        profile.stats.attributes.selected_hero_loadout = req.body.selectedLoadout;

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "selected_hero_loadout",
            "value": profile.stats.attributes.selected_hero_loadout
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Activate consumable STW
express.post("/fortnite/api/game/v2/profile/*/client/ActivateConsumable", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    var XPBoost;

    if (req.body.targetItemId) {
        profile.items[req.body.targetItemId].quantity -= 1;

        for (var key in profile.items) {
            if (profile.items[key].templateId == "Token:xpboost") {
                var randomNumber = Math.floor(Math.random() * 1250000);
                if (randomNumber < 1000000) {
                    randomNumber += 1000000
                }

                profile.items[key].quantity += randomNumber;

                XPBoost = key;
            }
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemQuantityChanged",
            "itemId": req.body.targetItemId,
            "quantity": profile.items[req.body.targetItemId].quantity
        })

        if (XPBoost) {
            ApplyProfileChanges.push({
                "changeType": "itemQuantityChanged",
                "itemId": XPBoost,
                "quantity": profile.items[XPBoost].quantity
            })
        }

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Unassign all squads STW
express.post("/fortnite/api/game/v2/profile/*/client/UnassignAllSquads", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.squadIds) {
        for (var i = 0; i < req.body.squadIds.length; i++) {
            let id = req.body.squadIds[i];

            for (var key in profile.items) {
                if (profile.items[key].attributes.hasOwnProperty('squad_id')) {
                    if (profile.items[key].attributes.squad_id.toLowerCase() == id.toLowerCase()) {
                        profile.items[key].attributes.squad_id = "";

                        ApplyProfileChanges.push({
                            "changeType": "itemAttrChanged",
                            "itemId": key,
                            "attributeName": "squad_id",
                            "attributeValue": profile.items[key].attributes.squad_id
                        })
                    }
                }
            }
        }

        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Open llama STW
express.post("/fortnite/api/game/v2/profile/*/client/OpenCardPack", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
    const ItemIDS = require("./responses/ItemIDS.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;

    if (req.body.cardPackItemId) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        Notifications.push({
            "type": "cardPackResult",
            "primary": true,
            "lootGranted": {
                "tierGroupName": profile.items[req.body.cardPackItemId].templateId.split(":")[1],
                "items": []
            },
            "displayLevel": 0
        })

        for (var i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random() * ItemIDS.length);
            const ID = makeid();

            ApplyProfileChanges.push({
                "changeType": "itemAdded",
                "itemId": ID,
                "item": {
                    "templateId": ItemIDS[randomNumber],
                    "attributes": {
                        "last_state_change_time": "2017-08-29T21:05:57.087Z",
                        "max_level_bonus": 0,
                        "level": 1,
                        "item_seen": false,
                        "alterations": [],
                        "xp": 0,
                        "sent_new_notification": true,
                        "favorite": false
                    },
                    "quantity": 1
                }
            })

            Notifications[0].lootGranted.items.push({
                "itemType": ItemIDS[randomNumber],
                "itemGuid": ID,
                "itemProfile": req.query.profileId,
                "attributes": {
                    "Alteration": {
                        "LootTierGroup": "AlterationTG.Trap.R",
                        "Tier": 0
                    }
                },
                "quantity": 1
            })

            profile.items[ID] = {
                "templateId": ItemIDS[randomNumber],
                "attributes": {
                    "last_state_change_time": "2017-08-29T21:05:57.087Z",
                    "max_level_bonus": 0,
                    "level": 1,
                    "item_seen": false,
                    "alterations": [],
                    "xp": 0,
                    "sent_new_notification": true,
                    "favorite": false
                },
                "quantity": 1
            }
        }

        if (profile.items[req.body.cardPackItemId].quantity == 1) {
            delete profile.items[req.body.cardPackItemId]

            ApplyProfileChanges.push({
                "changeType": "itemRemoved",
                "itemId": req.body.cardPackItemId
            })
        }

        if (true) {
            try {
                profile.items[req.body.cardPackItemId].quantity -= 1;

                ApplyProfileChanges.push({
                    "changeType": "itemQuantityChanged",
                    "itemId": req.body.cardPackItemId,
                    "quantity": profile.items[req.body.cardPackItemId].quantity
                })
            } catch (err) {}
        }

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Purchase item
express.post("/fortnite/api/game/v2/profile/*/client/PurchaseCatalogEntry", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);
    const campaign = require("./profiles/campaign.json");
    const athena = require("./profiles/athena.json");
    const ItemIDS = require("./responses/ItemIDS.json");

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var MultiUpdate = [];
    var Notifications = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var PurchasedLlama = false;
    var AthenaModified = false;
    var ItemExists = false;

    const ID = makeid();

    if (req.body.offerId && profile.profileId == "profile0" && PurchasedLlama == false) {
        catalog.storefronts.forEach(function(value, a) {
            if (value.name.toLowerCase().startsWith("cardpack")) {
                catalog.storefronts[a].catalogEntries.forEach(function(value, b) {
                    if (value.offerId == req.body.offerId) {
                        catalog.storefronts[a].catalogEntries[b].itemGrants.forEach(function(value, c) {
                            const Item = {
                                "templateId": value.templateId,
                                "attributes": {
                                    "is_loot_tier_overridden": false,
                                    "max_level_bonus": 0,
                                    "level": 1391,
                                    "pack_source": "Schedule",
                                    "item_seen": false,
                                    "xp": 0,
                                    "favorite": false,
                                    "override_loot_tier": 0
                                },
                                "quantity": 1
                            };

                            Item.quantity = req.body.purchaseQuantity || 1;

                            profile.items[ID] = Item

                            ApplyProfileChanges.push({
                                "changeType": "itemAdded",
                                "itemId": ID,
                                "item": Item
                            })
                        })
                    }
                })
            }
            if (value.name.startsWith("BR")) {
                catalog.storefronts[a].catalogEntries.forEach(function(value, b) {
                    if (value.offerId == req.body.offerId) {
                        catalog.storefronts[a].catalogEntries[b].itemGrants.forEach(function(value, c) {
                            const ID = value.templateId;

                            for (var key in athena.items) {
                                if (value.templateId.toLowerCase() == athena.items[key].templateId.toLowerCase()) {
                                    ItemExists = true;
                                }
                            }

                            if (ItemExists == false) {
                                if (MultiUpdate.length == 0) {
                                    MultiUpdate.push({
                                        "profileRevision": athena.rvn || 0,
                                        "profileId": "athena",
                                        "profileChangesBaseRevision": athena.rvn || 0,
                                        "profileChanges": [],
                                        "profileCommandRevision": athena.commandRevision || 0,
                                    })
                                }

                                if (Notifications.length == 0) {
                                    Notifications.push({
                                        "type": "CatalogPurchase",
                                        "primary": true,
                                        "lootResult": {
                                            "items": []
                                        }
                                    })
                                }

                                const Item = {
                                    "templateId": value.templateId,
                                    "attributes": {
                                        "max_level_bonus": 0,
                                        "level": 1,
                                        "item_seen": false,
                                        "xp": 0,
                                        "variants": [],
                                        "favorite": false
                                    },
                                    "quantity": 1
                                };

                                athena.items[ID] = Item;

                                MultiUpdate[0].profileChanges.push({
                                    "changeType": "itemAdded",
                                    "itemId": ID,
                                    "item": Item
                                })

                                Notifications[0].lootResult.items.push({
                                    "itemType": value.templateId,
                                    "itemGuid": ID,
                                    "itemProfile": "athena",
                                    "quantity": value.quantity
                                })

                                AthenaModified = true;
                            }

                            ItemExists = false;
                        })
                    }
                })
            }
        })

        PurchasedLlama = true;

        if (AthenaModified == true) {
            athena.rvn += 1;
            athena.commandRevision += 1;

            MultiUpdate[0].profileRevision = athena.rvn || 0;
            MultiUpdate[0].profileCommandRevision = athena.commandRevision || 0;

            fs.writeFileSync("./profiles/athena.json", JSON.stringify(athena, null, 2));
        }

        if (AthenaModified == false) {
            profile.rvn += 1;
            profile.commandRevision += 1;

            fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2));
        }
    }

    if (req.body.offerId && profile.profileId == "common_core") {
        catalog.storefronts.forEach(function(value, a) {
            if (value.name.toLowerCase().startsWith("cardpack")) {
                catalog.storefronts[a].catalogEntries.forEach(function(value, b) {
                    if (value.offerId == req.body.offerId) {
                        catalog.storefronts[a].catalogEntries[b].itemGrants.forEach(function(value, c) {
                            const seasonchecker = require("./seasonchecker.js");
                            const seasondata = require("./season.json");
                            seasonchecker(req, seasondata);

                            if (4 > seasondata.season || seasondata.season == 4 && PurchasedLlama == false) {
                                const Item = {
                                    "templateId": value.templateId,
                                    "attributes": {
                                        "is_loot_tier_overridden": false,
                                        "max_level_bonus": 0,
                                        "level": 1391,
                                        "pack_source": "Schedule",
                                        "item_seen": false,
                                        "xp": 0,
                                        "favorite": false,
                                        "override_loot_tier": 0
                                    },
                                    "quantity": 1
                                };

                                Item.quantity = req.body.purchaseQuantity || 1;

                                campaign.items[ID] = Item

                                MultiUpdate.push({
                                    "profileRevision": campaign.rvn || 0,
                                    "profileId": "campaign",
                                    "profileChangesBaseRevision": campaign.rvn || 0,
                                    "profileChanges": [{
                                        "changeType": "itemAdded",
                                        "itemId": ID,
                                        "item": Item
                                    }],
                                    "profileCommandRevision": campaign.commandRevision || 0,
                                })

                                PurchasedLlama = true;
                            }

                            if (seasondata.season == 5 || seasondata.season == 6 || seasondata.build == 7.00 || seasondata.build == 7.01 || seasondata.build == 7.10 || seasondata.build == 7.20 && PurchasedLlama == false) {
                                const Item = {
                                    "templateId": value.templateId,
                                    "attributes": {
                                        "is_loot_tier_overridden": false,
                                        "max_level_bonus": 0,
                                        "level": 1391,
                                        "pack_source": "Schedule",
                                        "item_seen": false,
                                        "xp": 0,
                                        "favorite": false,
                                        "override_loot_tier": 0
                                    },
                                    "quantity": 1
                                };

                                Item.quantity = req.body.purchaseQuantity || 1;

                                campaign.items[ID] = Item

                                MultiUpdate.push({
                                    "profileRevision": campaign.rvn || 0,
                                    "profileId": "campaign",
                                    "profileChangesBaseRevision": campaign.rvn || 0,
                                    "profileChanges": [{
                                        "changeType": "itemAdded",
                                        "itemId": ID,
                                        "item": Item
                                    }],
                                    "profileCommandRevision": campaign.commandRevision || 0,
                                });

                                Notifications.push({
                                    "type": "cardPackResult",
                                    "primary": true,
                                    "lootGranted": {
                                        "tierGroupName": campaign.items[ID].templateId.split(":")[1],
                                        "items": []
                                    },
                                    "displayLevel": 0
                                })

                                PurchasedLlama = true;
                            }

                            if (6 < seasondata.season && PurchasedLlama == false) {
                                const Item = {
                                    "templateId": value.templateId,
                                    "attributes": {
                                        "is_loot_tier_overridden": false,
                                        "max_level_bonus": 0,
                                        "level": 1391,
                                        "pack_source": "Schedule",
                                        "item_seen": false,
                                        "xp": 0,
                                        "favorite": false,
                                        "override_loot_tier": 0
                                    },
                                    "quantity": 1
                                };

                                Item.quantity = req.body.purchaseQuantity || 1;

                                campaign.items[ID] = Item

                                MultiUpdate.push({
                                    "profileRevision": campaign.rvn || 0,
                                    "profileId": "campaign",
                                    "profileChangesBaseRevision": campaign.rvn || 0,
                                    "profileChanges": [],
                                    "profileCommandRevision": campaign.commandRevision || 0,
                                });

                                MultiUpdate[0].profileChanges.push({
                                    "changeType": "itemAdded",
                                    "itemId": ID,
                                    "item": Item
                                })

                                Notifications.push({
                                    "type": "CatalogPurchase",
                                    "primary": true,
                                    "lootResult": {
                                        "items": []
                                    }
                                })

                                for (var i = 0; i < 10; i++) {
                                    const randomNumber = Math.floor(Math.random() * ItemIDS.length);
                                    const id = makeid();

                                    MultiUpdate[0].profileChanges.push({
                                        "changeType": "itemAdded",
                                        "itemId": id,
                                        "item": {
                                            "templateId": ItemIDS[randomNumber],
                                            "attributes": {
                                                "last_state_change_time": "2017-08-29T21:05:57.087Z",
                                                "max_level_bonus": 0,
                                                "level": 1,
                                                "item_seen": false,
                                                "alterations": [],
                                                "xp": 0,
                                                "sent_new_notification": true,
                                                "favorite": false
                                            },
                                            "quantity": 1
                                        }
                                    })

                                    Notifications[0].lootResult.items.push({
                                        "itemType": ItemIDS[randomNumber],
                                        "itemGuid": id,
                                        "itemProfile": "campaign",
                                        "attributes": {},
                                        "quantity": 1
                                    })

                                    campaign.items[id] = {
                                        "templateId": ItemIDS[randomNumber],
                                        "attributes": {
                                            "last_state_change_time": "2017-08-29T21:05:57.087Z",
                                            "max_level_bonus": 0,
                                            "level": 1,
                                            "item_seen": false,
                                            "alterations": [],
                                            "xp": 0,
                                            "sent_new_notification": true,
                                            "favorite": false
                                        },
                                        "quantity": 1
                                    }
                                }

                                if (campaign.items[ID].quantity == 1) {
                                    delete campaign.items[ID]

                                    MultiUpdate[0].profileChanges.push({
                                        "changeType": "itemRemoved",
                                        "itemId": ID
                                    })
                                }

                                if (true) {
                                    try {
                                        campaign.items[ID].quantity -= 1;

                                        MultiUpdate[0].profileChanges.push({
                                            "changeType": "itemQuantityChanged",
                                            "itemId": ID,
                                            "quantity": campaign.items[ID].quantity
                                        })
                                    } catch (err) {}
                                }

                                PurchasedLlama = true;
                            }
                        })
                    }
                })
            }
            if (value.name.startsWith("BR")) {
                catalog.storefronts[a].catalogEntries.forEach(function(value, b) {
                    if (value.offerId == req.body.offerId) {
                        catalog.storefronts[a].catalogEntries[b].itemGrants.forEach(function(value, c) {
                            const ID = value.templateId;

                            for (var key in athena.items) {
                                if (value.templateId.toLowerCase() == athena.items[key].templateId.toLowerCase()) {
                                    ItemExists = true;
                                }
                            }

                            if (ItemExists == false) {
                                if (MultiUpdate.length == 0) {
                                    MultiUpdate.push({
                                        "profileRevision": athena.rvn || 0,
                                        "profileId": "athena",
                                        "profileChangesBaseRevision": athena.rvn || 0,
                                        "profileChanges": [],
                                        "profileCommandRevision": athena.commandRevision || 0,
                                    })
                                }

                                if (Notifications.length == 0) {
                                    Notifications.push({
                                        "type": "CatalogPurchase",
                                        "primary": true,
                                        "lootResult": {
                                            "items": []
                                        }
                                    })
                                }

                                const Item = {
                                    "templateId": value.templateId,
                                    "attributes": {
                                        "max_level_bonus": 0,
                                        "level": 1,
                                        "item_seen": false,
                                        "xp": 0,
                                        "variants": [],
                                        "favorite": false
                                    },
                                    "quantity": 1
                                };

                                athena.items[ID] = Item;

                                MultiUpdate[0].profileChanges.push({
                                    "changeType": "itemAdded",
                                    "itemId": ID,
                                    "item": Item
                                })

                                Notifications[0].lootResult.items.push({
                                    "itemType": value.templateId,
                                    "itemGuid": ID,
                                    "itemProfile": "athena",
                                    "quantity": value.quantity
                                })

                                AthenaModified = true;
                            }

                            ItemExists = false;
                        })
                    }
                })
            }
        })

        if (AthenaModified == true) {
            athena.rvn += 1;
            athena.commandRevision += 1;

            MultiUpdate[0].profileRevision = athena.rvn || 0;
            MultiUpdate[0].profileCommandRevision = athena.commandRevision || 0;

            fs.writeFileSync("./profiles/athena.json", JSON.stringify(athena, null, 2));
        }

        if (AthenaModified == false) {
            campaign.rvn += 1;
            campaign.commandRevision += 1;

            MultiUpdate[0].profileRevision = campaign.rvn || 0;
            MultiUpdate[0].profileCommandRevision = campaign.commandRevision || 0;

            fs.writeFileSync("./profiles/campaign.json", JSON.stringify(campaign, null, 2));
        }
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "profile0",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "notifications": Notifications,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "multiUpdate": MultiUpdate,
        "responseVersion": 1
    })
    res.end();
});

// Set multiple items favorite
express.post("/fortnite/api/game/v2/profile/*/client/SetItemFavoriteStatusBatch", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
        if (seasondata.season == 2) {
            profile.stats.attributes.book_level = 70;
        } else {
            profile.stats.attributes.book_level = 100;
        }
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.itemIds) {
        for (var i = 0; i < req.body.itemIds.length; i++) {
            profile.items[req.body.itemIds[i]].attributes.favorite = req.body.itemFavStatus[i] || false;

            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.itemIds[i],
                "attributeName": "favorite",
                "attributeValue": profile.items[req.body.itemIds[i]].attributes.favorite
            })
        }
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set favorite on item
express.post("/fortnite/api/game/v2/profile/*/client/SetItemFavoriteStatus", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
        if (seasondata.season == 2) {
            profile.stats.attributes.book_level = 70;
        } else {
            profile.stats.attributes.book_level = 100;
        }
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.targetItemId) {
        profile.items[req.body.targetItemId].attributes.favorite = req.body.bFavorite || false;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.targetItemId,
            "attributeName": "favorite",
            "attributeValue": profile.items[req.body.targetItemId].attributes.favorite
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Mark item as seen
express.post("/fortnite/api/game/v2/profile/*/client/MarkItemSeen", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
        if (seasondata.season == 2) {
            profile.stats.attributes.book_level = 70;
        } else {
            profile.stats.attributes.book_level = 100;
        }
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.itemIds) {
        for (var i = 0; i < req.body.itemIds.length; i++) {
            profile.items[req.body.itemIds[i]].attributes.item_seen = true;

            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.itemIds[i],
                "attributeName": "item_seen",
                "attributeValue": profile.items[req.body.itemIds[i]].attributes.item_seen
            })
        }
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Equip BR Locker 1
express.post("/fortnite/api/game/v2/profile/*/client/EquipBattleRoyaleCustomization", async (req, res) => {
    const profile = require("./profiles/athena.json");
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
    profile.stats.attributes.season_num = seasondata.season;
    if (seasondata.season == 2) {
	    profile.stats.attributes.book_level = 70;
    } else {
	    profile.stats.attributes.book_level = 100;
    }
	
    try {
        if (!profile.stats.attributes.favorite_dance) {
            profile.stats.attributes.favorite_dance = ["","","","","",""];
        }
        if (!profile.stats.attributes.favorite_itemwraps) {
            profile.stats.attributes.favorite_itemwraps = ["","","","","","",""];
        }
    } catch (err) {}

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;
    var VariantChanged = false;

    try {
        const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])

        if (ReturnVariantsAsString.includes("active")) {
            if (profile.items[req.body.itemToSlot].attributes.variants.length == 0) {
                profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
            }
            for (var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) {
                profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
            }
            VariantChanged = true;
        }
    } catch (err) {}

    if (req.body.slotName) {

        switch (req.body.slotName) {

            case "Character":
                profile.stats.attributes.favorite_character = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "Backpack":
                profile.stats.attributes.favorite_backpack = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "Pickaxe":
                profile.stats.attributes.favorite_pickaxe = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "Glider":
                profile.stats.attributes.favorite_glider = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "SkyDiveContrail":
                profile.stats.attributes.favorite_skydivecontrail = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "MusicPack":
                profile.stats.attributes.favorite_musicpack = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "LoadingScreen":
                profile.stats.attributes.favorite_loadingscreen = req.body.itemToSlot || "";
                StatChanged = true;
                break;

            case "Dance":
                var indexwithinslot = req.body.indexWithinSlot || 0;

                if (Math.sign(indexwithinslot) == 1 || Math.sign(indexwithinslot) == 0) {
                    profile.stats.attributes.favorite_dance[indexwithinslot] = req.body.itemToSlot || "";
                }

                StatChanged = true;
                break;

            case "ItemWrap":
                var indexwithinslot = req.body.indexWithinSlot || 0;

                switch (Math.sign(indexwithinslot)) {

                    case 0:
                        profile.stats.attributes.favorite_itemwraps[indexwithinslot] = req.body.itemToSlot || "";
                        break;

                    case 1:
                        profile.stats.attributes.favorite_itemwraps[indexwithinslot] = req.body.itemToSlot || "";
                        break;

                    case -1:
                        for (var i = 0; i < profile.stats.attributes.favorite_itemwraps.length; i++) {
                            profile.stats.attributes.favorite_itemwraps[i] = req.body.itemToSlot || "";
                        }
                        break;

                }

                StatChanged = true;
                break;

        }

    }

    if (StatChanged == true) {
        var Category = (`favorite_${req.body.slotName || "character"}`).toLowerCase()

        if (Category == "favorite_itemwrap") {
            Category += "s"
        }

        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": Category,
            "value": profile.stats.attributes[Category]
        })

        if (VariantChanged == true) {
            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.itemToSlot,
                "attributeName": "variants",
                "attributeValue": profile.items[req.body.itemToSlot].attributes.variants
            })
        }
        fs.writeFileSync("./profiles/athena.json", JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set BR Banner 1
express.post("/fortnite/api/game/v2/profile/*/client/SetBattleRoyaleBanner", async (req, res) => {
    const profile = require("./profiles/athena.json");
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
    profile.stats.attributes.season_num = seasondata.season;
    if (seasondata.season == 2) {
	    profile.stats.attributes.book_level = 70;
    } else {
	    profile.stats.attributes.book_level = 100;
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.homebaseBannerIconId && req.body.homebaseBannerColorId) {
        profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId;
        profile.stats.attributes.banner_color = req.body.homebaseBannerColorId;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "banner_icon",
            "value": profile.stats.attributes.banner_icon
        })

        ApplyProfileChanges.push({
            "changeType": "statModified",
            "name": "banner_color",
            "value": profile.stats.attributes.banner_color
        })

        fs.writeFileSync("./profiles/athena.json", JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set BR Banner 2
express.post("/fortnite/api/game/v2/profile/*/client/SetCosmeticLockerBanner", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
	if (seasondata.season == 2) {
		profile.stats.attributes.book_level = 70;
	} else {
		profile.stats.attributes.book_level = 100;
	}
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.bannerIconTemplateName && req.body.bannerColorTemplateName && req.body.lockerItem) {
        profile.items[req.body.lockerItem].attributes.banner_icon_template = req.body.bannerIconTemplateName;
        profile.items[req.body.lockerItem].attributes.banner_color_template = req.body.bannerColorTemplateName;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.lockerItem,
            "attributeName": "banner_icon_template",
            "attributeValue": profile.items[req.body.lockerItem].attributes.banner_icon_template
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.lockerItem,
            "attributeName": "banner_color_template",
            "attributeValue": profile.items[req.body.lockerItem].attributes.banner_color_template
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set BR Locker 2
express.post("/fortnite/api/game/v2/profile/*/client/SetCosmeticLockerSlot", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
        if (seasondata.season == 2) {
            profile.stats.attributes.book_level = 70;
        } else {
            profile.stats.attributes.book_level = 100;
        }
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    try {
        const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])

        if (ReturnVariantsAsString.includes("active")) {
            var new_variants = [
                {
                    "variants": []
                }
            ];

            if (profile.profileId == "athena") {
                if (profile.items[req.body.itemToSlot].attributes.variants.length == 0) {
                    profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
                }
                for (var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) {
                    profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
                }
            }

            for (var i = 0; i < req.body.variantUpdates.length; i++) {
                new_variants[0].variants.push({
                    "channel": req.body.variantUpdates[i].channel,
                    "active": req.body.variantUpdates[i].active
                })

                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots[req.body.category].activeVariants = new_variants;
            }
        }
    } catch (err) {}

    if (req.body.category && req.body.lockerItem) {

        switch (req.body.category) {

            case "Character":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Character.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "Backpack":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Backpack.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "Pickaxe":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Pickaxe.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "Glider":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Glider.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "SkyDiveContrail":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.SkyDiveContrail.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "MusicPack":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.MusicPack.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "LoadingScreen":
                profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.LoadingScreen.items = [req.body.itemToSlot || ""];
                StatChanged = true;
                break;

            case "Dance":
                var indexwithinslot = req.body.slotIndex || 0;

                if (Math.sign(indexwithinslot) == 1 || Math.sign(indexwithinslot) == 0) {
                    profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[indexwithinslot] = req.body.itemToSlot || "";
                }

                StatChanged = true;
                break;

            case "ItemWrap":
                var indexwithinslot = req.body.slotIndex || 0;

                switch (Math.sign(indexwithinslot)) {

                    case 0:
                        profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[indexwithinslot] = req.body.itemToSlot || "";
                        break;

                    case 1:
                        profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[indexwithinslot] = req.body.itemToSlot || "";
                        break;

                    case -1:
                        for (var i = 0; i < profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items.length; i++) {
                            profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[i] = req.body.itemToSlot || "";
                        }
                        break;

                }

                StatChanged = true;
                break;

        }

    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.lockerItem,
            "attributeName": "locker_slots_data",
            "attributeValue": profile.items[req.body.lockerItem].attributes.locker_slots_data
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// Set hero variants STW
express.post("/fortnite/api/game/v2/profile/*/client/SetHeroCosmeticVariants", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;

    if (req.body.outfitVariants && req.body.backblingVariants && req.body.heroItem) {
        profile.items[req.body.heroItem].attributes.outfitvariants = req.body.outfitVariants;
        profile.items[req.body.heroItem].attributes.backblingvariants = req.body.backblingVariants;
        StatChanged = true;
    }

    if (StatChanged == true) {
        profile.rvn += 1;
        profile.commandRevision += 1;

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.heroItem,
            "attributeName": "outfitvariants",
            "attributeValue": profile.items[req.body.heroItem].attributes.outfitvariants
        })

        ApplyProfileChanges.push({
            "changeType": "itemAttrChanged",
            "itemId": req.body.heroItem,
            "attributeName": "backblingvariants",
            "attributeValue": profile.items[req.body.heroItem].attributes.backblingvariants
        })

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2));
    }

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "campaign",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// any mcp request that doesn't have something assigned to it
express.post("/fortnite/api/game/v2/profile/*/client/*", async (req, res) => {
    const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

    if (profile.profileId == "athena") {
        const seasonchecker = require("./seasonchecker.js");
        const seasondata = require("./season.json");
        seasonchecker(req, seasondata);
        profile.stats.attributes.season_num = seasondata.season;
        if (seasondata.season == 2) {
            profile.stats.attributes.book_level = 70;
        } else {
            profile.stats.attributes.book_level = 100;
        }
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;

    // this doesn't work properly on version v12.20 and above but whatever
    if (QueryRevision != BaseRevision) {
        ApplyProfileChanges = [{
            "changeType": "fullProfileUpdate",
            "profile": profile
        }];
    }

    res.json({
        "profileRevision": profile.rvn || 0,
        "profileId": req.query.profileId || "athena",
        "profileChangesBaseRevision": BaseRevision,
        "profileChanges": ApplyProfileChanges,
        "profileCommandRevision": profile.commandRevision || 0,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    })
    res.end();
});

// keep this at the end of the code thanks
express.all("*", async (req, res) => {
    var XEpicErrorName = "errors.com.lawinserver.common.not_found";
    var XEpicErrorCode = 1004;

    res.set({
        'X-Epic-Error-Name': XEpicErrorName,
        'X-Epic-Error-Code': XEpicErrorCode
    });

    res.status(404);
    res.json({
        "errorCode": XEpicErrorName,
        "errorMessage": "Sorry the resource you were trying to find could not be found",
        "numericErrorCode": XEpicErrorCode,
        "originatingService": "any",
        "intent": "prod"
    });
    res.end();
});

function getItemShop() {
    const catalog = JSON.parse(JSON.stringify(require("./responses/catalog.json")));
    const CatalogConfig = require("./catalog_config.json");

    try {
        for (var value in CatalogConfig) {
            if (typeof CatalogConfig[value] == "string") {
                if (CatalogConfig[value].length != 0) {
                    const CatalogEntry = {"devName":"","offerId":"","fulfillmentIds":[],"dailyLimit":-1,"weeklyLimit":-1,"monthlyLimit":-1,"categories":[],"prices":[{"currencyType":"MtxCurrency","currencySubType":"","regularPrice":0,"finalPrice":0,"saleExpiration":"9999-12-02T01:12:00Z","basePrice":0}],"matchFilter":"","filterWeight":0,"appStoreId":[],"requirements":[{"requirementType":"DenyOnItemOwnership","requiredId":"","minQuantity":1}],"offerType":"StaticPrice","giftInfo":{"bIsEnabled":false,"forcedGiftBoxTemplateId":"","purchaseRequirements":[],"giftRecordIds":[]},"refundable":true,"metaInfo":[],"displayAssetPath":"","itemGrants":[{"templateId":"","quantity":1}],"sortPriority":0,"catalogGroupPriority":0};

                    if (value.toLowerCase().startsWith("daily")) {
                        catalog.storefronts.forEach((storefront, i) => {
                            if (storefront.name == "BRDailyStorefront") {
                                CatalogEntry.devName = CatalogConfig[value]
                                CatalogEntry.offerId = CatalogConfig[value]
                                CatalogEntry.requirements[0].requiredId = CatalogConfig[value]
                                CatalogEntry.itemGrants[0].templateId = CatalogConfig[value]

                                catalog.storefronts[i].catalogEntries.push(CatalogEntry);
                            }
                        })
                    }

                    if (value.toLowerCase().startsWith("featured")) {
                        catalog.storefronts.forEach((storefront, i) => {
                            if (storefront.name == "BRWeeklyStorefront") {
                                CatalogEntry.devName = CatalogConfig[value]
                                CatalogEntry.offerId = CatalogConfig[value]
                                CatalogEntry.requirements[0].requiredId = CatalogConfig[value]
                                CatalogEntry.itemGrants[0].templateId = CatalogConfig[value]

                                catalog.storefronts[i].catalogEntries.push(CatalogEntry);
                            }
                        })
                    }

                }
            }
        }
    } catch (err) {}

    return catalog;
}

function getTheater(req) {
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    var theater = JSON.stringify(require("./responses/worldstw.json"));

    try {
        if (seasondata.season >= 16 || seasondata.build == 15.30 || seasondata.build == 15.40 || seasondata.build == 15.50) {
            theater = theater.replace(/\/Game\//ig, "\/SaveTheWorld\/");
        }
    } catch (err) {}

    theater = JSON.parse(theater)

    return theater;
}

function getContentPages(req) {
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);

    const contentpages = JSON.parse(JSON.stringify(require("./responses/contentpages.json")));

    var Language = "en";

    if (req.headers["accept-language"]) {
        if (req.headers["accept-language"].includes("-") && req.headers["accept-language"] != "es-419") {
            Language = req.headers["accept-language"].split("-")[0];
        } else {
            Language = req.headers["accept-language"];
        }
    }

    const modes = ["saveTheWorldUnowned", "battleRoyale", "creative", "saveTheWorld"];
    const news = ["savetheworldnews", "battleroyalenews"]

    try {
        modes.forEach(mode => {
            contentpages.subgameselectdata[mode].message.title = contentpages.subgameselectdata[mode].message.title[Language]
            contentpages.subgameselectdata[mode].message.body = contentpages.subgameselectdata[mode].message.body[Language]
        })
    } catch (err) {}

    try {
        if (seasondata.season < 5 || (seasondata.season == 5 && Number(seasondata.build.toString().split(".")[1]) < 30)) { 
            news.forEach(mode => {
                contentpages[mode].news.messages[0].image = "https://cdn.discordapp.com/attachments/927739901540188200/930879507496308736/discord.png";
                contentpages[mode].news.messages[1].image = "https://cdn.discordapp.com/attachments/927739901540188200/930879519882088508/lawin.png";
            })
        }
    } catch (err) {}

    try {
        contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = `season${seasondata.season}`;
        contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = `season${seasondata.season}`;

        if (seasondata.season == 10) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "seasonx";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "seasonx";
        }

        if (seasondata.build == 11.31 || seasondata.build == 11.40) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "Winter19";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "Winter19";
        }

        if (seasondata.build == 19.01) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "winter2021";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn.discordapp.com/attachments/927739901540188200/930880158167085116/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
            contentpages.subgameinfo.battleroyale.image = "https://cdn.discordapp.com/attachments/927739901540188200/930880421514846268/19br-wf-subgame-select-512x1024-16d8bb0f218f.jpg";
            contentpages.specialoffervideo.bSpecialOfferEnabled = "true";
        }
    } catch (err) {}

    return contentpages;
}

function makeid() {
    let CurrentDate = (new Date()).valueOf().toString();
    let RandomFloat = Math.random().toString();
    let ID = crypto.createHash('md5').update(CurrentDate + RandomFloat).digest('hex');
    let FinishedID = ID.slice(0, 8) + "-" + ID.slice(8, 12) + "-" + ID.slice(12, 16) + "-" + ID.slice(16, 20) + "-" + ID.slice(20, 32);
    return FinishedID;
}
