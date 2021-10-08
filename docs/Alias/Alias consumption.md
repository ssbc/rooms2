<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

## Alias consumption

When an SSB user ([external](../Stakeholders/External%20user.md) or [internal](../Stakeholders/Internal%20user.md)) is connected to the room, and knows of another [internal user's](../Stakeholders/Internal%20user.md) [alias](Alias%20string.md), they can perform *alias consumption*. After consumption is completed successfully, they authentically obtain the target user's SSB ID and can use it to start a [tunneled connection](../Participation/Tunneled%20connection.md).

### Specification

The input for the consumption algorithm is the response from the [web endpoint](Web%20endpoint.md), which is (either through JSON or SSB URI): the room's multiserver `address`, `roomId`, `userId`, `alias`, and `signature`.

1. The SSB user verifies that the `signature` authentically matches `roomId`, `userId` and `alias`
	1. If it is an invalid signature, interrupt alias consumption with a failure indicating that the alias association to the internal user `userId` was probably forged
	1. Else, proceed (below)
1. The SSB user acting as a client connects to the room's `address` and establishes a [muxrpc](https://github.com/ssb-js/muxrpc/) connection
1. The client can now use `userId` to initiate a [tunneled connection](../Participation/Tunneled%20connection.md) with them
1. (Optional and recommended) The client *follows* the `userId`, see [tunneled authentication](../Participation/Tunneled%20authentication.md)
