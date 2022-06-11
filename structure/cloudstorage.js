const Express = require("express");
const express = Express.Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const functions = require("./functions.js");

express.use((req, res, next) => {
    // Get raw body in encoding latin1 for ClientSettings
    if (req.originalUrl.toLowerCase().startsWith("/fortnite/api/cloudstorage/user/") && req.method == "PUT") {
        req.rawBody = "";
        req.setEncoding("latin1");

        req.on("data", (chunk) => req.rawBody += chunk);
        req.on("end", () => next());
    }
    else return next();
})

express.get("/fortnite/api/cloudstorage/system", async (req, res) => {
    const memory = functions.GetVersionInfo(req);

    if (memory.build >= 9.40 && memory.build <= 10.40) {
        return res.status(404).end();
    }

    const dir = path.join(__dirname, "..", "CloudStorage")
    var CloudFiles = [];

    fs.readdirSync(dir).forEach(name => {
        if (name.toLowerCase().endsWith(".ini")) {
            const ParsedFile = fs.readFileSync(path.join(dir, name), 'utf-8');
            const ParsedStats = fs.statSync(path.join(dir, name));

            CloudFiles.push({
                "uniqueFilename": name,
                "filename": name,
                "hash": crypto.createHash('sha1').update(ParsedFile).digest('hex'),
                "hash256": crypto.createHash('sha256').update(ParsedFile).digest('hex'),
                "length": ParsedFile.length,
                "contentType": "application/octet-stream",
                "uploaded": ParsedStats.mtime,
                "storageType": "S3",
                "storageIds": {},
                "doNotCache": true
            })
        }
    });

    res.json(CloudFiles)
})

express.get("/fortnite/api/cloudstorage/system/:file", async (req, res) => {
    const file = path.join(__dirname, "..", "CloudStorage", req.params.file);

    if (fs.existsSync(file)) {
        const ParsedFile = fs.readFileSync(file);

        return res.status(200).send(ParsedFile).end();
    } else {
        res.status(200);
        res.end();
    }
})

express.get("/fortnite/api/cloudstorage/user/*/:file", async (req, res) => {
    try {
        if (!fs.existsSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"))) {
            fs.mkdirSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"));
        }
    } catch (err) {}

    res.set("Content-Type", "application/octet-stream")

    if (req.params.file.toLowerCase() != "clientsettings.sav") {
        return res.status(404).json({
            "error": "file not found"
        });
    }

    const memory = functions.GetVersionInfo(req);

    var currentBuildID = memory.CL;

    let file;
    if (process.env.LOCALAPPDATA) file = path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);
    else file = path.join(__dirname, "..", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);

    if (fs.existsSync(file)) {
        const ParsedFile = fs.readFileSync(file);

        return res.status(200).send(ParsedFile).end();
    } else {
        res.status(200);
        res.end();
    }
})

express.get("/fortnite/api/cloudstorage/user/:accountId", async (req, res) => {
    try {
        if (!fs.existsSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"))) {
            fs.mkdirSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"));
        }
    } catch (err) {}

    res.set("Content-Type", "application/json")

    const memory = functions.GetVersionInfo(req);

    var currentBuildID = memory.CL;
    
    let file;
    if (process.env.LOCALAPPDATA) file = path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);
    else file = path.join(__dirname, "..", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);

    if (fs.existsSync(file)) {
        const ParsedFile = fs.readFileSync(file, 'latin1');
        const ParsedStats = fs.statSync(file);

        return res.json([{
            "uniqueFilename": "ClientSettings.Sav",
            "filename": "ClientSettings.Sav",
            "hash": crypto.createHash('sha1').update(ParsedFile).digest('hex'),
            "hash256": crypto.createHash('sha256').update(ParsedFile).digest('hex'),
            "length": Buffer.byteLength(ParsedFile),
            "contentType": "application/octet-stream",
            "uploaded": ParsedStats.mtime,
            "storageType": "S3",
            "storageIds": {},
            "accountId": req.params.accountId,
            "doNotCache": true
        }]);
    } else {
        return res.json([]);
    }
})

express.put("/fortnite/api/cloudstorage/user/*/:file", async (req, res) => {
    try {
        if (!fs.existsSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"))) {
            fs.mkdirSync(path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings"));
        }
    } catch (err) {}

    if (req.params.file.toLowerCase() != "clientsettings.sav") {
        return res.status(404).json({
            "error": "file not found"
        });
    }

    const memory = functions.GetVersionInfo(req);

    var currentBuildID = memory.CL;

    let file;
    if (process.env.LOCALAPPDATA) file = path.join(process.env.LOCALAPPDATA, "LawinServer", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);
    else file = path.join(__dirname, "..", "ClientSettings", `ClientSettings-${currentBuildID}.Sav`);

    fs.writeFileSync(file, req.rawBody, 'latin1');
    res.status(204).end();
})

module.exports = express;