function CheckLobbyAndSeason(req, seasondata) {
    // patch 1.7
    if (req.headers["user-agent"].includes("3700114")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.8
    if (req.headers["user-agent"].includes("3724489")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.8.2
    if (req.headers["user-agent"].includes("3741772")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.9
    if (req.headers["user-agent"].includes("3757339")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.9.1
    if (req.headers["user-agent"].includes("3775276")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.10
    if (req.headers["user-agent"].includes("3790078")) {
        seasondata.season = 1;
        seasondata.lobby = "LobbySeason1";
    }
    // patch 1.11
    if (req.headers["user-agent"].includes("3807424")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbyWinterDecor";
    }
    // patch 2.1
    if (req.headers["user-agent"].includes("3825894")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbyWinterDecor";
    }
    // patch 2.2
    if (req.headers["user-agent"].includes("3841827")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 2.3.0
    if (req.headers["user-agent"].includes("3847564")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 2.4.0
    if (req.headers["user-agent"].includes("3858292")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 2.4.X
    if (req.headers["user-agent"].includes("3876086")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 2.4.2
    if (req.headers["user-agent"].includes("3870737")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 2.5
    if (req.headers["user-agent"].includes("3889387")) {
        seasondata.season = 2;
        seasondata.lobby = "LobbySeason2";
    }
    // patch 3.0
    if (req.headers["user-agent"].includes("3901517")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.1
    if (req.headers["user-agent"].includes("3915963")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.1 (2)
    if (req.headers["user-agent"].includes("3917250")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.2
    if (req.headers["user-agent"].includes("3929794")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.2 (2)
    if (req.headers["user-agent"].includes("3935073")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.3
    if (req.headers["user-agent"].includes("3942182")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.3 (2)
    if (req.headers["user-agent"].includes("3948073")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.4
    if (req.headers["user-agent"].includes("3968866")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.4 (2)
    if (req.headers["user-agent"].includes("3973340")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.5
    if (req.headers["user-agent"].includes("3994867")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.5 (2)
    if (req.headers["user-agent"].includes("4000805")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.5 (3)
    if (req.headers["user-agent"].includes("4008490")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 3.6
    if (req.headers["user-agent"].includes("4019403")) {
        seasondata.season = 3;
        seasondata.lobby = "LobbySeason3";
    }
    // patch 4.0
    if (req.headers["user-agent"].includes("4039451")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.1
    if (req.headers["user-agent"].includes("4053532")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.2
    if (req.headers["user-agent"].includes("4072250")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.3
    if (req.headers["user-agent"].includes("4095806")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.3 (2)
    if (req.headers["user-agent"].includes("4103483")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.4
    if (req.headers["user-agent"].includes("4117433")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.4 (2)
    if (req.headers["user-agent"].includes("4127312")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.4.x
    if (req.headers["user-agent"].includes("4132537")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.5
    if (req.headers["user-agent"].includes("4159770")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 4.5 (2)
    if (req.headers["user-agent"].includes("4166199")) {
        seasondata.season = 4;
        seasondata.lobby = "LobbySeason4";
    }
    // patch 5.0
    if (req.headers["user-agent"].includes("4204761")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.0 (2)
    if (req.headers["user-agent"].includes("4214610")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.10
    if (req.headers["user-agent"].includes("4225813")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.10 (2)
    if (req.headers["user-agent"].includes("4240749")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.20
    if (req.headers["user-agent"].includes("4259375")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.20 (2)
    if (req.headers["user-agent"].includes("4276938")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.21
    if (req.headers["user-agent"].includes("4281534")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.21 (2)
    if (req.headers["user-agent"].includes("4288479")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.30
    if (req.headers["user-agent"].includes("4305896")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.30 (2)
    if (req.headers["user-agent"].includes("4312945")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.30 (3)
    if (req.headers["user-agent"].includes("4317672")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.40
    if (req.headers["user-agent"].includes("4351695")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.40 (2)
    if (req.headers["user-agent"].includes("4352937")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 5.41
    if (req.headers["user-agent"].includes("4363240")) {
        seasondata.season = 5;
        seasondata.lobby = "LobbySeason5";
    }
    // patch 6.00
    if (req.headers["user-agent"].includes("4395664")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.00 (2)
    if (req.headers["user-agent"].includes("4402180")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.01
    if (req.headers["user-agent"].includes("4417689")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.01 (2)
    if (req.headers["user-agent"].includes("4424678")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.02
    if (req.headers["user-agent"].includes("4442095")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.02 (2)
    if (req.headers["user-agent"].includes("4461277")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.10
    if (req.headers["user-agent"].includes("4464155")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.10 (2)
    if (req.headers["user-agent"].includes("4476098")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.10 (3)
    if (req.headers["user-agent"].includes("4480234")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.20
    if (req.headers["user-agent"].includes("4497486")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.20 (2)
    if (req.headers["user-agent"].includes("4504220")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.21
    if (req.headers["user-agent"].includes("4526925")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.21 (2)
    if (req.headers["user-agent"].includes("4531851")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.21 (3)
    if (req.headers["user-agent"].includes("4535631")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.22
    if (req.headers["user-agent"].includes("4541220")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.22 (2)
    if (req.headers["user-agent"].includes("4543176")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.30
    if (req.headers["user-agent"].includes("4573096")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.30 (2)
    if (req.headers["user-agent"].includes("4579044")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 6.31
    if (req.headers["user-agent"].includes("4573279")) {
        seasondata.season = 6;
        seasondata.lobby = "LobbySeason6";
    }
    // patch 7.00
    if (req.headers["user-agent"].includes("4629139")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.01
    if (req.headers["user-agent"].includes("4648651")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.10
    if (req.headers["user-agent"].includes("4667333")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.20
    if (req.headers["user-agent"].includes("4716934")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.20 (2)
    if (req.headers["user-agent"].includes("4727874")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.30
    if (req.headers["user-agent"].includes("4821335")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.30 (2)
    if (req.headers["user-agent"].includes("4834550")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.30 (3)
    if (req.headers["user-agent"].includes("4869070")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.40
    if (req.headers["user-agent"].includes("4980899")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.40 (2)
    if (req.headers["user-agent"].includes("4996168")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.40 (3)
    if (req.headers["user-agent"].includes("5012948")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 7.40 (4)
    if (req.headers["user-agent"].includes("5046157")) {
        seasondata.season = 7;
        seasondata.lobby = "LobbySeason7";
    }
    // patch 8.00
    if (req.headers["user-agent"].includes("5203069")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.00 (2)
    if (req.headers["user-agent"].includes("5251086")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.00 (3)
    if (req.headers["user-agent"].includes("5274521")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.01
    if (req.headers["user-agent"].includes("5285981")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.10
    if (req.headers["user-agent"].includes("5362200")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.10 (2)
    if (req.headers["user-agent"].includes("5372009")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.11
    if (req.headers["user-agent"].includes("5442615")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.11 (2)
    if (req.headers["user-agent"].includes("5484841")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.20
    if (req.headers["user-agent"].includes("5547534")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.20 (2)
    if (req.headers["user-agent"].includes("5625478")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.30 
    if (req.headers["user-agent"].includes("5793395")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.30 (2)
    if (req.headers["user-agent"].includes("5822617")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.30 (3)
    if (req.headers["user-agent"].includes("5831510")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.40
    if (req.headers["user-agent"].includes("5914491")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.40 (2)
    if (req.headers["user-agent"].includes("6005771")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.50
    if (req.headers["user-agent"].includes("6058028")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 8.51
    if (req.headers["user-agent"].includes("6165369")) {
        seasondata.season = 8;
        seasondata.lobby = "LobbySeason8";
    }
    // patch 9.00
    if (req.headers["user-agent"].includes("6337466")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.01
    if (req.headers["user-agent"].includes("6428087")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.10
    if (req.headers["user-agent"].includes("6573057")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.10 (2)
    if (req.headers["user-agent"].includes("6616201")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.10 (3)
    if (req.headers["user-agent"].includes("6639283")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.20
    if (req.headers["user-agent"].includes("6822798")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.21
    if (req.headers["user-agent"].includes("6922310")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.30
    if (req.headers["user-agent"].includes("7021684")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.30 (2)
    if (req.headers["user-agent"].includes("7095426")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.40
    if (req.headers["user-agent"].includes("7315705")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.41
    if (req.headers["user-agent"].includes("7463579")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 9.41 (2)
    if (req.headers["user-agent"].includes("7609292")) {
        seasondata.season = 9;
        seasondata.lobby = "LobbySeason9";
    }
    // patch 10.00
    if (req.headers["user-agent"].includes("7658179")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.00 (2)
    if (req.headers["user-agent"].includes("7704164")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.10
    if (req.headers["user-agent"].includes("7955722")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.20
    if (req.headers["user-agent"].includes("8243923")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.20 (2)
    if (req.headers["user-agent"].includes("8360257")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.20 (3)
    if (req.headers["user-agent"].includes("8456527")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.30
    if (req.headers["user-agent"].includes("8569414")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.31
    if (req.headers["user-agent"].includes("8723043")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.40
    if (req.headers["user-agent"].includes("8970213")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.40 (2)
    if (req.headers["user-agent"].includes("9302865")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 10.40 (3)
    if (req.headers["user-agent"].includes("9380822")) {
        seasondata.season = 10;
        seasondata.lobby = "LobbySeason10";
    }
    // patch 11.00
    if (req.headers["user-agent"].includes("9562734")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.00 (2)
    if (req.headers["user-agent"].includes("9603448")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.01
    if (req.headers["user-agent"].includes("9728272")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.10
    if (req.headers["user-agent"].includes("9844520")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.10 (2)
    if (req.headers["user-agent"].includes("9901083")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.11
    if (req.headers["user-agent"].includes("10082788")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.20
    if (req.headers["user-agent"].includes("10297577")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.20 (2)
    if (req.headers["user-agent"].includes("10328358")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.21
    if (req.headers["user-agent"].includes("10481509")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.30
    if (req.headers["user-agent"].includes("10639804")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.30 (2)
    if (req.headers["user-agent"].includes("10708866")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.31
    if (req.headers["user-agent"].includes("10760473")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.31 (2)
    if (req.headers["user-agent"].includes("10795579")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.31 (3)
    if (req.headers["user-agent"].includes("10800459")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.40
    if (req.headers["user-agent"].includes("10951104")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.40 (2)
    if (req.headers["user-agent"].includes("11039906")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.40 (3)
    if (req.headers["user-agent"].includes("11109625")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.50
    if (req.headers["user-agent"].includes("11204868")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 11.50 (2)
    if (req.headers["user-agent"].includes("11265652")) {
        seasondata.season = 11;
        seasondata.lobby = "LobbySeason11";
    }
    // patch 12.00
    if (req.headers["user-agent"].includes("11556442")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.00 (2)
    if (req.headers["user-agent"].includes("11566760")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.00 (3)
    if (req.headers["user-agent"].includes("11586896")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.10
    if (req.headers["user-agent"].includes("11794982")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.10 (2)
    if (req.headers["user-agent"].includes("11883027")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.20
    if (req.headers["user-agent"].includes("12170032")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.20 (2)
    if (req.headers["user-agent"].includes("12236980")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.21
    if (req.headers["user-agent"].includes("12353830")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.30
    if (req.headers["user-agent"].includes("12493283")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.30 (2)
    if (req.headers["user-agent"].includes("12624643")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.40
    if (req.headers["user-agent"].includes("12837456")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.41
    if (req.headers["user-agent"].includes("12905909")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.50
    if (req.headers["user-agent"].includes("13044369")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.50 (2)
    if (req.headers["user-agent"].includes("13137020")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.50 (3)
    if (req.headers["user-agent"].includes("13193885")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.60
    if (req.headers["user-agent"].includes("13315662")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.60 (2)
    if (req.headers["user-agent"].includes("13477524")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 12.61
    if (req.headers["user-agent"].includes("13498980")) {
        seasondata.season = 12;
        seasondata.lobby = "LobbySeason12";
    }
    // patch 13.00
    if (req.headers["user-agent"].includes("13649278")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.00 (2)
    if (req.headers["user-agent"].includes("13696059")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.00 (3)
    if (req.headers["user-agent"].includes("13715544")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.20
    if (req.headers["user-agent"].includes("13777676")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.30
    if (req.headers["user-agent"].includes("13884634")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.40
    if (req.headers["user-agent"].includes("14008768")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.40 (2)
    if (req.headers["user-agent"].includes("14036559")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 13.40 (3)
    if (req.headers["user-agent"].includes("14113327")) {
        seasondata.season = 13;
        seasondata.lobby = "LobbySeason13";
    }
    // patch 14.00
    if (req.headers["user-agent"].includes("14173417")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.00 (2)
    if (req.headers["user-agent"].includes("14199892")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.00 (3)
    if (req.headers["user-agent"].includes("14211474")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.10
    if (req.headers["user-agent"].includes("14276912")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.10 (2)
    if (req.headers["user-agent"].includes("14288110")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.10 (3)
    if (req.headers["user-agent"].includes("14312695")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.20
    if (req.headers["user-agent"].includes("14354056")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.20 (2)
    if (req.headers["user-agent"].includes("14375974")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.20 (3)
    if (req.headers["user-agent"].includes("14384759")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.30
    if (req.headers["user-agent"].includes("14456520")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.40
    if (req.headers["user-agent"].includes("14512399")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.40 (2)
    if (req.headers["user-agent"].includes("14550713")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.50
    if (req.headers["user-agent"].includes("14617811")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.50 (2)
    if (req.headers["user-agent"].includes("14643651")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.60
    if (req.headers["user-agent"].includes("14756138")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.60 (2)
    if (req.headers["user-agent"].includes("14785135")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 14.60 (3)
    if (req.headers["user-agent"].includes("14786821")) {
        seasondata.season = 14;
        seasondata.lobby = "LobbySeason14";
    }
    // patch 15.00
    if (req.headers["user-agent"].includes("14826719")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.00 (2)
    if (req.headers["user-agent"].includes("14835335")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.10
    if (req.headers["user-agent"].includes("14904303")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.10 (2)
    if (req.headers["user-agent"].includes("14937640")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.10 (3)
    if (req.headers["user-agent"].includes("15014719")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.20
    if (req.headers["user-agent"].includes("15033494")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.20 (2)
    if (req.headers["user-agent"].includes("15070882")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.21
    if (req.headers["user-agent"].includes("15083856")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.30
    if (req.headers["user-agent"].includes("15233634")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.30 (2)
    if (req.headers["user-agent"].includes("15316852")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.30 (3)
    if (req.headers["user-agent"].includes("15341163")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.40
    if (req.headers["user-agent"].includes("15385160")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.40 (2)
    if (req.headers["user-agent"].includes("15419568")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.40 (3)
    if (req.headers["user-agent"].includes("15424013")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.40 (4)
    if (req.headers["user-agent"].includes("15496915")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.50
    if (req.headers["user-agent"].includes("15526472")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 15.50 (2)
    if (req.headers["user-agent"].includes("15570449")) {
        seasondata.season = 15;
        seasondata.lobby = "LobbySeason15";
    }
    // patch 16.00
    if (req.headers["user-agent"].includes("15685441")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.00 (2)
    if (req.headers["user-agent"].includes("15713390")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.00 (3)
    if (req.headers["user-agent"].includes("15727376")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.10
    if (req.headers["user-agent"].includes("15851811")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.10 (2)
    if (req.headers["user-agent"].includes("15862581")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.10 (3)
    if (req.headers["user-agent"].includes("15883297")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.10 (4)
    if (req.headers["user-agent"].includes("15898731")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.10 (5)
    if (req.headers["user-agent"].includes("15913292")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.20
    if (req.headers["user-agent"].includes("15961073")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.20 (2)
    if (req.headers["user-agent"].includes("15987165")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.20 (3)
    if (req.headers["user-agent"].includes("15998392")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.20 (4)
    if (req.headers["user-agent"].includes("16042441")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.30
    if (req.headers["user-agent"].includes("16086208")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.30 (2)
    if (req.headers["user-agent"].includes("16163563")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.40
    if (req.headers["user-agent"].includes("16218553")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.50
    if (req.headers["user-agent"].includes("16432754")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 16.50 (2)
    if (req.headers["user-agent"].includes("16469788")) {
        seasondata.season = 16;
        seasondata.lobby = "LobbySeason16";
    }
    // patch 17.00
    if (req.headers["user-agent"].includes("16555138")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.00 (2)
    if (req.headers["user-agent"].includes("16593740")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.10
    if (req.headers["user-agent"].includes("16701187")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.10 (2)
    if (req.headers["user-agent"].includes("16745144")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.20
    if (req.headers["user-agent"].includes("16868155")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.21
    if (req.headers["user-agent"].includes("16949556")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.21 (2)
    if (req.headers["user-agent"].includes("16967001")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.30
    if (req.headers["user-agent"].includes("17004569")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.40
    if (req.headers["user-agent"].includes("17162853")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.40 (2)
    if (req.headers["user-agent"].includes("17215766")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.40 (3)
    if (req.headers["user-agent"].includes("17269705")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 17.50
    if (req.headers["user-agent"].includes("17388565")) {
        seasondata.season = 17;
        seasondata.lobby = "LobbySeason17";
    }
    // patch 18.00
    if (req.headers["user-agent"].includes("17519952")) {
        seasondata.season = 18;
        seasondata.lobby = "LobbySeason18";
    }
    // patch 18.10
    if (req.headers["user-agent"].includes("17619277")) {
        seasondata.season = 18;
        seasondata.lobby = "LobbySeason18";
    }
}

module.exports = CheckLobbyAndSeason;
