const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

express.get("/content/api/pages/fortnite-game/spark-tracks", async (req, res) => {
    const sparkTracks = require("./../responses/Athena/sparkTracks.json");

    res.json(sparkTracks)
})

express.get("/content/api/pages/fortnite-game/radio-stations", async (req, res) => {
    res.json({
        "_title": "Radio Stations",
        "radioStationList": {
            "_type": "RadioStationList",
            "stations": [
                {
                    "resourceID": "QWGQAynCdixzoLIdJl",
                    "stationImage": "https://fortnite-public-service-prod11.ol.epicgames.com/images/lawinpfp.png",
                    "_type": "RadioStationItem",
                    "title": {
                        "ar": "الحفل الملكي",
                        "de": "Party Royale",
                        "en": "Party Royale",
                        "es": "Fiesta magistral",
                        "es-419": "Fiesta campal",
                        "fr": "Fête royale",
                        "it": "Party Reale",
                        "ja": "パーティーロイヤル",
                        "ko": "파티로얄",
                        "pl": "Królewska Impreza",
                        "pt-BR": "Festa Royale",
                        "ru": "Королевская вечеринка",
                        "tr": "Çılgın Parti",
                        "zh-CN": "空降派对",
                        "zh-Hant": "空降派對"
                    }
                }
            ]
        },
        "_noIndex": false,
        "_activeDate": "2024-06-13T10:00:00.000Z",
        "lastModified": "2024-06-12T20:12:56.271Z",
        "_locale": "en-US",
        "_templateName": "FortniteGameRadioStations",
        "_suggestedPrefetch": []
    })
})

express.get("/content/api/pages/*", async (req, res) => {
    const contentpages = functions.getContentPages(req);

    res.json(contentpages)
})

express.post("/api/v1/fortnite-br/*/target", async (req, res) => {
    const motd = JSON.parse(JSON.stringify(require("./../responses/Athena/motd.json")));
    var language = req.body.language || req.body.parameters.language;
    functions.chooseTranslationsInJSON(motd, language)

    if (req.body.hasOwnProperty("tags")) {
        motd.contentItems.forEach(item => {
            item.placements = [];
            req.body.tags.forEach(tag => {
                item.placements.push({
                    "trackingId": "lawinstrackingidlol",
                    "tag": tag,
                    "position": 0
                })
            })
        })    
    }
    
    res.json(motd)
})

module.exports = express;