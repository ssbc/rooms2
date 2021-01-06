# Alias string

An [internal user](../Stakeholders/Internal%20user.md)'s alias, also known as "alias string", is used to uniquely (unique within the room server only) identify that internal user. This string is useful only within the current room, i.e. relevant only for the [room's admin](../Stakeholders/Room%20admin.md) other [internal users](../Stakeholders/Internal%20user.md) or [external user](../Stakeholders/External%20user.md) that can connect to the room, although external users may have first used the [full alias strings](Full%20alias%20string.md) to connect with the room in the first place.

## Example

Suppose Alice is an internal user of the room "Scuttlebutt EU". Alice's alias could be one of these strings (non-exhaustive list):

- `alice`
- `alice1994`
- `aLiCee`

## Specification

Alphanumerics, uppercase and lowercase. Perhaps `-` and `.` could be allowed. This should be the same as `userpart` in [RFC 7565 Section 7](https://tools.ietf.org/html/rfc7565#section-7).