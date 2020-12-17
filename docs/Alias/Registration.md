# Alias registration

#TODO Maybe this should be a [Web Dashboard](../Room/Web%20Dashboard.md) feature, not a muxrpc API?

An [internal user](../Stakeholders/Internal%20user.md) who does not have an alias in the current room server can choose to register an alias. Not all internal users need to have aliases, so the process described here is optional.

## Rough spec

1. An internal user with SSB ID `feedid` calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `registerAlias(alias, sig)`
    - `alias` is a supposed to be a string, a candidate [alias string](Alias%20string.md)
    - `sig` is a cryptographic signature covering both `alias` and `feedId`
1. The room checks whether that `alias` is valid (see spec in [Alias string](Alias%20string.md))
	1. If it is invalid, reply with an error
	1. Else, proceed (below)
1. The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) associated with this `feedId`
  1. If there is, reply with an error
  1. Else, proceed (below)
1. The room checks whether there already exists an entry in the [Alias database](Alias%20database.md) with the *key* `alias`
	1. If it is registered, reply with an error
	1. Else, proceed (below)
1. The room adds an entry to its [Alias database](Alias%20database.md) for `key=alias` & `value=feedId+sig`
1. The room replies back to the client internal user with "success"

## Detailed spec #TODO

TODO Make UML diagram, see [sequenceDiagram example](../Misc/sequenceDiagram%20example.md).

## Security considerations

### Malicious [internal user](../Stakeholders/Internal%20user.md)

The reason why there can be only one alias for SSB ID is to prevent a malicious internal user from exhausting many or all possible aliases in case the room accidentally allows such malicious user to become an internal user. Arguably, some room implementations could choose to relax this choice, perhaps to allow different aliases for an internal user, that covers typographic mistakes such as `aliec`, `alicce`. For the time being, it seems sensible that each internal user can receive only one alias.

### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could reply with errors when technically the muxrpc should have succeeded, e.g. pretending that the `alias` candidate is invalid or pretending that it's already registered.