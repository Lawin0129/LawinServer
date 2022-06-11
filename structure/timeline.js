const Express = require("express");
const express = Express.Router();
const functions = require("./functions.js");

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

    if (memory.season == 3) {
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
    }

    if (memory.season == 4) {
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
    }

    if (memory.season == 5) {
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
    }
    
    if (memory.build == 5.10) {
        activeEvents.push(
        {
            "eventType": "EventFlag.BirthdayBattleBus",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        })
    }

    if (memory.season == 6) {
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

    if (memory.season == 7) {
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
    }

    if (memory.season == 8) {
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
    }


    if (memory.season == 9) {
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
    }

    if (memory.season == 10) {
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
        })
    }

    if (memory.season == 11) {
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
    }

    if (memory.season == 12) {
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
    }

    if (memory.season == 14) {
        activeEvents.push(
        {
            "eventType": "EventFlag.LTE_Fortnitemares_2020",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        })
    }

    if (memory.season == 15) {
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
    }

    if (memory.season == 16) {
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
    }

    if (memory.season == 17) {
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
    }

    if (memory.season == 18) {
        activeEvents.push(
        {
            "eventType": "EventFlag.LTE_Season18_BirthdayQuests",
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
            "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly",
            "activeUntil": "9999-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": "EventFlag.LTQ_S18_Repeatable_Weekly_06",
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
        })
    }

    if (memory.season == 19) {
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
    }

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

    res.json({
        "channels": {
            "client-matchmaking": {
                "states": [],
                "cacheExpire": "9999-01-01T22:28:47.830Z"
            },
            "client-events": {
                "states": [{
                    "validFrom": "2020-01-01T20:28:47.830Z",
                    "activeEvents": activeEvents,
                    "state": {
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
                        "dailyStoreEnd": "9999-01-01T00:00:00Z"
                    }
                }],
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