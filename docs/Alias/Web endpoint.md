## Web endpoint

Once an alias is [registered](Registration.md), it enables any web user to visit a web endpoint on the room server dedicated to that alias, for the purpose of telling the visitor what SSB ID does the alias resolve to, and with instructions on how to install an SSB app if the visitor doesn't have it yet.

The goal of this endpoint is to help any SSB user *locate and identify* the alias' owner by resolving the alias to: (1) the room's [multiserver address](https://github.com/ssb-js/multiserver), (2) the owner's SSB ID, and (3) a cryptographic signature that proves the owner associated themselves with that alias. This web endpoint is very valuable to onboard new SSB users being invited by an [internal user](../Stakeholders/Internal%20user.md).

**Prior art:** This endpoint should be in many ways similar to the [Telegram](https://telegram.org/) `https://t.me/example` service for the username `@example`, also capable of redirecting the web visitor to a scheme `tg` URI `tg://resolve?domain=example`, which Telegram apps know how to parse and open the target user's profile screen.

### Specification

Thi specification does not apply if the [privacy mode](../Setup/Privacy%20modes.md) is *Restricted*. This web endpoint is available only if the privacy mode is *Open* or *Community*.

If the alias `${alias}` is registered at the room `${roomHost}` for a certain `${userId}`, then the room's HTTP endpoint `https://${alias}.${roomHost}` SHOULD respond with HTML which:

- Informs users how to install an SSB app that can correctly consume room aliases
- Renders a "Connect with me" button linking to an SSB URI (see below)
- The page automatically redirects (when the browser supports it) to an SSB URI (see below)
- The alias SSB URI is `ssb:address/${roomMsAddr}?roomId=${roomId}&userId=${userId}&alias=${alias}&signature=${signature}`, in other words there are 2 components:
  - `ssb:address/${roomMsAddr}`, comprising the **path component** of the URI, is the room's [multiserver address](https://github.com/ssb-js/multiserver)
  - The **query component** of the URI with the following 4 parts:
    - `roomId=${roomId}`, the room's SSB ID
    - `userId=${userId}`, the SSB ID of the alias's owner
    - `alias=${alias}`, the [alias string](Alias%20string.md)
    - `signature=${signature}`, the alias's owner signature as described in the [alias database](Alias%20database.md)

As an additional endpoint for programmatic purposes, the HTTP endpoint `https://${alias}.${roomHost}/json` MUST respond with a JSON body with the following schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/ssb-ngi-pointer/rooms2",
  "type": "object",
  "properties": {
    "address": {
      "title": "Multiserver address",
      "description": "Should conform to https://github.com/ssbc/multiserver-address",
      "type": "string"
    },
    "roomId": {
      "title": "Room ID",
      "description": "SSB ID for the room server",
      "type": "string"
    },
    "userId": {
      "title": "User ID",
      "description": "SSB ID for the user owning the alias",
      "type": "string"
    },
    "alias": {
      "title": "Alias",
      "description": "A domain 'label' as defined in RFC 1035",
      "type": "string"
    },
    "signature": {
      "title": "Signature",
      "description": "Cryptographic signature covering the roomId, the userId, and the alias",
      "type": "string"
    }
  },
  "required": [
    "address",
    "roomId",
    "userId",
    "alias",
    "signature"
  ]
}
```

### Example

Suppose the alias is `alice`, registered for the user ID `@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519` at the room with host name `scuttlebutt.eu`. Then the alias endpoint `https://alice.scuttlebutt.eu` responds with the following SSB URI (without spaces nor newlines):

```
ssb:address/net_shs/scuttlebutt.eu/8008/51w4nYL0k7mRzDG
w20KQqCjt35y8qLiBNtWk3MX7ppo%3D?roomId=ed25519%2F51w4nY
L0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo%3D&userId=ed25519
%2FFlieaFef19uJ6jhHwv2CSkFrDLYKJd_SuIS71A5Y2as%3D&alias
=alice&signature=yNDgrVOLm6sMUHdvnbFUQYgLkCGiOKrpP9KiBv
lrzvmxTNt3d0MNTf%2BSLMIxgxf00S5fKAlG2%2FC5NTE0Zq1Mmg%3D
%3D
```

Note the multiserver address for the room is written in an SSB URI friendly format, `ssb:address/net_shs/${host}/${port}/${pubkey}`, that can be converted to canonical multiserver format `net:${host}:${port}~shs:${pubkey}`.

The JSON endpoint `https://alice.scuttlebutt.eu/json` would respond with the following JSON:

```json
{
  "address": "net:scuttlebutt.eu:8008~shs:51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=",
  "roomId": "@51w4nYL0k7mRzDGw20KQqCjt35y8qLiBNtWk3MX7ppo=.ed25519",
  "userId": "@FlieaFef19uJ6jhHwv2CSkFrDLYKJd/SuIS71A5Y2as=.ed25519",
  "alias": "alice",
  "signature": "yNDgrVOLm6sMUHdvnbFUQYgLkCGiOKrpP9KiBvlrzvmxTNt3d0MNTf+SLMIxgxf00S5fKAlG2/C5NTE0Zq1Mmg=="
}
```

### Security considerations

#### Malicious web visitor

A web visitor, either human or bot, could attempt brute force visiting all possible alias endpoints, in order to build a dataset of all SSB IDs and claimed aliases gathered at this room, potentially tracking profiles of these SSB IDs. Malicious web visitors can also attempt to connect with these target IDs as victims, and may use social engineering or impersonation tactics during [tunneled authentication](../Participation/Tunneled%20authentication.md).

#### Malicious [room admin](../Stakeholders/Room%20admin.md)

The room admin could tamper with the [alias database](Alias%20database.md) and provide fake information on this web endpoint, e.g. that a certain alias was claimed by a certain users. Although the [database signature](Alias%20database.md) exists to prevent this type of tampering, it is only verified when performing [alias consumption](Alias%20consumption.md). For web visitors who only want to know which SSB ID corresponds to an alias, and only that, these visitors must trust the room administrator, who could provide inauthentic information.