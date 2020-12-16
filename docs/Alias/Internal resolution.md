# Internal alias resolution

When an [internal user](../Stakeholders/Internal%20user.md) who knows another [internal user's](../Stakeholders/Internal%20user.md) [alias](Alias%20string.md) wishes to [connect](../Room/Tunneled%20connection.md) with them, they can perform resolution via muxrpc.

## Rough spec

1. An internal user acting as a client calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `resolveAlias(alias)`
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
1. The client can now use `feedId` to initiate a [tunneled connection](../Room/Tunneled%20connection.md) with `feedId`

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could track which internal users are interested in connecting with other internal users, i.e. **social interest metadata**, which could be used to create a draft of a social graph.
