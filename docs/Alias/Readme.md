# Alias

An alias (also known as "room alias") is a string that identifies an [internal user](Internal%20user.md), designed to be short and human-friendly, similar to [email addresses](https://en.wikipedia.org/wiki/Email_address) and [Mastodon WebFinger addresses](https://docs.joinmastodon.org/spec/webfinger/).

## Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu` and Alice's alias is `alice`. Alice's **full alias** is thus `@alice@scuttlebutt.eu`.

## Stakeholders

- [Internal user](Internal%20user.md) may or may not have an alias
- [Room admin](Room%20admin.md) has access to all aliases registered in the room

## Components

- [Alias resolution](Alias%20resolution.md)
