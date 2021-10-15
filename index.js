const Express = require("express");
const express = Express();
const fs = require("fs");
const bodyparser = require("body-parser");
const moment = require("moment");
const worldstw = require("./responses/worldstw.json");
const friendslist = require("./responses/friendslist.json");
const friendslist2 = require("./responses/friendslist2.json");
const Keychain = require("./responses/keychain.json");
const contentpages = require("./responses/contentpages.json");
express.use(bodyparser.json());
express.use(bodyparser.urlencoded({extended:true}));
express.use(Express.static('public'));

const port = process.env.PORT || 3551;
express.listen(port, console.log("Started listening on port", port));

express.get("/", async (req, res) => {
	res.sendFile('index.html');
})

express.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
	res.json(
		{
			"refreshIntervalHrs": 24,
			"dailyPurchaseHrs": 24,
			"expiration": "2021-12-12T01:12:00Z",
			"storefronts": [
			  {
				"name": "BRDailyStorefront",
				"catalogEntries": []
			  },
			  {
				"name": "BRWeeklyStorefront",
				"catalogEntries": []
			  }
			]
		}
	);
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
	res.json(
		{
			"distributions": [
				"https://download.epicgames.com/",
				"https://download2.epicgames.com/",
				"https://download3.epicgames.com/",
				"https://download4.epicgames.com/",
				"https://epicgames-download1.akamaized.net/"
			]
		}
		);
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
	res.json(
			{
				"bans": [],
				"warnings": []
			}
		);
	res.status(200);
	res.end();
})

express.get("/affiliate/api/public/affiliates/slug/:slug", async (req, res) => {
	if (req.params.slug.toLowerCase() == "lawin")
	{
		return res.status(200).json(
			{
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
			[
				{
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
				}
			]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "SubtoLawin_LOL123",
				  "externalDisplayName": "YouTube-Lawin",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "Followlawin_LOL123",
				  "externalDisplayName": "Twitter-lawin_010",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "NINJALOL_1238",
				  "externalDisplayName": "Ninja",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "TFUELOL_1238",
				  "externalDisplayName": "Tfue",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "ALIALOL_1238",
				  "externalDisplayName": "Ali-A",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "DAKOTAZLOL_1238",
				  "externalDisplayName": "Dark",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "SYPHERPKLOL_1238",
				  "externalDisplayName": "SypherPK",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
				  "authIds": [
					{
					  "id": "0",
					  "type": "xuid"
					}
				  ]
				},
				"psn": {
				  "type": "psn",
				  "externalAuthId": "0",
				  "externalAuthIdType": "psn_user_id",
				  "accountId": "NICKEH30LOLL_2897669",
				  "externalDisplayName": "Nick Eh 30",
				  "authIds": [
					{
					  "id": "0",
					  "type": "psn_user_id"
					}
				  ]
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
	res.json(
	{
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
	}
)
	res.status(200);
	res.end();
	console.log("User logged in.")
})

express.get("/fortnite/api/v2/versioncheck/*", async (req, res) => {
	res.json(
		{
			"type": "NO_UPDATE"
		}
	)
	res.status(200);
	res.end();
})

express.get("/fortnite/api/v2/versioncheck*", async (req, res) => {
	res.json(
		{
			"type": "NO_UPDATE"
		}
	)
	res.status(200);
	res.end();
})

express.get("/fortnite/api/versioncheck*", async (req, res) => {
	res.json(
		{
			"type": "NO_UPDATE"
		}
	)
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
	res.json(
		{
			"serviceUrl": "wss://lawinserverfinal.herokuapp.com",
			"ticketType": "mms-player",
			"payload": "69=",
			"signature": "420="
		}
	)
	res.status(200);
	res.end();
})

express.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {
	res.json(
			{
				"accountId": req.params.accountId,
				"sessionId": req.params.sessionId,
				"key": "AOJEv8uTFmUh7XM2328kq9rlAzeQ5xzWzPIiyKn2s7s="
			}
	)
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
		if (seasondata.season > 9)
		{
			return res.status(404).json();
		}
	res.json([])
	res.status(200);
	res.end();
})

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
	res.json(
			{
				"channels": {
				  "client-matchmaking": {
					"states": [
					  {
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
					  }
					],
					"cacheExpire": "9999-01-01T22:28:47.830Z"
				  },
				  "client-events": {
					"states": [
					  {
						"validFrom": "2020-01-01T20:28:47.830Z",
						"activeEvents": [
						  {
							"eventType": `EventFlag.Season${seasondata.season}`,
							"activeUntil": "9999-01-01T00:00:00.000Z",
							"activeSince": "2020-01-01T00:00:00.000Z"
						  },
						  {
							"eventType": `EventFlag.${seasondata.lobby}`,
							"activeUntil": "9999-01-01T14:00:00.000Z",
							"activeSince": "2020-01-01T13:00:00.000Z"
						  }
						],
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
					  }
					],
					"cacheExpire": "9999-01-01T22:28:47.830Z"
				  }
				},
				"eventsTimeOffsetHrs": 0,
				"cacheIntervalMins": 10,
				"currentTime": "2020-01-01T18:13:41.770Z"
			  }
		);
	res.status(200);
	res.end();
})

express.get("/friends/api/public/blocklist/*", async (req, res) => {
	res.json(
		{
			"blockedUsers": []
		}
	)
	res.status(200);
	res.end();
})

express.get("/content/api/pages/fortnite-game", async (req, res) => {
	const seasonchecker = require("./seasonchecker.js");
	const seasondata = require("./season.json");
	seasonchecker(req, seasondata);
	if (seasondata.season == 9)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season9"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season9"
	}
	if (seasondata.season == 10)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "seasonx"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "seasonx"
	}
	if (seasondata.season == 11)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season11"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season11"
	}
	if (seasondata.season == 12)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season12"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season12"
	}
	if (seasondata.season == 13)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season13"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season13"
	}
	if (seasondata.season == 14)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season14"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season14"
	}
	if (seasondata.season == 15)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season15"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season15"
	}
	if (seasondata.season == 16)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season16"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season16"
	}
	if (seasondata.season == 17)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season17"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season17"
	}
	if (seasondata.season == 18)
	{
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "season18"
		contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "season18"
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
	res.json(
			{
				"access_token": "lawinstokenlol",
				"expires_in": 28800,
				"expires_at": "9999-12-02T01:12:01.100Z",
				"token_type": "bearer",
				"refresh_token": "lawinstokenlol",
				"refresh_expires": 86400,
				"refresh_expires_at": "9999-12-02T01:12:01.100Z",
				"account_id": req.body.username || "Invalid",
				"client_id": "lawinsclientidlol",
				"internal_client": true,
				"client_service": "fortnite",
				"displayName": req.body.username || "Invalid",
				"app": "fortnite",
				"in_app_id": req.body.username || "Invalid",
				"device_id": "lawinsdeviceidlol"
			}
		)
	res.status(200);
	res.end();
})

		// MCP BELOW


		// Set support a creator code
		express.post("/fortnite/api/game/v2/profile/*/client/SetAffiliateName", async (req, res) => {
			const profile = require("./profiles/common_core.json");

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.affiliateName.toLowerCase() == "lawin")
			{
				profile.stats.attributes.mtx_affiliate_set_time = new Date().toISOString();
				profile.stats.attributes.mtx_affiliate = req.body.affiliateName;
				StatChanged = true;
			}

			if (StatChanged == true)
			{
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
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": "common_core",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Set STW banner
		express.post("/fortnite/api/game/v2/profile/*/client/SetHomebaseBanner", async (req, res) => {
			const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.homebaseBannerIconId && req.body.homebaseBannerColorId)
			{
				switch(req.query.profileId) {

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

			if (StatChanged == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				if (req.query.profileId == "profile0")
				{
					ApplyProfileChanges.push({
						"changeType": "statModified",
						"name": "homebase",
						"value": profile.stats.attributes.homebase
					})
				}

				if (req.query.profileId == "common_public")
				{
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
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Buy skill tree perk STW
		express.post("/fortnite/api/game/v2/profile/*/client/PurchaseHomebaseNode", async (req, res) => {
			function makeid(length) {
				var result           = '';
				var characters       = '0123456789abcdefghiklmnopqrstuvwxyz';
				var charactersLength = characters.length;
				for ( var i = 0; i < length; i++ ) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				return result;
			}

			const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var ItemAdded = false;

			const ID = makeid(5) + "-" + makeid(4) + "-" + makeid(6) + "-" + makeid(4);

			if (req.body.nodeId)
			{
				profile.items[ID] = {"templateId":`HomebaseNode:${req.body.nodeId}`,"attributes":{"item_seen":true},"quantity":1};
				ItemAdded = true;
			}

			if (ItemAdded == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				ApplyProfileChanges.push({
					"changeType": "itemAdded",
					"itemId": ID,
					"item": profile.items[ID]
				})

				fs.writeFileSync(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Set pinned STW quests
		express.post("/fortnite/api/game/v2/profile/*/client/SetPinnedQuests", async (req, res) => {
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.pinnedQuestIds)
			{
				profile.stats.attributes.client_settings.pinnedQuestInstances = req.body.pinnedQuestIds;
				StatChanged = true;
			}

			if (StatChanged == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				ApplyProfileChanges.push({
					"changeType": "statModified",
					"name": "client_settings",
					"value": profile.stats.attributes.client_settings
				})

				fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Claim STW daily reward
		express.post("/fortnite/api/game/v2/profile/*/client/ClaimLoginReward", async (req, res) => {
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			let CurrentDate = new Date();
			var DateFormat = moment(CurrentDate).format('YYYY-MM-DD') + "T00:00:00.000Z";

			if (profile.stats.attributes.daily_rewards.lastClaimDate != DateFormat)
			{
				profile.stats.attributes.daily_rewards.nextDefaultReward += 1;
				profile.stats.attributes.daily_rewards.totalDaysLoggedIn += 1;
				profile.stats.attributes.daily_rewards.lastClaimDate = DateFormat;
				profile.stats.attributes.daily_rewards.additionalSchedules.founderspackdailyrewardtoken.rewardsClaimed += 1;
				StatChanged = true;
			}

			if (StatChanged == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				ApplyProfileChanges.push({
					"changeType": "statModified",
					"name": "daily_rewards",
					"value": profile.stats.attributes.daily_rewards
				})

				fs.writeFileSync(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

	// Equip team perk STW
	express.post("/fortnite/api/game/v2/profile/*/client/AssignTeamPerkToLoadout", async (req, res) => {
			const profile = require("./profiles/campaign.json");

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.loadoutId)
			{
				profile.items[req.body.loadoutId].attributes.team_perk = req.body.teamPerkId || "";
				StatChanged = true;
			}

			if (StatChanged == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				ApplyProfileChanges.push({
						"changeType": "itemAttrChanged",
						"itemId": req.body.loadoutId,
						"attributeName": "team_perk",
						"attributeValue": profile.items[req.body.loadoutId].attributes.team_perk
				})

				fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": "campaign",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Equip gadget STW
		express.post("/fortnite/api/game/v2/profile/*/client/AssignGadgetToLoadout", async (req, res) => {
			const profile = require("./profiles/campaign.json");

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.slotIndex && req.body.loadoutId)
			{
				switch(req.body.slotIndex) {

					case 0:
						profile.items[req.body.loadoutId].attributes.gadgets = [{"gadget":req.body.gadgetId || "","slot_index":0},profile.items[req.body.loadoutId].attributes.gadgets[1]];
						StatChanged = true;
					break;
					
					case 1:
						profile.items[req.body.loadoutId].attributes.gadgets = [profile.items[req.body.loadoutId].attributes.gadgets[0],{"gadget":req.body.gadgetId || "","slot_index":1}];
						StatChanged = true;
					break;

				}
			}

			if (StatChanged == true)
			{
				profile.rvn += 1;
				profile.commandRevision += 1;

				ApplyProfileChanges.push({
						"changeType": "itemAttrChanged",
						"itemId": req.body.loadoutId,
						"attributeName": "gadgets",
						"attributeValue": profile.items[req.body.loadoutId].attributes.gadgets
				})

				fs.writeFileSync("./profiles/campaign.json", JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": "campaign",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		// Assign worker to squad STW
		express.post("/fortnite/api/game/v2/profile/*/client/AssignWorkerToSquad", async (req, res) => {
			const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;

			if (req.body.characterId)
			{
				for(var key in profile.items)
				{
					if (profile.items[key].hasOwnProperty('attributes'))
					{
						if (profile.items[key].attributes.hasOwnProperty('squad_id') && profile.items[key].attributes.hasOwnProperty('squad_slot_idx'))
						{
							if (profile.items[key].attributes.squad_id != "" && profile.items[key].attributes.squad_slot_idx != -1)
							{
								if (profile.items[key].attributes.squad_id == req.body.squadId && profile.items[key].attributes.squad_slot_idx == req.body.slotIndex)
								{
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

			if (req.body.characterId)
			{
				profile.items[req.body.characterId].attributes.squad_id = req.body.squadId || "";
				profile.items[req.body.characterId].attributes.squad_slot_idx = req.body.slotIndex || 0;
				StatChanged = true;
			}

			if (StatChanged == true)
			{
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
					if (err) 
					{
						console.log('error:', err) 
					};
				});
			}

			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}

			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

	// Claim STW quest reward
	express.post("/fortnite/api/game/v2/profile/*/client/ClaimQuestReward", async (req, res) => {
		const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);

		// do not change any of these or you will end up breaking it
		var ApplyProfileChanges = [];
		var BaseRevision = profile.rvn || 1;
		var QueryRevision = req.query.rvn || -1;
		var StatChanged = false;

		if (req.body.questId)
		{
			profile.items[req.body.questId].attributes.quest_state = "Claimed";
			profile.items[req.body.questId].attributes.last_state_change_time = new Date().toISOString();
			StatChanged = true;
		}

		if (StatChanged == true)
		{
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
				if (err) 
				{
					console.log('error:', err) 
				};
			});
		}

		// this doesn't work properly on version v12.20 and above but whatever
		if (QueryRevision != BaseRevision)
		{
			ApplyProfileChanges = [
				{
					"changeType": "fullProfileUpdate",
					"profile": profile
				}
			];
		}

		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "campaign",
				"profileChangesBaseRevision": BaseRevision,
				"profileChanges": ApplyProfileChanges,
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
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
		var BaseRevision = profile.rvn || 1;
		var QueryRevision = req.query.rvn || -1;
		var StatChanged = false;
		var VariantChanged = false;

		const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
		if (req.body.variantUpdates && ReturnVariantsAsString.includes("active"))
		{
				if (profile.items[req.body.itemToSlot].attributes.variants.length == 0)
				{
					profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
				}
				for(var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) 
				{
					try
					{
						profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
					}
					catch(err)
					{
						profile.items[req.body.itemToSlot].attributes.variants[i].active = profile.items[req.body.itemToSlot].attributes.variants[i].active;
					}
				}
				VariantChanged = true;
		}

		if (req.body.slotName)
		{

		switch(req.body.slotName) {

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

			if (Math.sign(indexwithinslot) == 1 || Math.sign(indexwithinslot) == 0)
			{
				profile.stats.attributes.favorite_dance[indexwithinslot] = req.body.itemToSlot || "";
			}

			StatChanged = true;
		break;

		case "ItemWrap":
			var indexwithinslot = req.body.indexWithinSlot || 0;

			switch(Math.sign(indexwithinslot)) {

			case 0:
				profile.stats.attributes.favorite_itemwraps[indexwithinslot] = req.body.itemToSlot || "";
			break;

			case 1:
				profile.stats.attributes.favorite_itemwraps[indexwithinslot] = req.body.itemToSlot || "";
			break;

			case -1:
				for(var i = 0; i < profile.stats.attributes.favorite_itemwraps.length; i++) 
				{
					profile.stats.attributes.favorite_itemwraps[i] = req.body.itemToSlot || "";
				}
			break;

			}

			StatChanged = true;
		break;

		}

		}

		if (StatChanged == true)
		{
			var Category = `favorite_${req.body.slotName.toLowerCase() || "character"}`

			if (Category == "favorite_itemwrap")
			{
				Category += "s"
			}

			profile.rvn += 1;
			profile.commandRevision += 1;

			ApplyProfileChanges.push({
				"changeType": "statModified",
				"name": Category,
				"value": profile.stats.attributes[Category]
			})

			if (VariantChanged == true)
			{
				ApplyProfileChanges.push(
					{
						"changeType": "itemAttrChanged",
						"itemId": req.body.itemToSlot,
						"attributeName": "variants",
						"attributeValue": profile.items[req.body.itemToSlot].attributes.variants
					})
			}
			fs.writeFileSync("./profiles/athena.json", JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			});
		}

		// this doesn't work properly on version v12.20 and above but whatever
		if (QueryRevision != BaseRevision)
		{
			ApplyProfileChanges = [
				{
					"changeType": "fullProfileUpdate",
					"profile": profile
				}
			];
		}

		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": "athena",
				"profileChangesBaseRevision": BaseRevision,
				"profileChanges": ApplyProfileChanges,
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
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
		var BaseRevision = profile.rvn || 1;
		var QueryRevision = req.query.rvn || -1;
		var StatChanged = false;

		if (req.body.homebaseBannerIconId && req.body.homebaseBannerColorId)
		{
			profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId;
			profile.stats.attributes.banner_color = req.body.homebaseBannerColorId;
			StatChanged = true;
		}

		if (StatChanged == true)
		{
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
				if (err) 
				{ 
					console.log('error:', err) 
				};
			});
		}

		// this doesn't work properly on version v12.20 and above but whatever
		if (QueryRevision != BaseRevision)
		{
			ApplyProfileChanges = [
				{
					"changeType": "fullProfileUpdate",
					"profile": profile
				}
			];
		}

		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": "athena",
				"profileChangesBaseRevision": BaseRevision,
				"profileChanges": ApplyProfileChanges,
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});

		// Set BR Banner 2
		express.post("/fortnite/api/game/v2/profile/*/client/SetCosmeticLockerBanner", async (req, res) => {
			const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);

			if (profile.profileId == "athena")
			{
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}

			// do not change any of these or you will end up breaking it
			var ApplyProfileChanges = [];
			var BaseRevision = profile.rvn || 1;
			var QueryRevision = req.query.rvn || -1;
			var StatChanged = false;
	
			if (req.body.bannerIconTemplateName && req.body.bannerColorTemplateName && req.body.lockerItem)
			{
				profile.items[req.body.lockerItem].attributes.banner_icon_template = req.body.bannerIconTemplateName;
				profile.items[req.body.lockerItem].attributes.banner_color_template = req.body.bannerColorTemplateName;
				StatChanged = true;
			}
	
			if (StatChanged == true)
			{
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
	
				fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				});
			}
	
			// this doesn't work properly on version v12.20 and above but whatever
			if (QueryRevision != BaseRevision)
			{
				ApplyProfileChanges = [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				];
			}
	
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "athena",
					"profileChangesBaseRevision": BaseRevision,
					"profileChanges": ApplyProfileChanges,
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
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
		var BaseRevision = profile.rvn || 1;
		var QueryRevision = req.query.rvn || -1;
		var StatChanged = false;
		var VariantChanged = false;

		const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
		if (req.body.variantUpdates && ReturnVariantsAsString.includes("active") && profile.profileId != "campaign")
		{
				if (profile.items[req.body.itemToSlot].attributes.variants.length == 0)
				{
					profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
				}
				for(var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) 
				{
					try
					{
						profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
					}
					catch(err)
					{
						profile.items[req.body.itemToSlot].attributes.variants[i].active = profile.items[req.body.itemToSlot].attributes.variants[i].active;
					}
				}
				VariantChanged = true;
		}

		if (req.body.category && req.body.lockerItem)
		{

		switch(req.body.category) {

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

			if (Math.sign(indexwithinslot) == 1 || Math.sign(indexwithinslot) == 0)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[indexwithinslot] = req.body.itemToSlot || "";
			}

			StatChanged = true;
		break;

		case "ItemWrap":
			var indexwithinslot = req.body.slotIndex || 0;

			switch(Math.sign(indexwithinslot)) {

				case 0:
					profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[indexwithinslot] = req.body.itemToSlot || "";
				break;

				case 1:
					profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[indexwithinslot] = req.body.itemToSlot || "";
				break;
	
				case -1:
					for(var i = 0; i < profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items.length; i++) 
					{
						profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[i] = req.body.itemToSlot || "";
					}
				break;
	
			}

			StatChanged = true;
		break;

		}

		}

		if (StatChanged == true)
		{
			profile.rvn += 1;
			profile.commandRevision += 1;

			ApplyProfileChanges.push({
					"changeType": "itemAttrChanged",
					"itemId": req.body.lockerItem,
					"attributeName": "locker_slots_data",
					"attributeValue": profile.items[req.body.lockerItem].attributes.locker_slots_data
			})

			if (VariantChanged == true)
			{
				ApplyProfileChanges.push({
						"changeType": "itemAttrChanged",
						"itemId": req.body.itemToSlot,
						"attributeName": "variants",
						"attributeValue": profile.items[req.body.itemToSlot].attributes.variants
				})
			}

			fs.writeFileSync(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			});
		}

		// this doesn't work properly on version v12.20 and above but whatever
		if (QueryRevision != BaseRevision)
		{
			ApplyProfileChanges = [
				{
					"changeType": "fullProfileUpdate",
					"profile": profile
				}
			];
		}

		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": BaseRevision,
				"profileChanges": ApplyProfileChanges,
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
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
		var BaseRevision = profile.rvn || 1;
		var QueryRevision = req.query.rvn || -1;

		// this doesn't work properly on version v12.20 and above but whatever
		if (QueryRevision != BaseRevision)
		{
			ApplyProfileChanges = [
				{
					"changeType": "fullProfileUpdate",
					"profile": profile
				}
			];
		}

		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": BaseRevision,
				"profileChanges": ApplyProfileChanges,
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});
