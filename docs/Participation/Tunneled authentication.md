# Tunneled authentication

Tunneled authentication is about making sure that SSB peers on the opposite end of a [tunneled connection](Tunneled%20connection.md) only allow the connection to occur if they follow the peer on the other side. Thus we need a way for peers to know who wants to open a tunneled connection and we should facilitate mutual follows to occur so that peers only create tunneled connections imbued with mutual interest.

## Rough spec

Tunneled friend authentication is an algorithm or protocol that applies automatically without any user input from either end of the secret-handshake channel. This protocol should not apply for the intermediary peer, that is, the room server.

When Alice receives a tunneled secret-handshake incoming connection from Bob, she automatically allows it if Alice checks that she follows Bob, or automatically cancels the connection if Alice checks that she does not follow Bob (or blocks Bob). Same is true reciprocically: Bob applies this rule for incoming connections from Alice.

Thus tunneled authentication **requires mutual follows** ("friendship") before establishing a functioning [tunneled connection](Tunneled%20connection.md).

When a denial of connection occurs, the peer that received the connection should be able to see (and thus locally log): (1) SSB ID of the intermediary peer (room) used, (2) SSB ID of the origin peer behind the intermediary, (3) (MAYBE) the address ([tunnel address](Tunnel%20addresses.md) or [full alias string](../Alias/Full%20alias%20string.md)) of the origin peer.

The user that received the denied connection can then see this fact in their SSB app, and then they can make a conscious choice to (1) follow the origin peer, or (2) connect to the origin peer (if (3) from the previous paragraph existed), or both.

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

Note [`opts.origin`](https://github.com/staltz/ssb-room/blob/e78d54887682664def36d48ca9e648fc609478e9/tunnel/server.js#L100) in the room server is calculated from secret-handshake, so it can be trusted to be authentic. But if we want `opts.origin` to also contain the origin peer's address (ssb-tunnel address or full alias string), then we need other means of verifying that the origin address is authentic. E.g. if it's a full alias string, maybe the receiving peer performs [host resolution](../Alias/Host%20resolution.md) and [alias resolution](../Alias/Alias%20resolution.md), or maybe the receiving peer takes the ssb-tunnel address and verifies that the ID matches with the secret-handshake-given ID.