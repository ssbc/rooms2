# Sign-in with SSB

To access the [WWW dashboard interface](Web%20Dashboard.md), [internal users](../Stakeholders/Internal%20user.md) (including [moderators](../Stakeholders/Moderator.md)) can use "sign-in with SSB ID".

## Rough spec

| Client (internal user) | Server (room) |
|----------------------|---------------|
| Is connected to the room via secret-handshake and muxrpc | Recognizes the client as an [internal user](../Stakeholders/Internal%20user.md) |
| Presses a button in the SSB app "Open web dashboard" | |
| Generates a challenge code `cc` | |
| SSB app redirects to login endpoint at the room and passes the challenge as a a request param, `/login?feedid=${sbot.id}&challenge=${cc}` | |
| | Receives challenge `cc`, solves it as `sr`. Generates a challenge `sc` and sends `sr+sc` to the client `feedid` via muxrpc |
| Receives solution `sr`, if it's incorrect, don't do anything (and let the login HTTP request fail with a timeout). Else, solve `sc` as `cr`, and send it to the room via muxrpc. | |
| | Receives solution `cr`, if it's incorrect, respond the login HTTP request with a failure. Else, redirect to the logged-in view of the dashboard `/manage` |

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

- HTTPS please #TODO
- How is the challenge exactly generated? #TODO
- Shouldn't the `/login` endpoint always be a POST method? #TODO
- Something about tokens and cookies to keep the client signed in #TODO
