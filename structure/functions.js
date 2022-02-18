const crypto = require("crypto");
const memory = require("./../memory.json");

function GetVersionInfo(req, memory) {
    if (req.headers["user-agent"])
    {
        var CL = "";

        if (req.headers["user-agent"]) {
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
}

function getItemShop() {
    const catalog = JSON.parse(JSON.stringify(require("./../responses/catalog.json")));
    const CatalogConfig = require("./../Config/catalog_config.json");

    try {
        for (var value in CatalogConfig) {
            if (Array.isArray(CatalogConfig[value].itemGrants)) {
                if (CatalogConfig[value].itemGrants.length != 0) {
                    const CatalogEntry = {"devName":"","offerId":"","fulfillmentIds":[],"dailyLimit":-1,"weeklyLimit":-1,"monthlyLimit":-1,"categories":[],"prices":[{"currencyType":"MtxCurrency","currencySubType":"","regularPrice":0,"finalPrice":0,"saleExpiration":"9999-12-02T01:12:00Z","basePrice":0}],"matchFilter":"","filterWeight":0,"appStoreId":[],"requirements":[],"offerType":"StaticPrice","giftInfo":{"bIsEnabled":false,"forcedGiftBoxTemplateId":"","purchaseRequirements":[],"giftRecordIds":[]},"refundable":true,"metaInfo":[],"displayAssetPath":"","itemGrants":[],"sortPriority":0,"catalogGroupPriority":0};

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

                                for (var i in CatalogConfig[value].itemGrants) {
                                    if (typeof CatalogConfig[value].itemGrants[i] == "string") {
                                        if (CatalogConfig[value].itemGrants[i].length != 0) {
                                            CatalogEntry.devName = CatalogConfig[value].itemGrants[0]
                                            CatalogEntry.offerId = CatalogConfig[value].itemGrants[0]

                                            CatalogEntry.requirements.push({ "requirementType": "DenyOnItemOwnership", "requiredId": CatalogConfig[value].itemGrants[i], "minQuantity": 1 })
                                            CatalogEntry.itemGrants.push({ "templateId": CatalogConfig[value].itemGrants[i], "quantity": 1 });
                                        }
                                    }
                                }

                                CatalogEntry.prices[0].basePrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].regularPrice = CatalogConfig[value].price
                                CatalogEntry.prices[0].finalPrice = CatalogConfig[value].price

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
    GetVersionInfo(req, memory);

    var theater = JSON.stringify(require("./../responses/worldstw.json"));

    try {
        if (memory.build >= 15.30) {
            theater = theater.replace(/\/Game\//ig, "\/SaveTheWorld\/");
            theater = theater.replace(/\"DataTable\'\/SaveTheWorld\//ig, "\"DataTable\'\/Game\/");
        }

        var date = new Date().toISOString()

        // Set the 24-hour StW mission refresh date for version season 9 and above
        if (memory.season >= 9) {
            date = date.split("T")[0] + "T23:59:59.999Z";
        } else {
            // Set the 6-hour StW mission refresh date for versions below season 9
            if (date < (date.split("T")[0] + "T05:59:59.999Z")) {
                date = date.split("T")[0] + "T05:59:59.999Z";
            } else if (date < (date.split("T")[0] + "T11:59:59.999Z")) {
                date = date.split("T")[0] + "T11:59:59.999Z";
            } else if (date < (date.split("T")[0] + "T17:59:59.999Z")) {
                date = date.split("T")[0] + "T17:59:59.999Z";
            } else if (date < (date.split("T")[0] + "T23:59:59.999Z")) {
                date = date.split("T")[0] + "T23:59:59.999Z";
            }
        }

        theater = theater.replace(/2017-07-25T23:59:59.999Z/ig, date);
    } catch (err) {}

    theater = JSON.parse(theater)

    return theater;
}

function getContentPages(req) {
    GetVersionInfo(req, memory);

    const contentpages = JSON.parse(JSON.stringify(require("./../responses/contentpages.json")));

    var Language = "en";

    if (req.headers["accept-language"]) {
        if (req.headers["accept-language"].includes("-") && req.headers["accept-language"] != "es-419") {
            Language = req.headers["accept-language"].split("-")[0];
        } else {
            Language = req.headers["accept-language"];
        }
    }

    const modes = ["saveTheWorldUnowned", "battleRoyale", "creative", "saveTheWorld"];
    const news = ["savetheworldnews", "battleroyalenews"]

    try {
        modes.forEach(mode => {
            contentpages.subgameselectdata[mode].message.title = contentpages.subgameselectdata[mode].message.title[Language]
            contentpages.subgameselectdata[mode].message.body = contentpages.subgameselectdata[mode].message.body[Language]
        })
    } catch (err) {}

    try {
        if (memory.season < 5 || (memory.season == 5 && Number(memory.build.toString().split(".")[1]) < 30)) { 
            news.forEach(mode => {
                contentpages[mode].news.messages[0].image = "https://cdn.discordapp.com/attachments/927739901540188200/930879507496308736/discord.png";
                contentpages[mode].news.messages[1].image = "https://cdn.discordapp.com/attachments/927739901540188200/930879519882088508/lawin.png";
            })
        }
    } catch (err) {}

    try {
        contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = `season${memory.season}`;
        contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = `season${memory.season}`;

        if (memory.season == 10) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "seasonx";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "seasonx";
        }

        if (memory.build == 11.31 || memory.build == 11.40) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "Winter19";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[1].stage = "Winter19";
        }

        if (memory.build == 19.01) {
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].stage = "winter2021";
            contentpages.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn.discordapp.com/attachments/927739901540188200/930880158167085116/t-bp19-lobby-xmas-2048x1024-f85d2684b4af.png";
            contentpages.subgameinfo.battleroyale.image = "https://cdn.discordapp.com/attachments/927739901540188200/930880421514846268/19br-wf-subgame-select-512x1024-16d8bb0f218f.jpg";
            contentpages.specialoffervideo.bSpecialOfferEnabled = "true";
        }
    } catch (err) {}

    return contentpages;
}

function MakeID() {
    let CurrentDate = (new Date()).valueOf().toString();
    let RandomFloat = Math.random().toString();
    let ID = crypto.createHash('md5').update(CurrentDate + RandomFloat).digest('hex');
    let FinishedID = ID.slice(0, 8) + "-" + ID.slice(8, 12) + "-" + ID.slice(12, 16) + "-" + ID.slice(16, 20) + "-" + ID.slice(20, 32);

    return FinishedID;
}

module.exports = {
    GetVersionInfo,
    getItemShop,
    getTheater,
    getContentPages,
    MakeID
}