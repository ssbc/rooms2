# Privacy modes

A room server should allow the [room admin](../Stakeholders/Room%20admin.md) or a [moderator](../Stakeholders/Moderator.md) to configure which users can become [internal user](../Stakeholders/Internal%20user.md).

## Specification

There are three strategies recommended as policies to [join](../Participation/Joining.md) the room, known as privacy modes:

- **Open**: invite codes are openly known, similar to [ssb-room v1](https://github.com/staltz/ssb-room)
- **Community**: any [internal user](../Stakeholders/Internal%20user.md) can invite any [external user](../Stakeholders/External%20user.md) to become an internal user
- **Restricted**: any [moderator](../Stakeholders/Moderator.md) can invite any [external user](../Stakeholders/External%20user.md) to become an internal user

**Joining:** To become a member of the room, peers need to [join the room](../Participation/Joining.md).
