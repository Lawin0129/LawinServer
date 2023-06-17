const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const path = require("path");
const iniparser = require("ini");
const config = iniparser.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.ini")).toString());
var Memory_CurrentAccountID = config.Config.displayName;

express.get("/account/api/public/account", async (req, res) => {
    var response = [];

    if (typeof req.query.accountId == "string") {
        var accountId = req.query.accountId;
        if (accountId.includes("@")) accountId = accountId.split("@")[0];

        response.push({
            "id": accountId,
            "displayName": accountId,
            "externalAuths": {}
        })
    }

    if (Array.isArray(req.query.accountId)) {
        for (var x in req.query.accountId) {
            var accountId = req.query.accountId[x];
            if (accountId.includes("@")) accountId = accountId.split("@")[0];

            response.push({
                "id": accountId,
                "displayName": accountId,
                "externalAuths": {}
            })
        }
    }

    res.json(response)
})

express.get("/account/api/public/account/:accountId", async (req, res) => {
    if (config.Config.bUseConfigDisplayName == false) {
        Memory_CurrentAccountID = req.params.accountId;
    }

    if (Memory_CurrentAccountID.includes("@")) Memory_CurrentAccountID = Memory_CurrentAccountID.split("@")[0];

    res.json({
        "id": req.params.accountId,
        "displayName": Memory_CurrentAccountID,
        "name": "Lawin",
        "email": Memory_CurrentAccountID + "@lawin.com",
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
        "minorStatus": "NOT_MINOR",
        "cabinedMode": false,
        "hasHashedEmail": false
    })
})

express.get("/sdk/v1/*", async (req, res) => {
    const sdk = require("./../responses/sdkv1.json");
    res.json(sdk)
})

express.post("/auth/v1/oauth/token", async (req, res) => {
    res.json({
        "access_token": "lawinstokenlol",
        "token_type": "bearer",
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "deployment_id": "lawinsdeploymentidlol",
        "organization_id": "lawinsorganizationidlol",
        "product_id": "prod-fn",
        "sandbox_id": "fn"
    })
})

express.get("/epic/id/v2/sdk/accounts", async (req, res) => {
    res.json([{
        "accountId": Memory_CurrentAccountID,
        "displayName": Memory_CurrentAccountID,
        "preferredLanguage": "en",
        "cabinedMode": false,
        "empty": false
    }])
})

express.post("/epic/oauth/v2/token", async (req, res) => {
    res.json({
        "scope": "basic_profile friends_list openid presence",
        "token_type": "bearer",
        "access_token": "lawinstokenlol",
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "refresh_token": "lawinstokenlol",
        "refresh_expires_in": 86400,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": Memory_CurrentAccountID,
        "client_id": "lawinsclientidlol",
        "application_id": "lawinsapplicationidlol",
        "selected_account_id": Memory_CurrentAccountID,
        "id_token": "lawinstokenlol"
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
        "display_name": Memory_CurrentAccountID,
        "app": "fortnite",
        "in_app_id": Memory_CurrentAccountID,
        "device_id": "lawinsdeviceidlol"
    })
})

express.post("/account/api/oauth/token", async (req, res) => {
    if (config.Config.bUseConfigDisplayName == false) {
        Memory_CurrentAccountID = req.body.username || "LawinServer"
    }

    if (Memory_CurrentAccountID.includes("@")) Memory_CurrentAccountID = Memory_CurrentAccountID.split("@")[0];

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
        "displayName": Memory_CurrentAccountID,
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