# Alias

An alias (also known as "room alias") is a string that identifies an [internal user](../Stakeholders/Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/). The purpose of aliases is give improve the user experience of accurately (1) **identifying** the internal user, (2) **locating** the internal user at a room server for the purpose of establishing a connection with them.

As an example, suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's [alias](Alias%20string.md) is `alice`. Alice's [alias endpoint](Web%20endpoint.md) is thus `alice.scuttlebutt.eu`.

In short,

- Anyone can access an alias [web endpoint](Web%20endpoint.md)
- [Internal users](../Stakeholders/Internal%20user.md) can [register](Registration.md) and [revoke](Revocation.md) aliases
- [Internal users](../Stakeholders/Internal%20user.md) and [external users](../Stakeholders/External%20user.md) who visit a target user's [alias endpoint](Web%20endpoint.md) can [consume it](Alias%20consumption.md) in order to [connect](../Participation/Tunneled%20connection.md) with the target internal user
- The [room admin](../Stakeholders/Room%20admin.md) has read/write access to the [alias database](Alias%20database.md)
- [Moderators](../Stakeholders/Moderator.md) can remove alias entries from the [alias database](Alias%20database.md)
