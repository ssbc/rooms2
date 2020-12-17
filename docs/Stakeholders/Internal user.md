# Internal user

SSB user who accesses the room server and is considered *internal* because they have already joined this room (i.e. have received and consumed a [room invite](../Room/Room%20invite.md)) and may even have registered an [alias](../Alias/Readme.md) in this room.

## Rough spec

**Definition:** an *internal user* of a room is any SSB ID for which the room grants an [ssb-tunnel](https://github.com/ssbc/ssb-tunnel) address. In other words, if an SSB ID is *reachable* via a [tunneled connection](../Room/Tunneled%20connection.md) through a room server, then they are considered an internal user of that room.

**Becoming an internal user:** read more about that in [Joining a room](../Room/Joining.md).