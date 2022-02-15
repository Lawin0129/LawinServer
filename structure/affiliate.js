const Express = require("express");
const express = Express.Router();

express.get("/affiliate/api/public/affiliates/slug/:slug", async (req, res) => {
    const SupportedCodes = require("./../responses/SAC.json");
    var ValidCode = false;

    SupportedCodes.forEach(code => {
        if (req.params.slug.toLowerCase() == code.toLowerCase()) {
            ValidCode = true;
            return res.json({
                "id": code,
                "slug": code,
                "displayName": code,
                "status": "ACTIVE",
                "verified": false
            });
        }
    })

    if (ValidCode == false) {
        res.status(404);
        res.json({});
    }
})

module.exports = express;