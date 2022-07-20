const Express = require("express");
const express = Express.Router();
const discovery = require("./../responses/discovery/discovery_frontend.json");

express.post("*discovery/surface/*", async (req, res) => {
    res.json(discovery);
})

express.post("/links/api/fn/mnemonic", async (req, res) => {
    var MnemonicArray = [];

    for (var i in discovery.Panels[0].Pages[0].results) {
        MnemonicArray.push(discovery.Panels[0].Pages[0].results[i].linkData)
        console.log(discovery.Panels[0].Pages[0].results[i].linkData.mnemonic);
    }

    res.json(MnemonicArray);
})

express.get("/links/api/fn/mnemonic/*", async (req, res) => {
    for (var i in discovery.Panels[0].Pages[0].results) {
        console.log(discovery.Panels[0].Pages[0].results[i].linkData.mnemonic);
        if (discovery.Panels[0].Pages[0].results[i].linkData.mnemonic == req.url.split("/").slice(-1)[0]) {
            res.json(discovery.Panels[0].Pages[0].results[i].linkData);
        }
    }
})

module.exports = express;