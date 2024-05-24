const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");
const fs = require("fs");
const path = require("path");
const iniparser = require("ini");
const config = iniparser.parse(fs.readFileSync(path.join(__dirname, "..", "Config", "config.ini")).toString());

express.get("/fortnite/api/calendar/v1/timeline", async (req, res) => {
    const memory = functions.GetVersionInfo(req);

    var activeEvents = [
    {
        "eventType": `EventFlag.Season${memory.season}`,
        "activeUntil": "9999-01-01T00:00:00.000Z",
        "activeSince": "2020-01-01T00:00:00.000Z"
    },
    {
        "eventType": `EventFlag.${memory.lobby}`,
        "activeUntil": "9999-01-01T00:00:00.000Z",
        "activeSince": "2020-01-01T00:00:00.000Z"
    }];

    switch (memory.season) {
        case 3:
            activeEvents.push(
            {
                "eventType": "EventFlag.Spring2018Phase1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build >= 3.1) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Spring2018Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build >= 3.3) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Spring2018Phase3",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build >= 3.4) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Spring2018Phase4",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;
        
        case 4:
            activeEvents.push(
            {
                "eventType": "EventFlag.Blockbuster2018",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Blockbuster2018Phase1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build >= 4.3) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Blockbuster2018Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build >= 4.4) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Blockbuster2018Phase3",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build >= 4.5) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Blockbuster2018Phase4",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;
        
        case 5:
            activeEvents.push(
            {
                "eventType": "EventFlag.RoadTrip2018",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Horde",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Anniversary2018_BR",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Heist",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build == 5.10) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.BirthdayBattleBus",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 6:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTM_Fortnitemares",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_LilKevin",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build >= 6.20) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Fortnitemares",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.FortnitemaresPhase1",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "POI0",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build >= 6.22) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.FortnitemaresPhase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            if (memory.build == 6.20 || memory.build == 6.21) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.LobbySeason6Halloween",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.HalloweenBattleBus",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 7:
            activeEvents.push(
            {
                "eventType": "EventFlag.Frostnite",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_14DaysOfFortnite",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Festivus",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_WinterDeimos",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_S7_OverTime",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 8:
            activeEvents.push(
            {
                "eventType": "EventFlag.Spring2019",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Spring2019.Phase1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Ashton",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Goose",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_HighStakes",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_BootyBay",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build >= 8.2) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Spring2019.Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 9:
            activeEvents.push(
            {
                "eventType": "EventFlag.Season9.Phase1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Anniversary2019_BR",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_14DaysOfSummer",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Mash",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Wax",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build >= 9.2) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Season9.Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 10:
            activeEvents.push(
            {
                "eventType": "EventFlag.Mayday",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10.Phase2",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10.Phase3",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_BlackMonday",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S10_Oak",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S10_Mystery",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_2",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_3",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_4",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_5",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_6",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_7",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_8",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_9",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Season10_UrgentMission_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 11:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTE_CoinCollectXP",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z" 
            },
            {
                "eventType": "EventFlag.LTE_Fortnitemares2019",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z" 
            },
            {
                "eventType": "EventFlag.LTE_Galileo_Feats",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z" 
            },
            {
                "eventType": "EventFlag.LTE_Galileo",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z" 
            },
            {
                "eventType": "EventFlag.LTE_WinterFest2019",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
    
            if (memory.build >= 11.2) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Starlight",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                })
            }
    
            if (memory.build < 11.3) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Season11.Fortnitemares.Quests.Phase1",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                },
                {
                    "eventType": "EventFlag.Season11.Fortnitemares.Quests.Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                },
                {
                    "eventType": "EventFlag.Season11.Fortnitemares.Quests.Phase3",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                },
                {
                    "eventType": "EventFlag.Season11.Fortnitemares.Quests.Phase4",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                },
                {
                    "eventType": "EventFlag.StormKing.Landmark",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z" 
                })
            } else {
                activeEvents.push(
                {
                    "eventType": "EventFlag.HolidayDeco",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.Season11.WinterFest.Quests.Phase1",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.Season11.WinterFest.Quests.Phase2",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.Season11.WinterFest.Quests.Phase3",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.Season11.Frostnite",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
    
            // Credits to Silas for these BR Winterfest event flags
            if (memory.build == 11.31 || memory.build == 11.40) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.Winterfest.Tree",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.LTE_WinterFest",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.LTE_WinterFest2019",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 12:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTE_SpyGames",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_JerkyChallenges",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Oro",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_StormTheAgency",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 14:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTE_Fortnitemares_2020",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 15:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_01",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_02",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_03",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_04",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_05",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_06",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_07",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_08",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_09",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_11",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_12",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_13",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_14",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S15_Legendary_Week_15",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_HiddenRole",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_OperationSnowdown",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_PlumRetro",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 16:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_01",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_02",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_03",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_04",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_05",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_06",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_07",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_08",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_09",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_11",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S16_Legendary_Week_12",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_NBA_Challenges",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_Spire_Challenges",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 17:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_TheMarch",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_O2_Challenges",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Buffet_PreQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Buffet_Attend",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Buffet_PostQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Buffet_Cosmetics",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_CosmicSummer",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_IslandGames",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_01",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_02",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_03",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_04",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_05",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_06",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_07",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_08",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_09",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_11",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_12",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_13",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Legendary_Week_14",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_CB_Radio",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Sneak_Week",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Yeet_Week",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Zap_Week",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S17_Bargain_Bin_Week",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 18:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTE_Season18_BirthdayQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_07",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_08",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_09",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_11",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_12",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_06",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_Fornitemares_2021",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_HordeRush",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_SoundWave",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Season18_TextileQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S18_WildWeek_Shadows",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S18_WildWeek_Bargain",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S18_Haste",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 19:
            activeEvents.push(
            {
                "eventType": "EventFlag.LTM_Hyena",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_Vigilante",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTM_ZebraWallet",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.LTE_Galileo_Feats",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S19_Trey",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S19_DeviceQuestsPart1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S19_DeviceQuestsPart2",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S19_DeviceQuestsPart3",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S19_Gow_Quests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_MonarchLevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S19_WinterfestCrewGrant",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S19_WildWeeks_Chicken",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S19_WildWeeks_BargainBin",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S19_WildWeeks_Spider",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S19_WildWeeks_Primal",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build == 19.01) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.LTE_WinterFest",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "WF_IG_AVAIL",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 20:
            activeEvents.push(
            {
                "eventType": "Event_S20_AliQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S20_EmicidaQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S20_WildWeeks_Bargain",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S20_WildWeeks_Chocolate",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S20_WildWeeks_Purple",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.CovertOps_Phase1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.CovertOps_Phase2",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.CovertOps_Phase3",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.CovertOps_Phase4",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S20_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S20_May4thQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.NoBuildQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S20_NoBuildQuests_TokenGrant",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 21:
            activeEvents.push(
            {
                "eventType": "Event_S21_FallFest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_IslandHopper",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_CRRocketQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_GenQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_Stamina",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S21_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_NoSweatSummer",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_WildWeeks_BargainBin",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_WildWeeks_Fire",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S21_WildWeeks_Kondor",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 22:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S22_BirthdayQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S22_DistantEcho",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S22_AyaQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S22_FNCSQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S22FortnitemaresQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S22_Headset",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S22HordeRush",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "Event_S22_VistaQuest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S22_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S22NarrativePart1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S22_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S22_WildWeek_Avian",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.S22_WildWeek_Bargain",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 23:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S23_Weekly_01",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_02",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_03",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_04",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_05",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_06",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_07",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_08",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_09",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_10",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_11",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Weekly_12",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23Cipher",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Emerald",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_FindIt",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_CreedQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_Lettuce",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart1",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart2",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart3",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart4",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart4BonusGoal",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23NarrativePart5",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_SunBurst",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S23_ZeroWeek",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            if (memory.build == 23.10) {
                activeEvents.push(
                {
                    "eventType": "EventFlag.LTE_WinterFest",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "EventFlag.LTE_WinterFestTab",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                },
                {
                    "eventType": "WF_GUFF_AVAIL",
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                })
            }
            break;

        case 24:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S24_SpringFling",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_TigerRoot",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_Epicenter",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_SunBurst",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_NarrativeQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S24_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 25:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S25_14DOS",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S25_AloeCrouton",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S25_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S25_Maze",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S25_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 26:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S26_BirthdayQuests",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S26_FNM",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S26_Mash",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S26_Intertwine",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S26_LevelUpPack",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 27:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S27_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;
        
        case 28:
            activeEvents.push(
            {
                "eventType": "EventFlag.Event_S28_LevelUpPass",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S28_Prelude",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S28_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S28_Winterfest",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;

        case 29:
            activeEvents.push(
            {
                "eventType": "Event_S29_ColdDayPrelude",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S29_LevelUpPass",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S29_RebootRally",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S29_SeasonalActivation",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            },
            {
                "eventType": "EventFlag.Event_S29_WhiplashWW",
                "activeUntil": "9999-01-01T00:00:00.000Z",
                "activeSince": "2020-01-01T00:00:00.000Z"
            })
            break;
    }

    if (24.3 <= memory.build && memory.build <= 25) {
        activeEvents.push(
        {
            "eventType": "EventFlag.HordeV3",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week02",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week03",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week04",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week05",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week06",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week07",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.HordeV3.Week08",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        })
    }

    if (config.Profile.bAllSTWEventsActivated == true) {
        var Events = [
            "EventFlag.Blockbuster2018",
            "EventFlag.Blockbuster2018Phase1",
            "EventFlag.Blockbuster2018Phase2",
            "EventFlag.Blockbuster2018Phase3",
            "EventFlag.Blockbuster2018Phase4",
            "EventFlag.Fortnitemares",
            "EventFlag.FortnitemaresPhase1",
            "EventFlag.FortnitemaresPhase2",
            "EventFlag.Frostnite",
            "EventFlag.HolidayDeco",
            "EventFlag.Horde",
            "EventFlag.HordeV3",
            "EventFlag.Mayday",
            "EventFlag.Outpost",
            "EventFlag.Phoenix.Adventure",
            "EventFlag.Phoenix.Fortnitemares",
            "EventFlag.Phoenix.Fortnitemares.Clip",
            "EventFlag.Phoenix.NewBeginnings",
            "EventFlag.Phoenix.NewBeginnings.SpringTraining",
            "EventFlag.Phoenix.RoadTrip",
            "EventFlag.Phoenix.Winterfest",
            "EventFlag.Phoenix.Winterfest.GhostOfChristmas",
            "EventFlag.RoadTrip2018",
            "EventFlag.STWBrainstorm",
            "EventFlag.STWFennix",
            "EventFlag.STWIrwin",
            "EventFlag.Season10.Phase2",
            "EventFlag.Season10.Phase3",
            "EventFlag.Season11.Fortnitemares.Quests.Phase1",
            "EventFlag.Season11.Fortnitemares.Quests.Phase2",
            "EventFlag.Season11.Fortnitemares.Quests.Phase3",
            "EventFlag.Season11.Fortnitemares.Quests.Phase4",
            "EventFlag.Season11.Frostnite",
            "EventFlag.Season11.WinterFest.Quests.Phase1",
            "EventFlag.Season11.WinterFest.Quests.Phase2",
            "EventFlag.Season11.WinterFest.Quests.Phase3",
            "EventFlag.Season12.NoDancing.Quests",
            "EventFlag.Season12.Spies.Quests",
            "EventFlag.Season9.Phase1",
            "EventFlag.Season9.Phase2",
            "EventFlag.Spring2018Phase1",
            "EventFlag.Spring2018Phase2",
            "EventFlag.Spring2018Phase3",
            "EventFlag.Spring2018Phase4",
            "EventFlag.Spring2019",
            "EventFlag.Spring2019.Phase1",
            "EventFlag.Spring2019.Phase2",
            "EventFlag.Starlight",
            "EventFlag.StormKing.Landmark",
            "EventFlag.YarrrTwo"
        ]

        var activeEventsSet = new Set(activeEvents.map(e => e.eventType));
        for (var i = 0; i < Events.length; i++) {
            var Event = Events[i];
            if (!activeEventsSet.has(Event)) {
                activeEvents.push({
                    "eventType": Event,
                    "activeUntil": "9999-01-01T00:00:00.000Z",
                    "activeSince": "2020-01-01T00:00:00.000Z"
                });
            }
        }
    }

    const stateTemplate = {
        "activeStorefronts": [],
        "eventNamedWeights": {},
        "seasonNumber": memory.season,
        "seasonTemplateId": `AthenaSeason:athenaseason${memory.season}`,
        "matchXpBonusPoints": 0,
        "seasonBegin": "2020-01-01T13:00:00Z",
        "seasonEnd": "9999-01-01T14:00:00Z",
        "seasonDisplayedEnd": "9999-01-01T07:30:00Z",
        "weeklyStoreEnd": "9999-01-01T00:00:00Z",
        "stwEventStoreEnd": "9999-01-01T00:00:00.000Z",
        "stwWeeklyStoreEnd": "9999-01-01T00:00:00.000Z",
        "sectionStoreEnds": {
            "Featured": "9999-01-01T00:00:00.000Z"
        },
        "dailyStoreEnd": "9999-01-01T00:00:00Z"
    };
    
    var states = [{
        validFrom: "2020-01-01T00:00:00.000Z",
        activeEvents: activeEvents.slice(),
        state: stateTemplate
    }]

    if (memory.build == 4.5) {
        if (config.Events.bEnableGeodeEvent == true) {
            states[0].activeEvents.push({
                "eventType": "EventFlag.BR_S4_Geode_Countdown",
                "activeUntil": config.Events.geodeEventStartDate
            })
            
            states.push({
                validFrom: config.Events.geodeEventStartDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })

            var EventEndDate = new Date(new Date(config.Events.geodeEventStartDate).getTime() + 3 * 60000).toISOString();

            states[1].activeEvents.push({
                "eventType": "EventFlag.BR_S4_Geode_Begin",
                "activeUntil": EventEndDate
            })

            activeEvents.push({
                "eventType": "EventFlag.BR_S4_Geode_Over",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })

            if (config.Events.bEnableCrackInTheSky == true) {
                activeEvents.push({
                    "eventType": "EventFlag.BR_S4_Rift_Growth",
                    "activeUntil": new Date(new Date(EventEndDate).getTime() + 13.6 * 24 * 60 * 60 * 1000).toISOString() // It takes 13.6 days for the crack to fully expand.
                })
            }

            states.push({
                validFrom: EventEndDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })
        }

        if (config.Events.bEnableS4OddityPrecursor == true) {
            for (var i = 1; i <= 8; i++) {
                var StartDate = new Date(new Date(config.Events.S4OddityEventStartDate).getTime() + config.Events.S4OddityEventsInterval * (i-1) * 60000).toISOString();
                activeEvents.push({
                    "eventType": `EventFlag.BR_S4_Oddity_0${i}_Tell`,
                    "activeUntil": StartDate
                })
            }
            states[states.length - 1].activeEvents = activeEvents.slice();
        }
        if (config.Events.bEnableS4OddityExecution == true) {
            for (var i = 1; i <= 8; i++) {
                var StartDate = new Date(new Date(config.Events.S4OddityEventStartDate).getTime() + config.Events.S4OddityEventsInterval * (i-1) * 60000).toISOString();

                activeEvents.push({
                    "eventType": `EventFlag.BR_S4_Oddity_0${i}_Event`,
                    "activeUntil": "9999-01-01T00:00:00.000Z"
                })

                var index = activeEvents.findIndex(item => item.eventType === `EventFlag.BR_S4_Oddity_0${i}_Tell`);
                if (index !== -1) {
                    activeEvents.splice(index, 1);
                }

                states.push({
                    validFrom: StartDate,
                    activeEvents: activeEvents.slice(),
                    state: stateTemplate
                })
            }
        }
    }

    if (memory.build == 5.21) {
        if (config.Events.bEnableS5OddityPrecursor == true) {
            states.push({
                validFrom: config.Events.S5OddityPrecursorDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })
            
            states[1].activeEvents.push(
            {
                "eventType": "EventFlag.BR_S5_Oddity_Tomato_Tell",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })
        }
        if (config.Events.bEnableS5OddityExecution == true) {
            states.push({
                validFrom: config.Events.S5OddityExecutionDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })
            
            states[states.length - 1].activeEvents.push(
            {
                "eventType": "EventFlag.BR_S5_Oddity_Tomato_Event",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })
        }
    }

    if (memory.build == 5.30) {
        if (config.Events.bEnableBlockbusterRiskyEvent == true) {
            activeEvents.push({
                "eventType": "EventFlag.BR_S5_RiskyReels_Event",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })
            states[0].activeEvents = activeEvents.slice();
        }
        
        if (config.Events.bEnableCubeLightning == true) {
            states[0].activeEvents.push(
            {
                "eventType": "EventFlag.BR_S5_Rift_Corrupt",
                "activeUntil": config.Events.cubeSpawnDate
            },
            {
                "eventType": "EventFlag.BR_S5_Cube_Lightning",
                "activeUntil": config.Events.cubeSpawnDate
            })

            activeEvents.push({
                "eventType": "EventFlag.BR_S5_Cube_TurnOn",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })

            states.push({
                validFrom: config.Events.cubeSpawnDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })
        }
    }

    if (memory.build == 5.41) {
        if (config.Events.bEnableCubeLake == true) {
            states[0].activeEvents.push(
            {
                "eventType": "EventFlag.BR_S5_Cube_StartMove",
                "activeUntil": config.Events.cubeLakeDate
            },
            {
                "eventType": "EventFlag.BR_S5_Cube_TurnOn",
                "activeUntil": config.Events.cubeLakeDate
            })
            
            states.push({
                validFrom: config.Events.cubeLakeDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })

            states[1].activeEvents.push(
            {
                "eventType": "EventFlag.BR_S5_Cube_StartMove",
                "activeUntil": config.Events.cubeLakeDate
            },
            {
                "eventType": "EventFlag.BR_S5_Cube_TurnOn",
                "activeUntil": config.Events.cubeLakeDate
            },       
            {
                "eventType": "EventFlag.BR_S5_Cube_MoveTo8",
                "activeUntil": config.Events.cubeLakeDate
            })

            var EventEndDate = new Date(new Date(config.Events.cubeLakeDate).getTime() + 1.5 * 60000).toISOString();

            states.push({
                validFrom: EventEndDate,
                activeEvents: activeEvents.slice(),
                state: stateTemplate
            })

            states[2].activeEvents.push({
                "eventType": "EventFlag.BR_S5_Cube_Destination",
                "activeUntil": "9999-01-01T00:00:00.000Z"
            })
        }
    }

    res.json({
        "channels": {
            "client-matchmaking": {
                "states": [],
                "cacheExpire": "9999-01-01T22:28:47.830Z"
            },
            "client-events": {
                "states": states,
                "cacheExpire": "9999-01-01T22:28:47.830Z"
            }
        },
        "eventsTimeOffsetHrs": 0,
        "cacheIntervalMins": 10,
        "currentTime": new Date().toISOString()
    });
    res.end();
})

module.exports = express;
