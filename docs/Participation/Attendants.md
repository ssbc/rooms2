<!--
SPDX-FileCopyrightText: 2021 Andre 'Staltz' Medeiros

SPDX-License-Identifier: CC-BY-4.0
-->

## Attendants API

Internal users can discover about the presence of other internal users currently online at the room. This gives them the opportunity to choose to establish a [tunneled connection](Tunneled%20connection.md).

### Specification

The muxrpc API `room.attendants` is a `source` method that streams JSON objects of three different schemas: **state** objects, **joined** objects, and **left** objects.

There are no input arguments expected on this method.

**State objects**

When the user subscribes to the `room.attendants` stream, the first event **MUST** be of type "state", matching the JSON schema below:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ssb-ngi-pointer/rooms2#muxrpc-room-attendants-state",
  "type": "object",
  "properties": {
    "type": {
      "title": "Event type",
      "type": "string",
      "pattern": "^(successful)$"
    },
    "ids": {
      "title": "SSB IDs of attendants",
      "description": "A list of SSB IDs of all internal users currently online",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["type", "ids"]
}
```

**Joined objects**

Whenever an internal user becomes online in the room, an event matching the following JSON schema below **MUST** be sent through the stream:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ssb-ngi-pointer/rooms2#muxrpc-room-attendants-joined",
  "type": "object",
  "properties": {
    "type": {
      "title": "Event type",
      "type": "string",
      "pattern": "^(joined)$"
    },
    "id": {
      "title": "SSB ID",
      "description": "SSB ID of the attendant who just joined",
      "type": "string"
    }
  },
  "required": ["type", "id"]
}
```

**Left objects**

Whenever an internal user ceases to be online in the room, an event matching the following JSON schema below **MUST** be sent through the stream:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ssb-ngi-pointer/rooms2#muxrpc-room-attendants-left",
  "type": "object",
  "properties": {
    "type": {
      "title": "Event type",
      "type": "string",
      "pattern": "^(left)$"
    },
    "id": {
      "title": "SSB ID",
      "description": "SSB ID of the attendant who just left",
      "type": "string"
    }
  },
  "required": ["type", "id"]
}
```

