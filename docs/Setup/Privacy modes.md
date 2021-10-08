<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

## Privacy modes

A room server should allow the [room admin](../Stakeholders/Room%20admin.md) or a [moderator](../Stakeholders/Moderator.md) to configure which users can become [internal user](../Stakeholders/Internal%20user.md).

### Specification

There are three strategies recommended as policies to [join](../Participation/Joining.md) the room, known as privacy modes:

- **Open**: invite codes are openly known, similar to [ssb-room v1](https://github.com/staltz/ssb-room)
- **Community**: only [internal users](../Stakeholders/Internal%20user.md) can invite [external users](../Stakeholders/External%20user.md) to become an internal users
- **Restricted**: only [admins](../Stakeholders/Room%20admin.md) and [moderators](../Stakeholders/Moderator.md) can invite [external users](../Stakeholders/External%20user.md) to become an internal users, and [aliases](../Alias/Readme.md) are not supported

**Joining:** To become a member of the room, peers need to [join the room](../Participation/Joining.md).
