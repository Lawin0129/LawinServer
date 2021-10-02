const Express = require("express");
const express = Express();
const fs = require("fs");
const bodyparser = require("body-parser");
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

		express.post("/fortnite/api/game/v2/profile/*/client/SetAffiliateName", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "common_core"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			if (req.body.affiliateName.toLowerCase() == "lawin" && profile.profileId == "common_core")
			{
				profile.stats.attributes.mtx_affiliate_set_time = new Date().toISOString();
				profile.stats.attributes.mtx_affiliate = req.body.affiliateName || "";
				profile.rvn += 1;
				profile.commandRevision += 1;
				fs.writeFile(`./profiles/${req.query.profileId || "common_core"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				  });
			}
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "common_core",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/SetHomebaseBanner", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			if (req.query.profileId == "profile0") 
			{
				profile.stats.attributes.homebase.bannerIconId = req.body.homebaseBannerIconId || "";
				profile.stats.attributes.homebase.bannerColorId = req.body.homebaseBannerColorId || "";
				profile.rvn += 1;
				profile.commandRevision += 1;
				fs.writeFile(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				  });
			}
			if (req.query.profileId == "common_public") 
			{
				profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId || "";
				profile.stats.attributes.banner_color = req.body.homebaseBannerColorId || "";
				profile.rvn += 1;
				profile.commandRevision += 1;
				fs.writeFile(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				  });
			}
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/PurchaseHomebaseNode", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
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
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			profile.items[makeid(5) + "-" + makeid(4) + "-" + makeid(6) + "-" + makeid(4)] = {"templateId":`HomebaseNode:${req.body.nodeId || "no"}`,"attributes":{"item_seen":true},"quantity":1};
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/SetPinnedQuests", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			profile.stats.attributes.client_settings.pinnedQuestInstances = req.body.pinnedQuestIds || [];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/ClaimLoginReward", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			profile.stats.attributes.daily_rewards.nextDefaultReward += 1;
			profile.stats.attributes.daily_rewards.totalDaysLoggedIn += 1;
			profile.stats.attributes.daily_rewards.lastClaimDate = new Date().toISOString();
			profile.stats.attributes.daily_rewards.additionalSchedules.founderspackdailyrewardtoken.rewardsClaimed += 1;
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});
	
	express.post("/fortnite/api/game/v2/profile/*/client/AssignTeamPerkToLoadout", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			profile.items[req.body.loadoutId].attributes.team_perk = req.body.teamPerkId || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/AssignGadgetToLoadout", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			if (req.body.slotIndex == 0)
			{
				profile.items[req.body.loadoutId].attributes.gadgets = [{"gadget":req.body.gadgetId || "","slot_index":0},profile.items[req.body.loadoutId].attributes.gadgets[1]];
				profile.rvn += 1;
				profile.commandRevision += 1;
				fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				  });
			}
			if (req.body.slotIndex == 1)
			{
				profile.items[req.body.loadoutId].attributes.gadgets = [profile.items[req.body.loadoutId].attributes.gadgets[0],{"gadget":req.body.gadgetId || "","slot_index":1}];
				profile.rvn += 1;
				profile.commandRevision += 1;
				fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
					if (err) 
					{ 
						console.log('error:', err) 
					};
				  });
			}
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "campaign",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

		express.post("/fortnite/api/game/v2/profile/*/client/AssignWorkerToSquad", async (req, res) => {
			if (req.headers["user-agent"].includes("Mozilla")) {
				return res
				.status(405)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.method_not_allowed",
						"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
				}
			const profile = require(`./profiles/${req.query.profileId || "profile0"}.json`);
			if (profile.profileId == "athena") {
				const seasonchecker = require("./seasonchecker.js");
				const seasondata = require("./season.json");
				seasonchecker(req, seasondata);
				profile.stats.attributes.season_num = seasondata.season;
			}
			profile.items[req.body.characterId].attributes.squad_id = req.body.squadId || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "profile0"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
			res.json(
				{
					"profileRevision": profile.rvn || 1,
					"profileId": req.query.profileId || "profile0",
					"profileChangesBaseRevision": profile.rvn || 1,
					"profileChanges": [
						{
							"changeType": "fullProfileUpdate",
							"profile": profile
						}
					],
					"profileCommandRevision": profile.commandRevision || 0,
					"serverTime": new Date().toISOString(),
					"responseVersion": 1
				}
			)
			res.status(200);
			res.end();
		});

	express.post("/fortnite/api/game/v2/profile/*/client/ClaimQuestReward", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
		const profile = require(`./profiles/${req.query.profileId || "campaign"}.json`);
		if (profile.profileId == "athena") {
			const seasonchecker = require("./seasonchecker.js");
			const seasondata = require("./season.json");
			seasonchecker(req, seasondata);
			profile.stats.attributes.season_num = seasondata.season;
		}
		profile.items[req.body.questId].attributes.quest_state = "Claimed";
		profile.items[req.body.questId].attributes.last_state_change_time = new Date().toISOString();
		profile.rvn += 1;
		profile.commandRevision += 1;
		fs.writeFile(`./profiles/${req.query.profileId || "campaign"}.json`, JSON.stringify(profile, null, 2), function(err) {
			if (err) 
			{ 
				console.log('error:', err) 
			};
		  });
		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "campaign",
				"profileChangesBaseRevision": profile.rvn || 1,
				"profileChanges": [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				],
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});

	express.post("/fortnite/api/game/v2/profile/*/client/EquipBattleRoyaleCustomization", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
			if (req.query.profileId != "athena") 
			{
				return res
				.status(403)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.wrong_profile",
						"errorMessage":"Sorry, this endpoint requires the athena profile.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
			}
		const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
		if (profile.profileId == "athena") {
			const seasonchecker = require("./seasonchecker.js");
			const seasondata = require("./season.json");
			seasonchecker(req, seasondata);
			profile.stats.attributes.season_num = seasondata.season;
		}
		if (req.body.slotName == "Character")
		{
			profile.stats.attributes.favorite_character = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "Backpack")
		{
			profile.stats.attributes.favorite_backpack = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "Pickaxe")
		{
			profile.stats.attributes.favorite_pickaxe = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "Glider")
		{
			profile.stats.attributes.favorite_glider = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "SkyDiveContrail")
		{
			profile.stats.attributes.favorite_skydivecontrail = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "MusicPack")
		{
			profile.stats.attributes.favorite_musicpack = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "LoadingScreen")
		{
			profile.stats.attributes.favorite_loadingscreen = req.body.itemToSlot || "";
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "Dance")
		{
			var indexwithinslot = req.body.indexWithinSlot || 0;

			if (indexwithinslot == 0)
			{
				profile.stats.attributes.favorite_dance[0] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 1)
			{
				profile.stats.attributes.favorite_dance[1] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 2)
			{
				profile.stats.attributes.favorite_dance[2] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 3)
			{
				profile.stats.attributes.favorite_dance[3] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 4)
			{
				profile.stats.attributes.favorite_dance[4] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 5)
			{
				profile.stats.attributes.favorite_dance[5] = req.body.itemToSlot || "";
			}

			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.slotName == "ItemWrap")
		{
			var indexwithinslot = req.body.indexWithinSlot || 0;

			if (indexwithinslot == 0)
			{
				profile.stats.attributes.favorite_itemwraps[0] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 1)
			{
				profile.stats.attributes.favorite_itemwraps[1] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 2)
			{
				profile.stats.attributes.favorite_itemwraps[2] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 3)
			{
				profile.stats.attributes.favorite_itemwraps[3] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 4)
			{
				profile.stats.attributes.favorite_itemwraps[4] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 5)
			{
				profile.stats.attributes.favorite_itemwraps[5] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 6)
			{
				profile.stats.attributes.favorite_itemwraps[6] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == -1)
			{
				profile.stats.attributes.favorite_itemwraps[0] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[1] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[2] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[3] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[4] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[5] = req.body.itemToSlot || "";
				profile.stats.attributes.favorite_itemwraps[6] = req.body.itemToSlot || "";
			}

			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		
		const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
		if (req.body.variantUpdates && ReturnVariantsAsString.includes("active"))
		{
				if (JSON.stringify(profile.items[req.body.itemToSlot].attributes.variants) == "[]")
				{
					profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
				}
				for(var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) 
				{
					profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
				}
		}
		
		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": profile.rvn || 1,
				"profileChanges": [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				],
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});

	express.post("/fortnite/api/game/v2/profile/*/client/SetBattleRoyaleBanner", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
			if (req.query.profileId != "athena") 
			{
				return res
				.status(403)
				.json(
					{
						"errorCode":"errors.com.epicgames.common.wrong_profile",
						"errorMessage":"Sorry, this endpoint requires the athena profile.",
						"numericErrorCode":1009,
						"originatingService":"fortnite",
						"intent":"prod-live"
					})
			}
		const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
		if (profile.profileId == "athena") {
			const seasonchecker = require("./seasonchecker.js");
			const seasondata = require("./season.json");
			seasonchecker(req, seasondata);
			profile.stats.attributes.season_num = seasondata.season;
		}
		profile.stats.attributes.banner_icon = req.body.homebaseBannerIconId || "BRSeason01";
		profile.stats.attributes.banner_color = req.body.homebaseBannerColorId || "DefaultColor1";
		profile.rvn += 1;
		profile.commandRevision += 1;
		fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
			if (err) 
			{ 
				console.log('error:', err) 
			};
		  });
		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": profile.rvn || 1,
				"profileChanges": [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				],
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});

	express.post("/fortnite/api/game/v2/profile/*/client/SetCosmeticLockerSlot", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
		const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
		if (profile.profileId == "athena") {
			const seasonchecker = require("./seasonchecker.js");
			const seasondata = require("./season.json");
			seasonchecker(req, seasondata);
			profile.stats.attributes.season_num = seasondata.season;
		}
		if (req.body.category == "Character")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Character.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "Backpack")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Backpack.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "Pickaxe")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Pickaxe.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "Glider")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Glider.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "SkyDiveContrail")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.SkyDiveContrail.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "MusicPack")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.MusicPack.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "LoadingScreen")
		{
			profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.LoadingScreen.items = [req.body.itemToSlot || ""];
			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "Dance")
		{
			var indexwithinslot = req.body.slotIndex || 0;

			if (indexwithinslot == 0)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[0] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 1)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[1] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 2)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[2] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 3)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[3] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 4)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[4] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 5)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.Dance.items[5] = req.body.itemToSlot || "";
			}

			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		if (req.body.category == "ItemWrap")
		{
			var indexwithinslot = req.body.slotIndex || 0;

			if (indexwithinslot == 0)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[0] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 1)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[1] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 2)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[2] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 3)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[3] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 4)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[4] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 5)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[5] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == 6)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[6] = req.body.itemToSlot || "";
			}
			if (indexwithinslot == -1)
			{
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[0] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[1] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[2] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[3] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[4] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[5] = req.body.itemToSlot || "";
				profile.items[req.body.lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[6] = req.body.itemToSlot || "";
			}

			profile.rvn += 1;
			profile.commandRevision += 1;
			fs.writeFile(`./profiles/${req.query.profileId || "athena"}.json`, JSON.stringify(profile, null, 2), function(err) {
				if (err) 
				{ 
					console.log('error:', err) 
				};
			  });
		}
		
		const ReturnVariantsAsString = JSON.stringify(req.body.variantUpdates || [])
		if (req.body.variantUpdates && ReturnVariantsAsString.includes("active") && profile.profileId != "campaign")
		{
				if (JSON.stringify(profile.items[req.body.itemToSlot].attributes.variants) == "[]")
				{
					profile.items[req.body.itemToSlot].attributes.variants = req.body.variantUpdates || [];
				}
				for(var i = 0; i < profile.items[req.body.itemToSlot].attributes.variants.length; i++) 
				{
					profile.items[req.body.itemToSlot].attributes.variants[i].active = req.body.variantUpdates[i].active || "";
				}
		}
		
		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": profile.rvn || 1,
				"profileChanges": [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				],
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});

	express.post("/fortnite/api/game/v2/profile/*/client/*", async (req, res) => {
		if (req.headers["user-agent"].includes("Mozilla")) {
			return res
			.status(405)
			.json(
				{
					"errorCode":"errors.com.epicgames.common.method_not_allowed",
					"errorMessage":"Sorry the resource you were trying to access cannot be accessed with the HTTP method you used.",
					"numericErrorCode":1009,
					"originatingService":"fortnite",
					"intent":"prod-live"
				})
			}
		const profile = require(`./profiles/${req.query.profileId || "athena"}.json`);
		if (profile.profileId == "athena") {
			const seasonchecker = require("./seasonchecker.js");
			const seasondata = require("./season.json");
			seasonchecker(req, seasondata);
			profile.stats.attributes.season_num = seasondata.season;
		}
		if (req.headers["user-agent"].includes("3724489")) {
			if (req.query.profileId == "profile0") {
				return res
				.status(200)
				.json({})
			}
		}
		res.json(
			{
				"profileRevision": profile.rvn || 1,
				"profileId": req.query.profileId || "athena",
				"profileChangesBaseRevision": profile.rvn || 1,
				"profileChanges": [
					{
						"changeType": "fullProfileUpdate",
						"profile": profile
					}
				],
				"profileCommandRevision": profile.commandRevision || 0,
				"serverTime": new Date().toISOString(),
				"responseVersion": 1
			}
		)
		res.status(200);
		res.end();
	});
