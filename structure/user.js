const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const path = require("path");
const iniparser = require("ini");
const config = iniparser.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.ini")).toString());
const functions = require("./functions.js");
var Memory_CurrentAccountID = functions.MakeID().replace(/-/ig, "");

express.get("/account/api/public/account", async (req, res) => {
    var displayName = config.Config.displayName;

    if (config.Config.bUseConfigDisplayName == false) {
        displayName = req.query.accountId;
    }

    res.json(
        [
            {
                "id": req.query.accountId,
                "displayName": displayName,
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
    var displayName = config.Config.displayName;

    if (config.Config.bUseConfigDisplayName == false) {
        displayName = req.params.accountId;
    }

    res.json({
        "id": req.params.accountId,
        "displayName": displayName,
        "name": "Lawin",
        "email": displayName + "@lawin.com",
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

express.get("/account/api/public/account/*/externalAuths", async (req, res) => {
    res.json([])
})

express.delete("/account/api/oauth/sessions/kill", async (req, res) => {
    res.status(204);
    res.end();
})

express.delete("/account/api/oauth/sessions/kill/*", async (req, res) => {
    res.status(204);
    res.end();
})

express.get("/account/api/oauth/verify", async (req, res) => {
    var displayName = config.Config.displayName;

    if (config.Config.bUseConfigDisplayName == false) {
        displayName = Memory_CurrentAccountID
    }

    res.json({
        "token": "lawinstokenlol",
        "session_id": "3c3662bcb661d6de679c636744c66b62",
        "token_type": "bearer",
        "client_id": "lawinsclientidlol",
        "internal_client": true,
        "client_service": "fortnite",
        "account_id": Memory_CurrentAccountID,
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "auth_method": "exchange_code",
        "display_name": displayName,
        "app": "fortnite",
        "in_app_id": Memory_CurrentAccountID,
        "device_id": "lawinsdeviceidlol"
    })
})

express.post("/account/api/oauth/token", async (req, res) => {
    var displayName = config.Config.displayName;

    if (config.Config.bUseConfigDisplayName == false) {
        Memory_CurrentAccountID = req.body.username || "LawinServer"
        displayName = req.body.username || "LawinServer"
    }

    res.json({
        "access_token": "lawinstokenlol",
        "expires_in": 28800,
        "expires_at": "9999-12-02T01:12:01.100Z",
        "token_type": "bearer",
        "refresh_token": "lawinstokenlol",
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-02T01:12:01.100Z",
        "account_id": Memory_CurrentAccountID,
        "client_id": "lawinsclientidlol",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": displayName,
        "app": "fortnite",
        "in_app_id": Memory_CurrentAccountID,
        "device_id": "lawinsdeviceidlol"
    })
})

express.post("/account/api/oauth/exchange", async (req, res) => {
    res.json({})
})

express.get("/account/api/epicdomains/ssodomains", async (req, res) => {
    res.json([
        "unrealengine.com",
        "unrealtournament.com",
        "fortnite.com",
        "epicgames.com"
    ])
})

express.post("/fortnite/api/game/v2/tryPlayOnPlatform/account/*", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(true);
})

module.exports = express;