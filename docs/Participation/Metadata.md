## Metadata API

Clients, whether internal or external users, may need to know additional information about the room before interacting with it. For instance, they may need to know whether they are an internal user or not, and they may need to know what features the room has currently enabled.

### Specification

The muxrpc API `room.metadata` is an `async` method that returns a JSON object listing information about the room.

**Input**: zero arguments required

**Output**: JSON body type, with the following JSON schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ssb-ngi-pointer/rooms2#muxrpc-room-metadata",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name of this room",
      "description": "The domain or hostname or arbitrary name of the room server",
      "type": "string"
    },
    "membership": {
      "title": "Membership",
      "description": "Whether or not the client calling this muxrpc method is recognized as an internal user",
      "type": "boolean"
    },
    "features": {
      "title": "Features",
      "description": "A list of features supported by this room",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "enum": ["tunnel", "room1", "room2", "alias", "httpAuth", "httpInvite"]
      }
    }
  },
  "required": ["name", "membership", "features"]
}
```

The `features` array is particularly important, as it flags which features clients can use on the room. The semantics of each value in the *enum* are listed below:

- `"tunnel"`: **MUST** be included in `features` only if users can establish [tunneled connections](Tunneled%20connection.md) with other users
- `"room1"`: **MUST** be included only if the room server is fully compatible with Room 1.0, i.e. clients can interact with it in the same manner they interact with Room 1.0 servers. This means the server **MUST** operate with its [Privacy mode](../Setup/Privacy%20modes.md) set to "Open"
- `"room2"`: **MUST** be included only if the room server supports muxrpc APIs under the namespace `room`, such as `room.metadata()` and `room.attendants`
- `"alias"`: **MUST** be included only if the room server supports [Aliases](../Alias/Readme.md), i.e. muxrpc APIs `room.registerAlias`, `room.revokeAlias` and alias consumption
- `"httpAuth"`: **MUST** be included only if the room server complies with the [SSB HTTP Authentication](https://github.com/ssb-ngi-pointer/ssb-http-auth-spec) specification
- `"httpInvite"`: **MUST** be included only if the room server complies with the [SSB HTTP Invites](https://ssb-ngi-pointer.github.io/ssb-http-invite-spec/) specification
