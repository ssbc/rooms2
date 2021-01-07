## Alias resolution

When an SSB user ([external](../Stakeholders/External%20user.md) or [internal](../Stakeholders/Internal%20user.md)) is connected to the room, and knows of another [internal user's](../Stakeholders/Internal%20user.md) [alias](Alias%20string.md), they can perform *resolution* via muxrpc. After resolution is completed successfully, they obtain the target user's SSB ID and can use it to start a [tunneled connection](../Participation/Tunneled%20connection.md).

### Specification

If the input is a [full alias string](Full%20alias%20string.md), then first perform [host resolution](Host%20resolution.md) on the room server. Once the room's `multiserverAddress` is known, the SSB user creates a muxrpc connection with the room, and picks the `alias` part of the full alias string to perform the following algorithm:

1. An SSB user acting as a client calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `resolveAlias(alias)` on the room server
    - `alias` is a supposed to be a string, a candidate [alias string](Alias%20string.md)
1. The room checks whether that `alias` is valid (see spec in [Alias string](Alias%20string.md))
	1. If it is invalid, reply with an error
	1. Else, proceed (below)
1. The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) with the *key* `alias`
	1. If there is none, reply with an error
	1. Else, proceed (below)
1. The room replies back to the client the **value** associated with the requested **key** `alias` in the [Alias database](Alias%20database.md)
1. The client now in possession of the **value** will deconstruct the `feedId` and the `sig`
1. The client verifies that the signature `sig` authentically matches `feedId` and `alias`
1. The client can now use `feedId` to initiate a [tunneled connection](../Participation/Tunneled%20connection.md) with `feedId`

### Security considerations

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could track which SSB users are interested in connecting with internal users, i.e. they can gather **social interest metadata**, which could be used to create a draft of a social graph.
