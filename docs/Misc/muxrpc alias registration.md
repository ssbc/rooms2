<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

# Alias resolution

(DEPRECATED DOCUMENT BUT KEPT HERE FOR ARCHIVAL PURPOSES)

## Rough spec (muxrpc)

1. An internal user with SSB ID `feedId` and a room server with SSB ID `roomId` are connected to each other via secret-handshake
1. The internal user calls a specific [muxrpc](https://github.com/ssb-js/muxrpc/) API `registerAlias(alias, sig)` at the room server
    - `alias` is a supposed to be a string, a candidate [alias string](Alias%20string.md)
    - `sig` is a cryptographic signature covering `roomId`, `feedId`, and `alias`
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
1. (Optional) The room replies back to the client internal user via muxrpc with "success" (how? TO-DO)
1. (Optional) The internal user publishes an SSB msg of type `about` with a field for the newly registered alias (how? TO-DO)
