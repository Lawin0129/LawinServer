const Express = require("express");
const express = Express.Router();
const fs = require("fs");
const friendslist = require("./../responses/friendslist.json");
const friendslist2 = require("./../responses/friendslist2.json");
const functions = require("./functions.js");

express.get("/friends/api/v1/*/settings", async (req, res) => {
    res.json({})
})

express.get("/friends/api/v1/*/blocklist", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/friends/:accountId", async (req, res) => {
    const memory = functions.GetVersionInfo(req);

    if (!friendslist.find(i => i.accountId == req.params.accountId)) {
        var FriendObject = {
            "accountId": req.params.accountId,
            "status": "ACCEPTED",
            "direction": "OUTBOUND",
            "created": new Date().toISOString(),
            "favorite": false
        };

        friendslist.push(FriendObject)
        friendslist2.friends.push({
            "accountId": FriendObject.accountId,
            "groups": [],
            "mutual": 0,
            "alias": "",
            "note": "",
            "favorite": FriendObject.favorite,
            "created": FriendObject.created
        })

        functions.sendXmppMessageToAll({
            "payload": FriendObject,
            "type": "com.epicgames.friends.core.apiobjects.Friend",
            "timestamp": FriendObject.created
        })

        functions.sendXmppMessageToAll({
            "type": "FRIENDSHIP_REQUEST",
            "timestamp": FriendObject.created,
            "from": FriendObject.accountId,
            "status": FriendObject.status
        })

        fs.writeFileSync("./responses/friendslist.json", JSON.stringify(friendslist, null, 2));
        fs.writeFileSync("./responses/friendslist2.json", JSON.stringify(friendslist2, null, 2));
    }

    if (memory.season >= 7) {
        var friends = JSON.parse(JSON.stringify(friendslist))
        friends.splice(friendslist.findIndex(i => i.accountId == req.params.accountId), 1)
        return res.json(friends);
    }

    res.json(friendslist)
})

express.get("/friends/api/v1/:accountId/summary", async (req, res) => {
    if (!friendslist2.friends.find(i => i.accountId == req.params.accountId)) {
        var FriendObject = {
            "accountId": req.params.accountId,
            "groups": [],
            "mutual": 0,
            "alias": "",
            "note": "",
            "favorite": false,
            "created": new Date().toISOString()
        };

        friendslist2.friends.push(FriendObject)
        friendslist.push({
            "accountId": FriendObject.accountId,
            "status": "ACCEPTED",
            "direction": "OUTBOUND",
            "created": FriendObject.created,
            "favorite": FriendObject.favorite
        })

        functions.sendXmppMessageToAll({
            "payload": {
                "accountId": FriendObject.accountId,
                "status": "ACCEPTED",
                "direction": "OUTBOUND",
                "created": FriendObject.created,
                "favorite": FriendObject.favorite
            },
            "type": "com.epicgames.friends.core.apiobjects.Friend",
            "timestamp": FriendObject.created
        })

        functions.sendXmppMessageToAll({
            "type": "FRIENDSHIP_REQUEST",
            "timestamp": FriendObject.created,
            "from": FriendObject.accountId,
            "status": "ACCEPTED"
        })

        fs.writeFileSync("./responses/friendslist.json", JSON.stringify(friendslist, null, 2));
        fs.writeFileSync("./responses/friendslist2.json", JSON.stringify(friendslist2, null, 2));
    }

    res.json(friendslist2)
})

express.get("/friends/api/public/list/fortnite/*/recentPlayers", async (req, res) => {
    res.json([])
})

express.get("/friends/api/public/blocklist/*", async (req, res) => {
    res.json({
        "blockedUsers": []
    })
})

module.exports = express;