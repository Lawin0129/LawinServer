const Express = require("express");
const express = Express.Router();
const discovery = require("./../responses/discovery_frontend.json");

express.post("/fortnite/api/game/v2/creative/discovery/surface/*", async (req, res) => {
    switch (req.body.surfaceName) {
        case "CreativeDiscoverySurface_Frontend":
            if (req.body.panelName) {
                for (var i in discovery.Panels) {
                    if (discovery.Panels[i].PanelName == req.body.panelName) {
                        res.json(discovery.Panels[i].Pages[req.body.pageIndex || 0])
                    }
                }
            } else {
                res.json(discovery);
            }
        break;

        default:
            res.json({});
    }
})

module.exports = express;