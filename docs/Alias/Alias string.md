## Alias string

An [internal user](../Stakeholders/Internal%20user.md)'s alias, also known as "alias string", is used to uniquely (unique within the room server only) identify that internal user. This string is useful only within the context of the room, i.e. not globally identifiable.

### Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". Alice's alias could be one of these strings (non-exhaustive list):

- `alice`
- `alice1994`
- `alice_94`

### Specification

The string should satisfy the same rules as domain "labels" as defined in [RFC 1035](https://tools.ietf.org/html/rfc1035).
