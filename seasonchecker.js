function CheckLobbyAndSeason(req, seasondata) {
    // Works perfectly fine for any version
    if (req.headers["user-agent"]) 
    {
        var season = req.headers["user-agent"].slice(28, 30)
        var seasonInt = Number(season)

        if (!Number.isNaN(seasonInt))
        {
            seasondata.season = seasonInt;
            seasondata.lobby = `LobbySeason${seasonInt}`;
        }

        if (Number.isNaN(seasonInt))
        {
            var season = req.headers["user-agent"].slice(32, 34)
            var seasonInt = Number(season)

            if (!Number.isNaN(seasonInt))
            {
                seasondata.season = seasonInt;
                seasondata.lobby = `LobbySeason${seasonInt}`;
            }

            if (Number.isNaN(seasonInt))
            {
                var season = req.headers["user-agent"].slice(52, 54)
                var seasonInt = Number(season)

                if (!Number.isNaN(seasonInt))
                {
                    seasondata.season = seasonInt;
                    seasondata.lobby = `LobbySeason${seasonInt}`;
                }

                if (Number.isNaN(seasonInt))
                {
                    seasondata.season = 2;
                    seasondata.lobby = "LobbyWinterDecor";
                }
            }
        }
    }
}

module.exports = CheckLobbyAndSeason;
