# Joining

"Joining a room" means the process where an [external user](../Stakeholders/External%20user.md) becomes an [internal user](../Stakeholders/Internal%20user.md).

## Rough spec

The joining process is different for each [Privacy mode](../Setup/Privacy%20modes.md):

- **Open:**
  1. An [external user](../Stakeholders/External%20user.md), Alice, acquires the open *invite code* either through the room's public website or via other means
  1. Alice consumes the invite code in her SSB app that supports being a room client
  1. The room accepts the connection from Alice and immediately grants her an [ssb-tunnel](https://github/ssbc/ssb-tunnel) address
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)
- **Community:**
  1. An [internal user](../Stakeholders/Internal%20user.md), Bob, [signs into](../Setup/Sign-in%20with%20SSB.md) the room's [web dashboard](../Setup/Web%20Dashboard.md) where he creates a one-time invite code in the form of an [invite endpoint](Invite%20endpoint.md), provided on the dashboard provides.
  1. Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite code
  1. Alice consumes the invite code in their SSB app that supports being a room client
  1. The room checks whether the invite code is valid and has not yet been consumed
     1. If it is invalid or has been consumed, reply to Alice with an error
     1. Else, proceed (below)
  1. The room accepts the connection from Alice and immediately grants her an [ssb-tunnel](https://github/ssbc/ssb-tunnel) address
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)
- **Restricted:**
  1. A [moderator](../Stakeholders/Moderator.md), Carla, [signs into](../Setup/Sign-in%20with%20SSB.md) the room's [web dashboard](../Setup/Web%20Dashboard.md) where she creates a one-time invite code in the form of an [invite endpoint](Invite%20endpoint.md), provided on the dashboard.
  1. Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite code
  1. Alice consumes the invite code in their SSB app that supports being a room client
  1. The room checks whether the invite code is valid and has not yet been consumed
     1. If it is invalid or has been consumed, reply to Alice with an error
     1. Else, proceed (below)
  1. The room accepts the connection from Alice and immediately grants her an [ssb-tunnel](https://github/ssbc/ssb-tunnel) address
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)