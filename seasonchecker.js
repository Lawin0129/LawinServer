function CheckLobbyAndSeason(req, seasondata) {
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

            seasondata.season = Number(Build.split(".")[0]);
            seasondata.build = Number(Build);
            seasondata.CL = CL;
            seasondata.lobby = `LobbySeason${seasondata.season}`;

            if (Number.isNaN(seasondata.season)) {
                throw new Error();
            }
        } catch (err) {
            seasondata.season = 2;
            seasondata.build = 2.0;
            seasondata.CL = CL;
            seasondata.lobby = "LobbyWinterDecor";
        }
    }
}

module.exports = CheckLobbyAndSeason;