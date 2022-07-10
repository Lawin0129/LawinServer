const WebSocket = require("ws").Server;
const XMLBuilder = require("xmlbuilder");
const XMLParser = require("xml-parser");

const functions = require("./../structure/functions.js");

const port = 80;

const wss = new WebSocket({ port: port }, () => console.log("XMPP started listening on port", port));
wss.on("error", (err) => {
    console.log("XMPP \x1b[31mFAILED\x1b[0m to start hosting (NOTE: This should not affect LawinServer).");
})

global.Clients = [];

wss.on('connection', async (ws) => {
    var accountId = "";
    var jid = "";
    var id = "";
    var ID = functions.MakeID();
    var Authenticated = false;

    ws.on('message', async (message) => {
        if (Buffer.isBuffer(message)) message = message.toString();
        const msg = XMLParser(message);
        if (!msg.root) return Error(ws);

        switch (msg.root.name) {
            case "open":
                ws.send(XMLBuilder.create("open")
                .attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-framing")
                .attribute("from", "prod.ol.epicgames.com")
                .attribute("id", ID)
                .attribute("version", "1.0")
                .attribute("xml:lang", "en").toString())
                
                if (Authenticated == true) {
                    ws.send(XMLBuilder.create("stream:features").attribute("xmlns:stream", "http://etherx.jabber.org/streams")
                    .element("ver").attribute("xmlns", "urn:xmpp:features:rosterver").up()
                    .element("starttls").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-tls").up()
                    .element("bind").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-bind").up()
                    .element("compression").attribute("xmlns", "http://jabber.org/features/compress")
                    .element("method", "zlib").up().up()
                    .element("session").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-session").up().toString())
                } else {
                    ws.send(XMLBuilder.create("stream:features").attribute("xmlns:stream", "http://etherx.jabber.org/streams")
                    .element("mechanisms").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-sasl")
                    .element("mechanism", "PLAIN").up().up()
                    .element("ver").attribute("xmlns", "urn:xmpp:features:rosterver").up()
                    .element("starttls").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-tls").up()
                    .element("compression").attribute("xmlns", "http://jabber.org/features/compress")
                    .element("method", "zlib").up().up()
                    .element("auth").attribute("xmlns", "http://jabber.org/features/iq-auth").up().toString())
                }
            break;

            case "auth":
                if (!msg.root.content) return Error(ws);
                if (!functions.DecodeBase64(msg.root.content)) return Error(ws);
                if (!functions.DecodeBase64(msg.root.content).includes("\u0000")) return Error(ws);
                var decodedBase64 = functions.DecodeBase64(msg.root.content).split("\u0000");

                if (global.Clients.find(i => i.accountId == decodedBase64[1])) return Error(ws);

                accountId = decodedBase64[1];

                if (decodedBase64 && accountId && decodedBase64.length == 3) {
                    Authenticated = true;
                    
                    console.log(`An xmpp client with the account id ${accountId} has logged in.`);

                    ws.send(XMLBuilder.create("success").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-sasl").toString());
                } else {
                    return Error(ws);
                }
            break;

            case "iq":
                switch (msg.root.attributes.id) {
                    case "_xmpp_bind1":
                        if (!msg.root.children.find(i => i.name == "bind")) return;
                        if (!msg.root.children.find(i => i.name == "bind").children.find(i => i.name == "resource")) return;
                        var resource = msg.root.children.find(i => i.name == "bind").children.find(i => i.name == "resource").content;
                        jid = `${accountId}@prod.ol.epicgames.com/${resource}`;
                        id = `${accountId}@prod.ol.epicgames.com`;

                        ws.send(XMLBuilder.create("iq")
                        .attribute("to", jid)
                        .attribute("id", "_xmpp_bind1")
                        .attribute("xmlns", "jabber:client")
                        .attribute("type", "result")
                        .element("bind")
                        .attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-bind")
                        .element("jid", jid).up().up().toString())
                    break;

                    case "_xmpp_session1":
                        if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                        var xml = XMLBuilder.create("iq")
                        .attribute("to", jid)
                        .attribute("from", "prod.ol.epicgames.com")
                        .attribute("id", "_xmpp_session1")
                        .attribute("xmlns", "jabber:client")
                        .attribute("type", "result");

                        ws.send(xml.toString());
                        getPresenceFromAll(ws);
                    break;

                    default:
                        if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                        var xml = XMLBuilder.create("iq")
                        .attribute("to", jid)
                        .attribute("from", "prod.ol.epicgames.com")
                        .attribute("id", msg.root.attributes.id)
                        .attribute("xmlns", "jabber:client")
                        .attribute("type", "result");

                        ws.send(xml.toString());
                }
            break;

            case "message":
                if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                if (!msg.root.children.find(i => i.name == "body")) return;
                var body = msg.root.children.find(i => i.name == "body").content;

                if (msg.root.attributes.type) {
                    if (msg.root.attributes.type == "chat") {
                        if (!msg.root.attributes.to) return;
                        var receiver = global.Clients.find(i => i.id == msg.root.attributes.to);
                        var sender = global.Clients.find(i => i.client == ws);
                        if (!receiver || !sender) return;
                        if (receiver == sender) return;

                        receiver.client.send(XMLBuilder.create("message")
                        .attribute("to", receiver.jid)
                        .attribute("from", sender.jid)
                        .attribute("xmlns", "jabber:client")
                        .attribute("type", "chat")
                        .element("body", body).up().toString())
                        return;
                    }
                }

                if (ifJSON(body)) {
                    var object = JSON.parse(body);

                    if (object.hasOwnProperty("type")) {
                        if (typeof object.type == "string") {
                            switch (object.type.toLowerCase()) {
                                case "com.epicgames.party.invitation":
                                    if (!msg.root.attributes.to) return;
                                    var sender = global.Clients.find(i => i.client == ws);
                                    var receiver = global.Clients.find(i => i.id == msg.root.attributes.to);
                                    if (!receiver) return;

                                    receiver.client.send(XMLBuilder.create("message")
                                    .attribute("from", sender.jid)
                                    .attribute("id", msg.root.attributes.id)
                                    .attribute("to", receiver.jid)
                                    .attribute("xmlns", "jabber:client")
                                    .element("body", body).up().toString())
                                break;

                                default:
                                    ws.send(XMLBuilder.create("message")
                                    .attribute("from", jid)
                                    .attribute("id", msg.root.attributes.id)
                                    .attribute("to", jid)
                                    .attribute("xmlns", "jabber:client")
                                    .element("body", body).up().toString());
                            }
                        }
                    }
                }
            break;

            case "presence":
                if (!global.Clients.find(i => i.client == ws)) return Error(ws);
                if (!msg.root.children.find(i => i.name == "status")) return;
                if (!ifJSON(msg.root.children.find(i => i.name == "status").content)) return;
                var body = msg.root.children.find(i => i.name == "status").content;
                var away = false;
                if (msg.root.children.find(i => i.name == "show")) away = true;

                updatePresenceForAll(ws, body, away, false)
            break;
        }

        if (!global.Clients.find(i => i.client == ws)) {
            if (accountId && jid && ID && id && Authenticated == true) {
                global.Clients.push({ "client": ws, "accountId": accountId, "jid": jid, "id": id, "lastPresenceUpdate": { "away": false, "status": "{}" } });
            }
        }
    })

    ws.on('close', () => RemoveClient(ws))
})

function RemoveClient(ws) {
    if (global.Clients.find(i => i.client == ws)) {
        updatePresenceForAll(ws, "{}", false, true);

        console.log(`An xmpp client with the account id ${global.Clients.find(i => i.client == ws).accountId} has logged out.`);

        global.Clients.splice(global.Clients.findIndex(i => i.client == ws), 1);
    }
}

function Error(ws) {
    ws.send(XMLBuilder.create("close").attribute("xmlns", "urn:ietf:params:xml:ns:xmpp-framing").toString());
    ws.close();
}

function updatePresenceForAll(ws, body, away, offline) {
    if (global.Clients.find(i => i.client == ws)) {
        var SenderData = global.Clients.find(i => i.client == ws);
        var SenderIndex = global.Clients.findIndex(i => i.client == ws);
        global.Clients[SenderIndex].lastPresenceUpdate.away = away;
        global.Clients[SenderIndex].lastPresenceUpdate.status = body;

        global.Clients.forEach(ClientData => {
            var xml = XMLBuilder.create("presence")
            .attribute("to", ClientData.jid)
            .attribute("xmlns", "jabber:client")
            .attribute("from", SenderData.jid)

            if (offline == true) xml = xml.attribute("type", "unavailable");
            else xml = xml.attribute("type", "available")

            if (away == true) xml = xml.element("show", "away").up().element("status", body).up();
            else xml = xml.element("status", body).up();

            ClientData.client.send(xml.toString())
        })
    } else {
        return Error(ws);
    }
}

function getPresenceFromAll(ws) {
    if (global.Clients.find(i => i.client == ws)) {
        var SenderData = global.Clients.find(i => i.client == ws);

        global.Clients.forEach(ClientData => {
            var xml = XMLBuilder.create("presence")
            .attribute("to", SenderData.jid)
            .attribute("xmlns", "jabber:client")
            .attribute("from", ClientData.jid)

            if (ClientData.lastPresenceUpdate.away == true) xml = xml.attribute("type", "available").element("show", "away").up().element("status", ClientData.lastPresenceUpdate.status).up();
            else xml = xml.attribute("type", "available").element("status", ClientData.lastPresenceUpdate.status).up();

            SenderData.client.send(xml.toString())
        })
    } else {
        return Error(ws);
    }
}

function ifJSON(str) {
    try {
        JSON.parse(str)
    } catch (err) {
        return false;
    }
    return true;
}
