const XMLBuilder = require("xmlbuilder");
const uuid = require("uuid");

async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

function GetVersionInfo(req) {
    var memory = {
        season: 0,
        build: 0.0,
        CL: "",
        lobby: ""
    }

    if (req.headers["user-agent"])
    {
        var CL = "";

        try {
            var BuildID = req.headers["user-agent"].split("-")[3].split(",")[0]
            if (!Number.isNaN(Number(BuildID))) {
                CL = BuildID;
            }

            if (Number.isNaN(Number(BuildID))) {
                var BuildID = req.headers["user-agent"].split("-")[3].split(" ")[0]
                if (!Number.isNaN(Number(BuildID))) {
                    CL = BuildID;
                }
            }
        } catch (err) {
            try {
                var BuildID = req.headers["user-agent"].split("-")[1].split("+")[0]
                if (!Number.isNaN(Number(BuildID))) {
                    CL = BuildID;
                }
            } catch (err) {}
        }

        try {
            var Build = req.headers["user-agent"].split("Release-")[1].split("-")[0];

            if (Build.split(".").length == 3) {
                Value = Build.split(".");
                Build = Value[0] + "." + Value[1] + Value[2];
            }

            memory.season = Number(Build.split(".")[0]);
            memory.build = Number(Build);
            memory.CL = CL;
            memory.lobby = `LobbySeason${memory.season}`;

            if (Number.isNaN(memory.season)) {
                throw new Error();
            }
        } catch (err) {
            memory.season = 2;
            memory.build = 2.0;
            memory.CL = CL;
            memory.lobby = "LobbyWinterDecor";
        }
    }

    return memory;
}

function getItemShop() {
    const catalog = JSON.parse(JSON.stringify(require("./../responses/catalog.json")));
    const CatalogConfig = require("./../Config/catalog_config.json");

    try {
        for (var value in CatalogConfig) {
            if (Array.isArray(CatalogConfig[value].itemGrants)) {
                if (CatalogConfig[value].itemGrants.length != 0) {
                    const CatalogEntry = {"devName":"","offerId":"","fulfillmentIds":[],"dailyLimit":-1,"weeklyLimit":-1,"monthlyLimit":-1,"categories":[],"prices":[{"currencyType":"MtxCurrency","currencySubType":"","regularPrice":0,"finalPrice":0,"saleExpiration":"9999-12-02T01:12:00Z","basePrice":0}],"meta":{"NewDisplayAssetPath":"","SectionId":"Featured","LayoutId":"LawinServer.99","TileSize":"Small","AnalyticOfferGroupId":"LawinServer/Attitude8","FirstSeen":"2/2/2020"},"matchFilter":"","filterWeight":0,"appStoreId":[],"requirements":[],"offerType":"StaticPrice","giftInfo":{"bIsEnabled":false,"forcedGiftBoxTemplateId":"","purchaseRequirements":[],"giftRecordIds":[]},"refundable":true,"metaInfo":[{"key":"NewDisplayAssetPath","value":"="},{"key":"SectionId","value":"Featured"},{"key":"LayoutId","value":"LawinServer.99"},{"key":"TileSize","value":"Small"},{"key":"AnalyticOfferGroupId","value":"LawinServer/Attitude8"},{"key":"FirstSeen","value":"2/2/2020"}],"displayAssetPath":"","itemGrants":[],"sortPriority":0,"catalogGroupPriority":0};

                    if (value.toLowerCase().startsWith("daily")) {
                        catalog.storefronts.forEach((storefront, i) => {
                            if (storefront.name == "BRDailyStorefront") {
                                CatalogEntry.requirements = [];
                                CatalogEntry.itemGrants = [];

                                for (var x in CatalogConfig[value].itemGrants) {
                                    if (typeof CatalogConfig[value].itemGrants[x] == "string") {
                                        if (CatalogConfig[value].itemGrants[x].length != 0) {
                                            CatalogEntry.devName = CatalogConfig[value].itemGrants[0]
                                            CatalogEntry.offerId = CatalogConfig[value].itemGrants[0]

                                            CatalogEntry.requirements.push({ "requirementType": "DenyOnItemOwnership", "requiredId": CatalogConfig[value].itemGrants[x], "minQuantity": 1 })
                                            CatalogEntry.itemGrants.push({ "templateId": CatalogConfig[value].itemGrants[x], "quantity": 1 });
                                        }
                                    }
                                }

                                CatalogEntry.prices[0].basePrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].regularPrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].finalPrice = CatalogConfig[value].price

                                // Make featured items appear on the left side of the screen
                                CatalogEntry.sortPriority = -1

                                if (CatalogEntry.itemGrants.length != 0) {
                                    catalog.storefronts[i].catalogEntries.push(CatalogEntry);
                                }
                            }
                        })
                    }

                    if (value.toLowerCase().startsWith("featured")) {
                        catalog.storefronts.forEach((storefront, i) => {
                            if (storefront.name == "BRWeeklyStorefront") {
                                CatalogEntry.requirements = [];
                                CatalogEntry.itemGrants = [];

                                for (var x in CatalogConfig[value].itemGrants) {
                                    if (typeof CatalogConfig[value].itemGrants[x] == "string") {
                                        if (CatalogConfig[value].itemGrants[x].length != 0) {
                                            CatalogEntry.devName = CatalogConfig[value].itemGrants[0]
                                            CatalogEntry.offerId = CatalogConfig[value].itemGrants[0]

                                            CatalogEntry.requirements.push({ "requirementType": "DenyOnItemOwnership", "requiredId": CatalogConfig[value].itemGrants[x], "minQuantity": 1 })
                                            CatalogEntry.itemGrants.push({ "templateId": CatalogConfig[value].itemGrants[x], "quantity": 1 });
                                        }
                                    }
                                }

                                CatalogEntry.prices[0].basePrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].regularPrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].finalPrice = CatalogConfig[value].price

                                CatalogEntry.meta.TileSize = "Normal"
                                CatalogEntry.metaInfo[3].value = "Normal"

                                if (CatalogEntry.itemGrants.length != 0) {
                                    catalog.storefronts[i].catalogEntries.push(CatalogEntry);
                                }
                            }
                        })
                    }
                }
            }
        }
    } catch (err) {}

    return catalog;
}

function getTheater(req) {
    const memory = GetVersionInfo(req);

    var theater = JSON.stringify(require("./../responses/Campaign/worldstw.json"));
    var Season = "Season" + memory.season;

    try {
        if (memory.build >= 15.30) {
            theater = theater.replace(/\/Game\//ig, "\/SaveTheWorld\/");
            theater = theater.replace(/\"DataTable\'\/SaveTheWorld\//ig, "\"DataTable\'\/Game\/");
        }

        var date = new Date();
        var hour = date.getHours();

        // Set the 24-hour StW mission refresh date for version season 9 and above
        if (memory.season >= 9) {
            date.setHours(23, 59, 59, 999);
        } else {
            // Set the 6-hour StW mission refresh date for versions below season 9
            if (hour < 6) {
                date.setHours(5, 59, 59, 999);
            } else if (hour < 12) {
                date.setHours(11, 59, 59, 999);
            } else if (hour < 18) {
                date.setHours(17, 59, 59, 999);
            } else {
                date.setHours(23, 59, 59, 999);
            }
        }

        date = date.toISOString();

        theater = theater.replace(/2017-07-25T23:59:59.999Z/ig, date);
    } catch (err) {}

    theater = JSON.parse(theater)

    if (theater.hasOwnProperty("Seasonal")) {
        if (theater.Seasonal.hasOwnProperty(Season)) {
            theater.theaters = theater.theaters.concat(theater.Seasonal[Season].theaters);
            theater.missions = theater.missions.concat(theater.Seasonal[Season].missions);
            theater.missionAlerts = theater.missionAlerts.concat(theater.Seasonal[Season].missionAlerts);
        }
        delete theater.Seasonal;
    }

    return theater;
}

function getContentPages(req) {
    const memory = GetVersionInfo(req);

    const contentpages = JSON.parse(JSON.stringify(require("./../responses/contentpages.json")));

    var Language = "en";

    if (req.headers["accept-language"]) {
        if (req.headers["accept-language"].includes("-") && req.headers["accept-language"] != "es-419" && req.headers["accept-language"] != "pt-BR") {
            Language = req.headers["accept-language"].split("-")[0];
        } else {
            Language = req.headers["accept-language"];
        }
    }

    const modes = ["saveTheWorldUnowned", "battleRoyale", "creative", "saveTheWorld"];
    const news = ["savetheworldnews", "battleroyalenews"]
    const motdnews = ["battleroyalenews", "battleroyalenewsv2"]

    try {
        modes.forEach(mode => {
            contentpages.subgameselectdata[mode].message.title = contentpages.subgameselectdata[mode].message.title[Language]
            contentpages.subgameselectdata[mode].message.body = contentpages.subgameselectdata[mode].message.body[Language]
        })
    } catch (err) {}

    try {
        if (memory.build < 5.30) { 
            news.forEach(mode => {
                contentpages[mode].news.messages[0].image = "https://fortnite-public-service-prod11.ol.epicgames.com/images/discord-s.png";
                contentpages[mode].news.messages[1].image = "https://fortnite-public-service-prod11.ol.epicgames.com/images/lawin-s.png";
            })
        }
    } catch (err) {}

    try {
        motdnews.forEach(news => {
            contentpages[news].news.motds.forEach(motd => {
                motd.title = motd.title[Language];
                motd.body = motd.body[Language];
            })
        })
    } catch (err) {}

    try {
        const backgrounds = contentpages.dynamicbackgrounds.backgrounds.backgrounds;
        const season = `season${memory.season}${memory.season >= 21 ? "00" : ""}`;
        backgrounds[0].stage = season;
        backgrounds[1].stage = season;
        
        if (memory.season == 10) {
            backgrounds[0].stage = "seasonx";
            backgrounds[1].stage = "seasonx";
        } else if (memory.build == 11.31 || memory.build == 11.40) {
            backgrounds[0].stage = "Winter19";
            backgrounds[1].stage = "Winter19";
        } else if (memory.build == 19.01) {
            backgrounds[0].stage = "winter2021";
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
            contentpages.subgameinfo.battleroyale.image = "https://cdn2.unrealengine.com/19br-wf-subgame-select-512x1024-16d8bb0f218f.jpg";
            contentpages.specialoffervideo.bSpecialOfferEnabled = "true";
        } else if (memory.season == 20) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-lobby-2048x1024-d89eb522746c.png";
            if (memory.build == 20.40) {
                backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp20-40-armadillo-glowup-lobby-2048x2048-2048x2048-3b83b887cc7f.jpg";
            }
        } else if (memory.season == 21) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s21-lobby-background-2048x1024-2e7112b25dc3.jpg";
            if (memory.build == 21.10) {
                backgrounds[0].stage = "season2100";
            }
            if (memory.build == 21.30) {
                backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/nss-lobbybackground-2048x1024-f74a14565061.jpg";
                backgrounds[0].stage = "season2130";
            }
        } else if (memory.season == 22) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
        } else if (memory.season == 23) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png";
            if (memory.build == 23.10) {
                backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png";
                contentpages.specialoffervideo.bSpecialOfferEnabled = "true";
            }
        } else if (memory.season == 24) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-ch4s2-bp-lobby-4096x2048-edde08d15f7e.jpg";
        } else if (memory.season == 25) {
            backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/s25-lobby-4k-4096x2048-4a832928e11f.jpg";
            backgrounds[1].backgroundimage = "https://cdn2.unrealengine.com/fn-shop-ch4s3-04-1920x1080-785ce1d90213.png";
            if (memory.build == 25.11) {
                backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-s25-14dos-lobby-4096x2048-2be24969eee3.jpg";
            }
        } else if (memory.season == 27) {
            backgrounds[0].stage = "rufus";
        } else {
            backgrounds[0].stage = "defaultnotris";
            backgrounds[0].backgroundimage = "https://fortnite-public-service-prod11.ol.epicgames.com/images/lightlobbybg.png";
        }

    } catch (err) {}

    return contentpages;
}

function MakeSurvivorAttributes(templateId) {
    const SurvivorData = require("./../responses/Campaign/survivorData.json");
    var SurvivorAttributes = {
        "level": 1,
        "item_seen": false,
        "squad_slot_idx": -1,
        "building_slot_used": -1
    };

    if (SurvivorData.fixedAttributes.hasOwnProperty(templateId)) {
        SurvivorAttributes = {...SurvivorAttributes, ...SurvivorData.fixedAttributes[templateId]};
    }

    if (!SurvivorAttributes.hasOwnProperty("gender")) {
        SurvivorAttributes.gender = (Math.floor(Math.random() * (1 - 3) + 3)).toString(); // Set a random survivor gender ("1" = male, "2" = female)
    }

    if (!SurvivorAttributes.hasOwnProperty("managerSynergy")) {
        var randomNumber = Math.floor(Math.random() * SurvivorData.bonuses.length);
        SurvivorAttributes.set_bonus = SurvivorData.bonuses[randomNumber];
    }
    
    if (!SurvivorAttributes.hasOwnProperty("personality")) {
        var randomNumber = Math.floor(Math.random() * SurvivorData.personalities.length);
        SurvivorAttributes.personality = SurvivorData.personalities[randomNumber];
    }

    if (!SurvivorAttributes.hasOwnProperty("portrait")) {
        portraitFactor = SurvivorAttributes.personality;
        if (SurvivorAttributes.hasOwnProperty("managerSynergy")) {
            portraitFactor = SurvivorAttributes.managerSynergy;
        }

        var gender = SurvivorAttributes.gender
        var randomNumber = Math.floor(Math.random() * SurvivorData.portraits[portraitFactor][gender].length);
        SurvivorAttributes.portrait = SurvivorData.portraits[portraitFactor][gender][randomNumber];
    }

    return SurvivorAttributes;
}

function MakeID() {
    return uuid.v4();
}

function sendXmppMessageToAll(body) {
    if (global.Clients) {
        if (typeof body == "object") body = JSON.stringify(body);

        global.Clients.forEach(ClientData => {
            ClientData.client.send(XMLBuilder.create("message")
            .attribute("from", "xmpp-admin@prod.ol.epicgames.com")
            .attribute("xmlns", "jabber:client")
            .attribute("to", ClientData.jid)
            .element("body", `${body}`).up().toString());
        });
    }
}

function DecodeBase64(str) {
    return Buffer.from(str, 'base64').toString()
}

module.exports = {
    sleep,
    GetVersionInfo,
    getItemShop,
    getTheater,
    getContentPages,
    MakeSurvivorAttributes,
    MakeID,
    sendXmppMessageToAll,
    DecodeBase64
}