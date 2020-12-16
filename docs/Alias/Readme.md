# Alias

An alias (also known as "room alias") is a string that identifies an [internal user](../Stakeholders/Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/).

## Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's [alias](Alias%20string.md) is `alice`. Alice's [full alias](Full%20alias%20string.md) is thus `@alice@scuttlebutt.eu`.

## Rough spec

- [Internal users](../Stakeholders/Internal%20user.md) can [register](Registration.md) aliases
- [External users](../Stakeholders/External%20user.md) can [externally resolve](External%20resolution.md) a [full alias](Full%20alias%20string.md) in order to [connect](../Room/Tunneled%20connection.md) with the target internal user
- [Internal users](../Stakeholders/Internal%20user.md) can [internally resolve](Internal%20resolution.md) an [alias](Alias%20string.md) in order to [connect](../Room/Tunneled%20connection.md) with the target internal user

## Stakeholders

- [Internal user](../Stakeholders/Internal%20user.md) may [register](Registration.md) an alias or perform [internal alias resolution](Internal%20resolution.md)
- [External user](../Stakeholders/External%20user.md) may perform [external alias resolution](External%20resolution.md)
- [Room admin](../Stakeholders/Room%20admin.md) has read/write access to the [alias database](Alias%20database.md)
- [Moderator](../Stakeholders/Moderator.md) can remove an alias entry from the [alias database](Alias%20database.md)

## Components

- [Alias database](Alias%20database.md)
- [Registration](Registration.md)
- [External resolution](External%20resolution.md)
- [Internal resolution](Internal%20resolution.md)
