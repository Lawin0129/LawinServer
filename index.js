const Express = require("express");
const express = Express();
const fs = require("fs");
const moment = require("moment");
const worldstw = require("./responses/worldstw.json");
const friendslist = require("./responses/friendslist.json");
const friendslist2 = require("./responses/friendslist2.json");
const Keychain = require("./responses/keychain.json");
const catalog = require("./responses/catalog.json");
const contentpages = require("./responses/contentpages.json");
const path = require("path");
const port = process.env.PORT || 5595;
const crypto = require("crypto");

express.use(Express.json());
express.use(Express.urlencoded({extended: true}));

express.use(Express.static('public'));

express.listen(port, console.log("Started listening on port", port));

express.get("/", async (req, res) => {
    res.sendFile('index.html');
})

express.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
    res.json(catalog);
    res.status(200);
    res.end();
});

express.get("/purchase", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.post("/fortnite/api/feedback/Bug", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
})

express.post("/fortnite/api/game/v2/tryPlayOnPlatform/account/*", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(true);
    res.end();
})

express.post("/fortnite/api/game/v2/grant_access/*", async (req, res) => {
    res.json({});
    res.status(204);
    res.end();
})

express.post("/api/v1/user/setting", async (req, res) => {
    res.json([]);
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
})

express.get("/affiliate/api/public/affiliates/slug/:slug", async (req, res) => {
    if (req.params.slug.toLowerCase() == "lawin") {
        return res.status(200).json({
            "id": "Lawin",
            "slug": "lawin",
            "displayName": "Lawin",
            "status": "ACTIVE",
            "verified": false
        });
    }
    res.status(404);
    res.json({});
})

express.get("/party/api/v1/Fortnite/user/*", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.post("/party/api/v1/Fortnite/user/*/pings/*", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.get("/catalog/api/shared/bulk/offers", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/events/tournamentandhistory/*/EU/WindowsClient", async (req, res) => {
    res.json({});
    res.status(200);
    res.end();
})

express.get("/fortnite/api/matchmaking/session/findPlayer/*", async (req, res) => {
    res.json();
    res.status(200);
    res.end();
})

express.get("/fortnite/api/statsv2/account/*", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/enabled_features", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/api/v1/events/Fortnite/download/*", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/privacy/account/*", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
    console.log("User logged in.")
})

express.get("/fortnite/api/v2/versioncheck/*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
    res.status(200);
    res.end();
})

express.get("/fortnite/api/v2/versioncheck*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
    res.status(200);
    res.end();
})

express.get("/fortnite/api/versioncheck*", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    })
    res.status(200);
    res.end();
})

express.get("/eulatracking/api/shared/agreements/fn*", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/friendcodes/*/epic", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/account/api/epicdomains/ssodomains", async (req, res) => {
    res.json({})
    res.status(204);
    res.end();
})

express.get("/fortnite/api/game/v2/matchmakingservice/ticket/player/*", async (req, res) => {
    res.json({
        "serviceUrl": "ws://127.0.0.1:443",
        "ticketType": "mms-player",
        "payload": "69=",
        "signature": "420="
    })
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "sessionId": req.params.sessionId,
        "key": "AOJEv8uTFmUh7XM2328kq9rlAzeQ5xzWzPIiyKn2s7s="
    })
    res.status(200);
    res.end();
})

express.post("/fortnite/api/matchmaking/session/matchMakingRequest", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/account/api/public/account/*/externalAuths", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/fortnite/api/game/v2/twitch/*", async (req, res) => {
    res.json();
    res.status(200);
    res.end();
})

express.get("/fortnite/api/stats/accountId/*/bulk/window/alltime", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
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
    res.status(200);
    res.end();
})

express.get("/friends/api/v1/*/settings", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
})

express.get("/friends/api/v1/*/blocklist", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/presence/api/v1/_/*/last-online", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
})

express.get("/fortnite/api/receipts/v1/account/*/receipts", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/fortnite/api/cloudstorage/system", async (req, res) => {
    let response = [];

    fs.readdirSync(`${__dirname}/CloudStorage`).forEach(file => {
        response.push({
            uniqueFilename: file,
            filename: file,
            hash: crypto.createHash("sha1").update(fs.readFileSync(`${__dirname}/CloudStorage/${file}`)).digest("hex"),
            hash256: crypto.createHash("sha256").update(fs.readFileSync(`${__dirname}/CloudStorage/${file}`)).digest("hex"),
            length: file.length,
            contentType: "application/octet-stream",
            uploaded: fs.statSync(`${__dirname}/CloudStorage/${file}`).mtime,
            storageType: "S3",
            doNotCache: false
        });
    });

    res.json(response);
    res.status(200);
    res.end();
});

express.get("/fortnite/api/cloudstorage/system/:fileName", (req, res) => {
    if (fs.existsSync(`${__dirname}/CloudStorage/${req.params.fileName}`)) {
        res.sendFile(path.join(__dirname, `/CloudStorage/${req.params.fileName}`));
    } else {
        res.status(404);
        res.end();
    }
});

express.get("/fortnite/api/cloudstorage/user/*", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/fortnite/api/cloudstorage/user/*/*", async (req, res) => {
    res.json([])
    res.status(204);
    res.end();
})

express.get("/fortnite/api/game/v2/leaderboards/cohort/*", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
})

express.get("/friends/api/public/list/fortnite/*/recentPlayers", async (req, res) => {
    res.json([])
    res.status(200);
    res.end();
})

express.get("/friends/api/public/friends/*", async (req, res) => {
    res.json(friendslist)
    res.status(200);
    res.end();
})

express.get("/friends/api/v1/*/summary", async (req, res) => {
    res.json(friendslist2)
    res.status(200);
    res.end();
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
			"eventType": "EventFlag.Season9",
			"activeUntil": "9999-01-01T00:00:00.000Z",
			"activeSince": "2020-01-01T00:00:00.000Z"
		},
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

    res.json({
        "channels": {
            "client-matchmaking": {
                "states": [{
                    "validFrom": "2020-01-01T20:28:47.830Z",
                    "activeEvents": [],
                    "state": {
                        "region": {
                            "OCE": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "CN": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "NAE": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "NAW": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "EU": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "BR": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "ASIA": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            },
                            "NA": {
                                "eventFlagsForcedOn": [
                                    "Playlist_DefaultDuo"
                                ]
                            }
                        }
                    }
                }],
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
        "currentTime": "2020-01-01T18:13:41.770Z"
    });
    res.status(200);
    res.end();
})

express.get("/friends/api/public/blocklist/*", async (req, res) => {
    res.json({
        "blockedUsers": []
    })
    res.status(200);
    res.end();
})

express.get("/content/api/pages/fortnite-game", async (req, res) => {
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
	
	contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = `season${seasondata.season}`;
	contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = `season${seasondata.season}`;

	if (seasondata.season == 10) {
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "seasonx";
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "seasonx";
	}

    res.json(contentpages)
    res.status(200);
    res.end();
})

express.put("/fortnite/api/cloudstorage/user/*/*", async (req, res) => {
    res.status(204);
    res.end();
})

express.get("/fortnite/api/game/v2/world/info", async (req, res) => {
    res.json(worldstw)
    res.status(200);
    res.end();
})

express.get("/fortnite/api/storefront/v2/keychain", async (req, res) => {
    res.json(Keychain)
    res.status(200);
    res.end();
})

express.get("/account/api/oauth/verify", async (req, res) => {
    res.json({})
    res.status(200);
    res.end();
})

express.post("/datarouter/api/v1/public/data", async (req, res) => {
    res.json();
    res.status(204);
    res.end();
})

express.post("/account/api/oauth/token", async (req, res) => {
    if (req.body.grant_type.toLowerCase() != "password") {
        return res.json({
            "access_token": "lawinstokenlol",
            "expires_in": 28800,
            "expires_at": "9999-12-02T01:12:01.100Z",
            "token_type": "bearer",
            "refresh_token": "lawinstokenlol",
            "refresh_expires": 86400,
            "refresh_expires_at": "9999-12-02T01:12:01.100Z",
            "account_id": "DeezNuts",
            "client_id": "lawinsclientidlol",
            "internal_client": true,
            "client_service": "fortnite",
            "displayName": "DeezNuts",
            "app": "fortnite",
            "in_app_id": "DeezNuts",
            "device_id": "lawinsdeviceidlol"
        })
    }

    var name = req.body.username.split("@")[0]
    res.json({
        "access_token": "lawinstokenlol",
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "token_type": "bearer",
        "refresh_token": "lawinstokenlol",
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-02T01:12:01.100Z",
        "account_id": name || "Invalid",
        "client_id": "lawinsclientidlol",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": name || "Invalid",
        "app": "fortnite",
        "in_app_id": name || "Invalid",
        "device_id": "lawinsdeviceidlol"
    })
    res.status(200);
    res.end();
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

    if (req.body.affiliateName.toLowerCase() == "lawin") {
        profile.stats.attributes.mtx_affiliate_set_time = new Date().toISOString();
        profile.stats.attributes.mtx_affiliate = req.body.affiliateName;
        StatChanged = true;
    }

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

        fs.writeFileSync("./profiles/common_core.json", JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
    res.end();
});

// Buy skill tree perk STW
express.post("/fortnite/api/game/v2/profile/*/client/PurchaseHomebaseNode", async (req, res) => {
    function makeid(length) {
        var result = '';
        var characters = '0123456789abcdefghiklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var ItemAdded = false;

    const ID = makeid(5) + "-" + makeid(4) + "-" + makeid(6) + "-" + makeid(4);

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

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

    let CurrentDate = new Date();
    var DateFormat = moment(CurrentDate).format('YYYY-MM-DD') + "T00:00:00.000Z";

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

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

        fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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
                profile.items[req.body.loadoutId].attributes.gadgets[req.body.slotIndex].gadget = req.body.gadgetId || "";
                StatChanged = true;
                break;

            case 1:
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

        fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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
                        if (profile.items[key].attributes.squad_id == req.body.squadId && profile.items[key].attributes.squad_slot_idx == req.body.slotIndex) {
                            profile.items[key].attributes.squad_id = profile.items[req.body.characterId].attributes.squad_id || "";
                            profile.items[key].attributes.squad_slot_idx = profile.items[req.body.characterId].attributes.squad_slot_idx || 0;

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

        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
    res.end();
});

// Open llama STW
express.post("/fortnite/api/game/v2/profile/*/client/OpenCardPack", async (req, res) => {
    function makeid(length) {
        var result = '';
        var characters = '0123456789abcdefghiklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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
            const Letters = makeid(9) + "-" + makeid(4);

            ApplyProfileChanges.push({
                "changeType": "itemAdded",
                "itemId": ItemIDS[randomNumber] + Letters,
                "item": {
                    "templateId": ItemIDS[randomNumber],
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
            })

            Notifications[0].lootGranted.items.push({
                "itemType": ItemIDS[randomNumber],
                "itemGuid": ItemIDS[randomNumber] + Letters,
                "itemProfile": req.query.profileId,
                "attributes": {
                    "Alteration": {
                        "LootTierGroup": "AlterationTG.Trap.R",
                        "Tier": 0
                    }
                },
                "quantity": 1
            })

            profile.items[ItemIDS[randomNumber] + Letters] = {
                "templateId": ItemIDS[randomNumber],
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

        fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
    res.end();
});

	// Purchase llama STW
	express.post("/fortnite/api/game/v2/profile/*/client/PurchaseCatalogEntry", async (req, res) => {
	    function makeid(length) {
	        var result = '';
	        var characters = '0123456789abcdefghiklmnopqrstuvwxyz';
	        var charactersLength = characters.length;
	        for (var i = 0; i < length; i++) {
	            result += characters.charAt(Math.floor(Math.random() * charactersLength));
	        }
	        return result;
	    }

	    const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);
	    const campaign = require("./profiles/campaign.json");
	    const ItemIDS = require("./responses/ItemIDS.json");

	    // do not change any of these or you will end up breaking it
	    var ApplyProfileChanges = [];
	    var MultiUpdate = [];
	    var Notifications = [];
	    var BaseRevision = profile.rvn || 0;
	    var CampaignBaseRevision = campaign.rvn || 0;
	    var QueryRevision = req.query.rvn || -1;
	    var PurchasedLlama = false;

	    const Letters = makeid(9) + "-" + makeid(4)

	    if (req.body.offerId && profile.profileId == "profile0" && PurchasedLlama == false) {
	        profile.rvn += 1;
	        profile.commandRevision += 1;

	        catalog.storefronts.forEach(function(value, a) {
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

	                        profile.items[value.templateId + Letters] = Item

	                        ApplyProfileChanges.push({
	                            "changeType": "itemAdded",
	                            "itemId": value.templateId + Letters,
	                            "item": Item
	                        })
	                    })
	                }
	            })
	        })

	        PurchasedLlama = true;

	        fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
	            if (err) {
	                console.log('error:', err)
	            };
	        });
	    }

	    if (req.body.offerId && profile.profileId == "common_core") {
	        campaign.rvn += 1;
	        campaign.commandRevision += 1;

	        catalog.storefronts.forEach(function(value, a) {
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

	                            campaign.items[value.templateId + Letters] = Item

	                            MultiUpdate.push({
	                                "profileRevision": campaign.rvn || 0,
	                                "profileId": "campaign",
	                                "profileChangesBaseRevision": CampaignBaseRevision,
	                                "profileChanges": [{
	                                    "changeType": "itemAdded",
	                                    "itemId": value.templateId + Letters,
	                                    "item": Item
	                                }],
	                                "profileCommandRevision": campaign.commandRevision || 0,
	                            })

	                            PurchasedLlama = true;
	                        }

	                        if (seasondata.season == 5 || seasondata.season == 6 || req.headers["user-agent"].includes("Release-7.00") || req.headers["user-agent"].includes("Release-7.01") || req.headers["user-agent"].includes("Release-7.10") || req.headers["user-agent"].includes("Release-7.20") && PurchasedLlama == false) {
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

	                            campaign.items[value.templateId + Letters] = Item

	                            MultiUpdate.push({
	                                "profileRevision": campaign.rvn || 0,
	                                "profileId": "campaign",
	                                "profileChangesBaseRevision": CampaignBaseRevision,
	                                "profileChanges": [{
	                                    "changeType": "itemAdded",
	                                    "itemId": value.templateId + Letters,
	                                    "item": Item
	                                }],
	                                "profileCommandRevision": campaign.commandRevision || 0,
	                            });

	                            Notifications.push({
	                                "type": "cardPackResult",
	                                "primary": true,
	                                "lootGranted": {
	                                    "tierGroupName": campaign.items[value.templateId + Letters].templateId.split(":")[1],
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

	                            campaign.items[value.templateId + Letters] = Item

	                            MultiUpdate.push({
	                                "profileRevision": campaign.rvn || 0,
	                                "profileId": "campaign",
	                                "profileChangesBaseRevision": CampaignBaseRevision,
	                                "profileChanges": [],
	                                "profileCommandRevision": campaign.commandRevision || 0,
	                            });

	                            MultiUpdate[0].profileChanges.push({
	                                "changeType": "itemAdded",
	                                "itemId": value.templateId + Letters,
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
	                                const ItemLetters = makeid(9) + "-" + makeid(4);

	                                MultiUpdate[0].profileChanges.push({
	                                    "changeType": "itemAdded",
	                                    "itemId": ItemIDS[randomNumber] + ItemLetters,
	                                    "item": {
	                                        "templateId": ItemIDS[randomNumber],
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
	                                })

	                                Notifications[0].lootResult.items.push({
	                                    "itemType": ItemIDS[randomNumber],
	                                    "itemGuid": ItemIDS[randomNumber] + ItemLetters,
	                                    "itemProfile": "campaign",
	                                    "attributes": {},
	                                    "quantity": 1
	                                })

	                                campaign.items[ItemIDS[randomNumber] + ItemLetters] = {
	                                    "templateId": ItemIDS[randomNumber],
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
	                            }

	                            if (campaign.items[value.templateId + Letters].quantity == 1) {
	                                delete campaign.items[value.templateId + Letters]

	                                MultiUpdate[0].profileChanges.push({
	                                    "changeType": "itemRemoved",
	                                    "itemId": value.templateId + Letters
	                                })
	                            }

	                            if (true) {
	                                try {
	                                    campaign.items[value.templateId + Letters].quantity -= 1;

	                                    MultiUpdate[0].profileChanges.push({
	                                        "changeType": "itemQuantityChanged",
	                                        "itemId": value.templateId + Letters,
	                                        "quantity": campaign.items[value.templateId + Letters].quantity
	                                    })
	                                } catch (err) {}
	                            }

	                            PurchasedLlama = true;
	                        }
	                    })
	                }
	            })
	        })

	        fs.writeFileSync("./profiles/campaign.json", JSON.stringify(campaign, null, 2), function(err) {
	            if (err) {
	                console.log('error:', err)
	            };
	        });
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
	    res.status(200);
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

	        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
	            if (err) {
	                console.log('error:', err)
	            };
	        });
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
	    res.status(200);
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

	        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
	            if (err) {
	                console.log('error:', err)
	            };
	        });
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
	    res.status(200);
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

	        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
	            if (err) {
	                console.log('error:', err)
	            };
	        });
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
	    res.status(200);
	    res.end();
	});

// Equip BR Locker 1
express.post("/fortnite/api/game/v2/profile/*/client/EquipBattleRoyaleCustomization", async (req, res) => {
    const profile = require("./profiles/athena.json");
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
    profile.stats.attributes.season_num = seasondata.season;

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;
    var VariantChanged = false;

    const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
    if (req.body.variantUpdates && ReturnVariantsAsString.includes("active")) {
        if (profile.items[req.body.itemToSlot].attributes.variants.length == 0) {
            profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
        }
        for (var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) {
            try {
                profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
            } catch (err) {
                profile.items[req.body.itemToSlot].attributes.variants[i].active = profile.items[req.body.itemToSlot].attributes.variants[i].active;
            }
        }
        VariantChanged = true;
    }

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
        var Category = `favorite_${req.body.slotName.toLowerCase() || "character"}`

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
        fs.writeFileSync("./profiles/athena.json", JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
    res.end();
});

// Set BR Banner 1
express.post("/fortnite/api/game/v2/profile/*/client/SetBattleRoyaleBanner", async (req, res) => {
    const profile = require("./profiles/athena.json");
    const seasonchecker = require("./seasonchecker.js");
    const seasondata = require("./season.json");
    seasonchecker(req, seasondata);
    profile.stats.attributes.season_num = seasondata.season;

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

        fs.writeFileSync("./profiles/athena.json", JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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
    }

    // do not change any of these or you will end up breaking it
    var ApplyProfileChanges = [];
    var BaseRevision = profile.rvn || 0;
    var QueryRevision = req.query.rvn || -1;
    var StatChanged = false;
    var VariantChanged = false;

    const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
    if (req.body.variantUpdates && ReturnVariantsAsString.includes("active") && profile.profileId != "campaign") {
        if (profile.items[req.body.itemToSlot].attributes.variants.length == 0) {
            profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
        }
        for (var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) {
            try {
                profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
            } catch (err) {
                profile.items[req.body.itemToSlot].attributes.variants[i].active = profile.items[req.body.itemToSlot].attributes.variants[i].active;
            }
        }
        VariantChanged = true;
    }

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

        if (VariantChanged == true) {
            ApplyProfileChanges.push({
                "changeType": "itemAttrChanged",
                "itemId": req.body.itemToSlot,
                "attributeName": "variants",
                "attributeValue": profile.items[req.body.itemToSlot].attributes.variants
            })
        }

        fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
            if (err) {
                console.log('error:', err)
            };
        });
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
    res.status(200);
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
    res.status(200);
    res.end();
});
