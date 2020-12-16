# Alias

An alias (also known as "room alias") is a string that identifies an [internal user](../Stakeholders/Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/).

## Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's alias is `alice`. Alice's **full alias** is thus `@alice@scuttlebutt.eu`.

## Rough spec

- [Internal users](../Stakeholders/Internal%20user.md) can [register](Alias%20registration.md) an alias
- [External users](../Stakeholders/External%20user.md) or [internal users](../Stakeholders/Internal%20user.md) can then [resolve](Alias%20resolution.md) an alias to [connect](../Room/Tunneled%20connection.md) with the alias's associated internal user

## Stakeholders

- [Internal user](../Stakeholders/Internal%20user.md) may or may not have registered an alias
- [Room admin](../Stakeholders/Room%20admin.md) has access to all aliases registered in the room
- [External user](../Stakeholders/External%20user.md) may perform [alias resolution](Alias%20resolution.md)

## Components

- [Alias registration](Alias%20registration.md)
- [Alias resolution](Alias%20resolution.md)