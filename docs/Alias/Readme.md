# Alias

An alias (also known as "room alias") is a string that identifies an [internal user](../Stakeholders/Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/).

## Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's [alias](Alias%20string.md) is `alice`. Alice's [full alias](Full%20alias%20string.md) is thus `@alice@scuttlebutt.eu`, and her [web endpoint](Web%20endpoint.md) is `https://scuttlebutt.eu/alice`.

## Rough spec

- [Internal users](../Stakeholders/Internal%20user.md) can [register](Registration.md) aliases
- [Internal users](../Stakeholders/Internal%20user.md) who know a target user's [alias](Alias%20string.md) can [resolve it](Alias%20resolution.md) in order to [connect](../Participation/Tunneled%20connection.md) with the target internal user
- [External users](../Stakeholders/External%20user.md) who know a target user's [full alias](Full%20alias%20string.md) can [resolve the host](Host%20resolution.md) and [resolve the user alias](Alias%20resolution.md) in order to [connect](../Participation/Tunneled%20connection.md) with the target internal user
- Other users who don't yet have an SSB ID can use the [Web endpoint](Web%20endpoint.md) of an alias to read more information on how to acquire an SSB ID and connect with the target internal user

## Stakeholders

- [Internal user](../Stakeholders/Internal%20user.md) may [register](Registration.md) an alias or perform [alias resolution](Alias%20resolution.md)
- [External user](../Stakeholders/External%20user.md) performs [host resolution](Host%20resolution.md) and [alias resolution](Alias%20resolution.md)
- [Room admin](../Stakeholders/Room%20admin.md) has read/write access to the [alias database](Alias%20database.md)
- [Moderator](../Stakeholders/Moderator.md) can remove an alias entry from the [alias database](Alias%20database.md)

## Components

- [Full alias string](Full%20alias%20string.md)
- [Alias string](Alias%20string.md)
- [Registration](Registration.md)
- [Host resolution](Host%20resolution.md)
- [Alias resolution](Alias%20resolution.md)
- [Web endpoint](Web%20endpoint.md)
- [Alias database](Alias%20database.md)
