const Express = require("express");
const express = Express();
const fs = require("fs");
const path = require("path");

express.use(Express.json());
express.use(Express.urlencoded({ extended: true }));
express.use(Express.static('public'));

express.use(require("./structure/party.js"));
express.use(require("./structure/discovery.js"))
express.use(require("./structure/privacy.js"));
express.use(require("./structure/timeline.js"));
express.use(require("./structure/user.js"));
express.use(require("./structure/contentpages.js"));
express.use(require("./structure/friends.js"));
express.use(require("./structure/main.js"));
express.use(require("./structure/storefront.js"));
express.use(require("./structure/version.js"));
express.use(require("./structure/lightswitch.js"));
express.use(require("./structure/affiliate.js"));
express.use(require("./structure/matchmaking.js"));
express.use(require("./structure/cloudstorage.js"));
express.use(require("./structure/mcp.js"));

const port = process.env.PORT || 3551;
express.listen(port, console.log("LawinServer started listening on port", port));
require("./structure/xmpp.js");

if (!fs.existsSync(path.join(process.env.LOCALAPPDATA, "LawinServer"))) fs.mkdirSync(path.join(process.env.LOCALAPPDATA, "LawinServer"));

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