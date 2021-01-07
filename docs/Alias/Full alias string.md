## Full alias string

An [internal user](../Stakeholders/Internal%20user.md)'s globally relevant alias, also known as "full alias string", is used to uniquely identify that internal user globally, on the internet. This string is useful everywhere, for [external users](../Stakeholders/External%20user.md), [room admins](../Stakeholders/Room%20admin.md), and [internal users](../Stakeholders/Internal%20user.md). See also [alias string](Alias%20string.md).

### Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". The room's domain is `scuttlebutt.eu`. Alice's alias could be one of these strings (non-exhaustive list):

- `@alice@scuttlebutt.eu`
- `@alice1994@scuttlebutt.eu`
- `@aLiCee@scuttlebutt.eu`

### Specification

Composed of the following substrings, in this order

1. `@`
1. userpart, e.g. `alice`
1. `@`
1. room's domain, e.g. `scuttlebutt.eu`

### Related work

This should be the same as [RFC 7565 Section 7](https://tools.ietf.org/html/rfc7565#section-7). See also [Mastodon's WebFinger](https://docs.joinmastodon.org/spec/webfinger/).