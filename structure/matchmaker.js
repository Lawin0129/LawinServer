const functions = require("./functions.js");

module.exports = async (ws) => {
  // create hashes
  const ticketId = functions.MakeID().replace(/-/gi, "");
  const matchId = functions.MakeID().replace(/-/gi, "");
  const sessionId = functions.MakeID().replace(/-/gi, "");

  Connecting();
  await functions.sleep(800);
  Waiting();
  await functions.sleep(1000);
  Queued();
  await functions.sleep(4000);
  SessionAssignment();
  await functions.sleep(2000);
  Join();

  function Connecting() {
    ws.send(
      JSON.stringify({
        payload: {
          state: "Connecting",
        },
        name: "StatusUpdate",
      })
    );
  }

  function Waiting() {
    ws.send(
      JSON.stringify({
        payload: {
          totalPlayers: 1,
          connectedPlayers: 1,
          state: "Waiting",
        },
        name: "StatusUpdate",
      })
    );
  }

  function Queued() {
    ws.send(
      JSON.stringify({
        payload: {
          ticketId: ticketId,
          queuedPlayers: 0,
          estimatedWaitSec: 0,
          status: {},
          state: "Queued",
        },
        name: "StatusUpdate",
      })
    );
  }

  function SessionAssignment() {
    ws.send(
      JSON.stringify({
        payload: {
          matchId: matchId,
          state: "SessionAssignment",
        },
        name: "StatusUpdate",
      })
    );
  }

  function Join() {
    ws.send(
      JSON.stringify({
        payload: {
          matchId: matchId,
          sessionId: sessionId,
          joinDelaySec: 1,
        },
        name: "Play",
      })
    );
  }
};
