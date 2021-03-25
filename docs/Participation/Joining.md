## Joining

"Joining a room" means the process where an [external user](../Stakeholders/External%20user.md) becomes an [internal user](../Stakeholders/Internal%20user.md).

### Specification

The joining process is different for each [Privacy mode](../Setup/Privacy%20modes.md):

- **Open:**
  1. An [external user](../Stakeholders/External%20user.md), Alice, acquires the open *invite code* either through the room's public website or via other means
  1. Alice consumes the invite code in her SSB app that supports being a room client
  1. The room accepts the connection from Alice and immediately grants her a [tunnel address](Tunnel%20addresses.md)
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)
- **Community:**
  1. An [internal user](../Stakeholders/Internal%20user.md), Bob, signs into the room's [web dashboard](../Setup/Web%20Dashboard.md) where he creates a one-time invite code in the form of an [invite link](Invites.md), provided by the dashboard.
  1. Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite link
  1. Alice consumes the invite according to the [invites specification](Invites.md)
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)
- **Restricted:**
  1. A [moderator](../Stakeholders/Moderator.md), Carla, signs into the room's [web dashboard](../Setup/Web%20Dashboard.md) where she creates a one-time invite code in the form of an [invite link](Invites.md), provided by the dashboard.
  1. Bob informs an [external user](../Stakeholders/External%20user.md), Alice, of the invite link
  1. Alice consumes the invite according to the [invites specification](Invites.md)
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)
  1. Alice has become an [internal user](../Stakeholders/Internal%20user.md)

To summarize, in **Community** mode, all internal users can create invites while in **Restricted** mode only moderators can. **Open** mode means there always is an invite for all the users in the room.
