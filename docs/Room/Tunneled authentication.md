# Tunneled authentication

#TODO summary here

## Rough spec

Tunneled friend authentication is an algorithm or protocol that applies automatically without any user input from either end of the secret-handshake channel. This protocol should not apply for the intermediary, that is, the room server.

When Alice receives a tunneled secret-handshake incoming connection from Bob, she automatically allows it if Alice checks that she follows Bob, or automatically cancels the connection if Alice checks that she does not follow Bob (or blocks Bob). Same is true reciprocically: Bob applies this rule for incoming connections from Alice.

Thus tunneled authentication **requires mutual follows** ("friendship") before establishing a functioning [tunneled connection](Tunneled%20connection.md).

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).